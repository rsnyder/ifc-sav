#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging

logging.basicConfig(format='%(asctime)s : %(filename)s : %(levelname)s : %(message)s')
logger = logging.getLogger()
logger.setLevel(logging.INFO)

import json, os, socket

from hashlib import sha256

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, StreamingResponse

from starlette.responses import RedirectResponse
from typing import Optional
import uvicorn

import requests
logging.getLogger('requests').setLevel(logging.WARNING)

import openai

async_client = openai.AsyncOpenAI(api_key=os.getenv('OPENAI_API_KEY'))
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

async def stream_assistant_response(assistant_id, thread_id):
  stream =  async_client.beta.threads.runs.stream(
    assistant_id=assistant_id,
    thread_id=thread_id
  )
  async with stream as stream:
    async for text in stream.text_deltas:
      logger.info(text)
      yield text

app = FastAPI(title='OpenAI API')
app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_methods=['*'],
  allow_headers=['*'],
  allow_credentials=True,
)

allowed_sources = ['https://ifc.juncture-digital.org', 'https://plant-humanities.github.io']

def get_hostname(request):
  client_ip = request.client.host  # Client's IP address
  try:
    # Resolve hostname
    client_hostname = socket.gethostbyaddr(client_ip)[0]
  except socket.herror:
    client_hostname = 'Hostname could not be resolved'
  return client_hostname

def get_referer(request):
  return request.headers.get('referer')  # Get the Referer header

def get_host_header(request):
  return request.headers.get('host')

@app.get('/')
def docs():
  return RedirectResponse(url='/docs')

@app.get('/test')
async def get_source(request: Request):
  return {'client_ip': request.client.host, 'client_hostname': get_hostname(request)}

@app.get('/headers')
async def get_headers(request: Request):
  return request.headers

@app.post('/chat')
async def chat(
  request: Request,
  model: Optional[str] = 'gpt-4o'):
  
  logger.info(f'Chat with model: {model}')
  logger.info(json.dumps({'hostname': get_hostname(request), 'referer': get_referer(request), 'host_header': get_host_header(request)}, indent=2))
  
  if get_referer(request) not in allowed_sources:
    return Response(status_code=403, content='Forbidden', media_type='text/plain')
  
  payload = await request.body()
  messages = json.loads(payload)
    
  for message in messages:
    if message['role'] == 'user':
      content = message['content'] if isinstance(message['content'], list) else [message['content']]
      for rec in content:
        if rec['type'] == 'image_url':
          url = rec['image_url']['url']
          extension = url.split('.')[-1]
          if extension not in ['jpg', 'jpeg', 'png', 'gif']:
            resp = requests.get(url)
            if resp.status_code == 200:
              mime = resp.headers['Content-Type']
              imageid = sha256(url.encode('utf-8')).hexdigest()
              extension = mime.split('/')[-1]
              fname = f'/tmp/{imageid}.{extension}'
              with open(fname, 'wb') as f:
                f.write(resp.content)
              rec['image_url']['url'] = f'https://{host}/images/{imageid}.{extension}'

  logger.info(json.dumps(messages, indent=2))

  assistant = client.beta.assistants.create(model=model)
  thread = client.beta.threads.create(messages=messages)
  
  return StreamingResponse(stream_assistant_response(assistant.id, thread.id), media_type='text/event-stream')

@app.get('/images/{imageid}.{extension}')
async def image(imageid: str, extension: str):
  fname = f'/tmp/{imageid}.{extension}'
  content = ''
  if os.path.exists(fname):
    with open(fname, 'rb') as f:
      content = f.read()
  return Response(status_code=200 if content else 404, content=content, media_type=f'image/{extension}')

if __name__ == '__main__':
  port = int(os.environ.get('PORT', '8088'))
  logger.info(f'Starting server on port {port}')
  uvicorn.run(app, host='0.0.0.0', port=port)