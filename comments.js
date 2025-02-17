// create web server

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments.json');

http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/api/comments' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    } else if (pathname === '/api/comments' && req.method === 'POST') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(data);
            comments.push(comment);
            const newLocal = 'comments.json';
            fs.writeFile(path.join(__dirname, newLocal), JSON.stringify(comments), 'utf8', (err) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Server Error');
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(comment));
            });
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Not Found');
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});