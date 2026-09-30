const http = require('http');

let items = ['Apple', 'Banana'];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // GET - Read items
    if (req.method === 'GET') {
        res.end(JSON.stringify(items));
    }

    // POST - Add item
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            items.push(body);
            res.end('Item added: ' + body);
        });
    }

    // DELETE - Delete all items
    else if (req.method === 'DELETE') {
        items = [];
        res.end('All items deleted');
    }

    // Other methods
    else {
        res.statusCode = 405;
        res.end('Method not allowed');
    }
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});