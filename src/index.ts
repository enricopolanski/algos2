/*
 * Note, the requirement specifically spoke about "lines".
 * The word "line" can be found 3 times in your exercise description.
 * That being said TCP has no concept of "lines", not even in the sense
 * of an HTTP message lines. This left me to decide what a "line" was.
 * I have considered limiting the messages (since it's a chat) to 512 characters,
 * like in the IRC protocol, or to parse for line feeds.
 * But even then, *which* line feeds of *which* encoding?
 * Also, this would've moved further the goal of having to handle user feedback
 * in case the user attempted to send multi line messages.
 * I thus decided to not implement any code related to the "line" concept.
 * But if I had to do it, I would've assumed UTF-8 as character encoding,
 * and parsed the message for the various new line feeds it offers like new line,
 * carriage return, paragraph separator and many many others, and handling the rebroadcast
 * to stop at everything I had received up to that point.
 */
import * as net from "net";

/**
 * In a chat application it would be nice to be able to differentiate users.
 * We will limit ourselves to differentiate users
 * (or rather, differentiate unique connections) with an autoincrementing index.
 * Note: change approach if you intend to deal with more than 9007199254740991
 * connections during the lifecycle of the server.
 */
let index = 1;

/**
 * Enriches the socket information with a more user friendly reference.
 */
interface Connection {
  socket: net.Socket;
  id: string;
}

/**
 * Reference to the active connections. Mutable.
 */
let connections: Array<Connection> = [];

/**
 * Sends a TCP `message` to all `connections`
 */
const broadcast: (message: string) => void = (message) => {
  connections.forEach((connection) =>
    connection.socket.write(Buffer.from(message))
  );
};

const broadcastConnection: (userId: string) => void = (userId) =>
  broadcast(`${userId} has joined the chat.\n`);

const broadcastDisconnection: (userId: string) => void = (userId) =>
  broadcast(`${userId} has left the chat.`);

/*
 * Note: Mutates a global variable.
 */
const onDisconnect: (userId: string) => () => void = (userId) => () => {
  connections = connections.filter((connection) => connection.id !== userId);
  broadcastDisconnection(userId);
};

/**
 * Executed every time the listener receives data.
 * Sends a message to all the connections prepending the userId to the message.
 */
const onData: (userId: string) => (buffer: Buffer) => void =
  (userId) => (buffer) =>
    broadcast(`${userId}: ${buffer.toString()}`);

/**
 * Creates a new identifier for the user and pushes it to the connections.
 * Unsafe: mutates the context.
 * @returns {string} the identifier
 */
const setupConnection = (socket: net.Socket): string => {
  // create a unique reference to the user
  const userId = "user-" + String(index);

  index++;

  connections.push({ socket: socket, id: userId });

  return userId;
};

/**
 * The "core" of the application, executed every time the server receives a new connection.
 */
const onConnection = (socket: net.Socket): void => {
  const userId = setupConnection(socket);

  broadcastConnection(userId);

  // Registration of event handlers for this socket
  socket.on("end", onDisconnect(userId));
  socket.on("data", onData(userId));
};

const server = net.createServer(onConnection);

server.on("error", (err) => {
  throw err;
});

server.listen(10000, () => {
  console.log("Chat App Server started.");
});
