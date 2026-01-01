const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3000;

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;


    let statusCode = 200;
    let payload = {};

    // 1. נתיב דיפולטיבי (/)
    payload = {
        message: "Welcome to the native Node.js homepage!",
        route: "/"
    };

    if (trimmedPath === 'about') {
        // 2. נתיב אודות (/about)
        payload = {
            siteName: "Native Node Server",
            version: "1.0",
            description: "Server created using only the built-in 'http' module.",
            route: "/about"
        };
    } else if (trimmedPath === 'services') {
        // 3. נתיב שירותים (/services)
        const servicesList = [
            { id: 10, name: "Native HTTP Router", status: "Active" },
            { id: 20, name: "JSON Formatting", status: "Active" }
        ];
        payload = {
            message: "List of services:",
            services: servicesList,
            route: "/services"
        };
    } else {
        // 4. טיפול בנתיבים שלא נמצאו (שגיאה400 )
        statusCode = 400; 
        payload = {
            error: "Route Not Supported (400)",
            details: `The requested path (/${trimmedPath}) is not defined in the router.`,
            statusCode: 400
        };
    }

    // שליחת התגובה הסופית
    sendJson(res, statusCode, payload);
});

// הפעלת השרת
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});