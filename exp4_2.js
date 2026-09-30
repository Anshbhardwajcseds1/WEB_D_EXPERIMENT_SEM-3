const http = require('http');
const server = http.createServer((req, res) => {
if(req.url === "/") {
    res.end("Welcome to the Home Page");

}
else if (req.url === "/about"){
    res.end("Welcome to the About Page");
}

else if (req.url === "/students"){
    res.end("Welcome to the Students Page");
}
else {
    res.end("404 Page Not Found");
}});
server.listen(7000, () => {
    console.log("Server is running at http://localhost:7000");
});