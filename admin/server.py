import os
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 3000
TARGET_HTML = os.path.join(os.path.dirname(__file__), '..', 'index.html')

class AdminHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS just in case
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # Handle API routes
        if self.path == '/api/load-html':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            try:
                with open(TARGET_HTML, 'r', encoding='utf-8') as f:
                    html_content = f.read()
                response = json.dumps({'html': html_content})
            except Exception as e:
                response = json.dumps({'error': str(e)})
            self.wfile.write(response.encode('utf-8'))
            return

        # Handle static assets exactly as Express did
        # Map '/assets' to '../assets'
        if self.path.startswith('/assets/'):
            # simple trick: change CWD temporarily
            path_part = self.path[len('/assets/'):]
            abs_path = os.path.join(os.path.dirname(__file__), '..', 'assets', path_part)
            if os.path.exists(abs_path):
                self.path = abs_path # Override SimpleHTTPRequestHandler path resolving logic?
                # Actually SimpleHTTPRequestHandler uses self.path and resolves relative to os.getcwd()
            # The easiest way for SimpleHTTPRequestHandler to serve from multiple roots is to 
            # change the directory
            pass
            
        # Instead of hacking SimpleHTTPRequestHandler for virtual paths:
        # if path is starting with /api it's handled.
        # if path is starting with /public it's handled by SimpleHTTP...
        # Wait, if we set directory="public", it only serves public.
        # Let's handle manually:
        
        # Route to admin frontend
        if self.path == '/' or self.path == '/index.html':
            self.path = '/public/index.html'

        # If it points to /assets
        if self.path.startswith('/assets/'):
            self.path = '../' + self.path
            
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/save-html':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(post_data)
                new_html = data.get('html')
                if new_html:
                    with open(TARGET_HTML, 'w', encoding='utf-8') as f:
                        f.write(new_html)
                    response = json.dumps({'success': True, 'message': 'Guardado con exito'})
                    self.send_response(200)
                else:
                    response = json.dumps({'error': 'Missing html body'})
                    self.send_response(400)
            except Exception as e:
                print(e)
                response = json.dumps({'error': str(e)})
                self.send_response(500)

            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(response.encode('utf-8'))
            return

if __name__ == '__main__':
    # Change cwd to admin directory so that relative paths work properly
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, AdminHandler)
    print(f'Ingeny Labs Admin Builder running on http://localhost:{PORT}')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
