const http = require('http');

const hostname ='localhost'
const port = 3000;

// יצירת השרת
const server = http.createServer((req, res) => {
  // קביעת ה-Header של התגובה
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // שליחת התשובה "hello world"
  res.end('hello world');
});

// הפעלת השרת והאזנה לפורט 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});