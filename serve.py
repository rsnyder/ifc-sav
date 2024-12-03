#!/usr/bin/env python
# -*- coding: utf-8 -*-

from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    
    '''
    def do_GET(self):
        print(self.path)
        if self.path.endswith('.md'):
            local_path = f'.{self.path}'
            print(f'{local_path} {os.path.exists(local_path)}')
            if self.path.startswith('/examples') or not os.path.exists(local_path):
                self.send_error(404)
                return
            content = open(local_path, 'r').read()
            print(content)
            self.send_response(200)
            self.send_header('Content-Type', 'text/markdown; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()

            # Send the modified content
            self.wfile.write(content.encode('utf-8'))
        else:
            super().do_GET()
    '''

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