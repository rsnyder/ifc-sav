#!/usr/bin/env python
# -*- coding: utf-8 -*-

from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):

    def do_GET(self):
        local_path = f'.{self.path}'
        is_dir = os.path.isdir(local_path)
        if not self.path == '/' and is_dir:
            self.send_response(404)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(open('404.html', 'rb').read())
        else:
            super().do_GET()
            
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
    server = HTTPServer(('localhost', port), CustomHTTPRequestHandler)
    print(f"Serving on port {port}...")
    server.serve_forever()