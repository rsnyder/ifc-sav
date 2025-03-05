#!/usr/bin/env python
# -*- coding: utf-8 -*-

from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler, self).end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        print(self.path)
        local_path = f'.{self.path}'
        is_dir = os.path.isdir(local_path)
        # print(f'{local_path} {os.path.exists(local_path)} {is_dir}')
        if is_dir and os.path.exists(f'{local_path}/index.html'):
            return super().do_GET()
        if not self.path == '/' and is_dir:
            self.send_response(404)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(open('404.html', 'rb').read())
        else:
            return super().do_GET()
            
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.send_response(404)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(open('404.html', 'rb').read())
        else:
            super().send_error(code, message, explain)

if __name__ == "__main__":
    port = 8080
    server = HTTPServer(('localhost', port), CORSRequestHandler)
    print(f"Serving on port {port}...")
    server.serve_forever()