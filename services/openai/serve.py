#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging

logging.basicConfig(format='%(asctime)s : %(filename)s : %(levelname)s : %(message)s')
logger = logging.getLogger()
logger.setLevel(logging.INFO)

import argparse, json, os
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

@app.get('/')
def docs():
  return RedirectResponse(url='/docs')

@app.get('/test')
def test():
  return {'path': '/test'}

@app.post('/chat')
async def chat(
  request: Request,
  model: Optional[str] = 'gpt-4o'):
  
  logger.info(f'Chat with model: {model}')
  
  host = request.headers.get('host')
  logger.info(host)
  
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