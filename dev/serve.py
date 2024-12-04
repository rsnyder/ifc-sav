#!/usr/bin/env python
# -*- coding: utf-8 -*-

from http.server import HTTPServer, SimpleHTTPRequestHandler

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):

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