const net = jest.createMockFromModule("net");

const mockOn = jest.fn();

function on(eventType, callback) {
  return mockOn(eventType, callback);
}

const serverMock = {
  on: on,
  listen: jest.fn(),
  close: jest.fn(),
  address: jest.fn(),
  getConnections: jest.fn(),
  ref: jest.fn(),
  unref: jest.fn(),
  maxConnections: 0,
  connections: 0,
  listening: false,
  addListener: jest.fn(),
  emit: jest.fn(),
  once: jest.fn(),
  prependListener: jest.fn(),
  prependOnceListener: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  setMaxListeners: jest.fn(),
  off: jest.fn(),
  getMaxListeners: jest.fn(),
  listeners: jest.fn(),
  rawListeners: jest.fn(),
  listenerCount: jest.fn(),
  eventNames: jest.fn(),
};

function createServer(callback) {
  return serverMock;
}

net.createServer = createServer;
net.mockServer = serverMock;

module.exports = net;
