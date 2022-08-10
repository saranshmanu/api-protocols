const { WebSocketServer } = require("ws");
const resolver = require("./resolver");
const configuration = require("../../utils/configuration");
const logger = require("../../utils/logger");

const init = () => {
  try {
    const wss = new WebSocketServer({ port: configuration?.wsPort });

    wss.on("connection", (socket, req) => {
      const ip = req.socket.remoteAddress;
      logger.info(`${ip} connected to the socket`);

      /**
       * Setting initial variables to check if the client is alive
       */
      socket.isAlive = true;
      socket.on("pong", () => {
        socket.isAlive = true;
      });

      /**
       * The following event is called whenever a new message is received
       */
      socket.on("message", (data) => {
        const jwt = req.headers?.jwt;
        try {
          const payload = JSON.parse(data);
          logger.info(`Message Received from ${ip}: ${JSON.stringify(payload)}`);
          resolver(wss, socket, payload, jwt);
        } catch (error) {
          logger.error("Message received not in JSON format or any other error received");
        }
      });

      /**
       * Send the connected status to the client who is connected for the first time
       */
      socket.send(JSON.stringify({ message: "Welcome from the server" }));
    });

    /**
     * The following function is executed every 30 seconds to check if
     * the clients are alive and close the one which have become dead.
     */
    const interval = setInterval(() => {
      wss.clients.forEach((socket) => {
        if (socket.isAlive === false) return socket.terminate();
        socket.isAlive = false;
        socket.ping();
      });
    }, 30000);

    /**
     * The following event is called when the web socket server is closing
     */
    wss.on("close", () => {
      logger.info("Closing the ws server");
      clearInterval(interval);
    });

    logger.info(`Started ws server on port ${configuration?.wsPort}`);
  } catch (err) {
    logger.error(`Failed to start the ws server on port ${configuration?.wsPort}`);
  }
};

module.exports = init;
