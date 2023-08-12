const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const delay = require("express-delay");

// Middleware to add a 2-second delay to responses
server.use(delay(2000));

// Apply middlewares
server.use(middlewares);
server.use(router);

// Start server
const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});
