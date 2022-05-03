import * as chatModule from "../src/index";
jest.mock("net");

const mockServer = require("net").mockServer;

const net = require("net");

const createServer = jest.spyOn(net, "createServer");
mockServer.listen.mockReturnValue(mockServer);

beforeEach(() => {
  while (chatModule.connections[0]) {
    chatModule.connections.pop();
  }
});

describe("setup", () => {
  chatModule.listen();

  it("shuld have passed onConnection to createServer", () => {
    expect(createServer).toHaveBeenCalledTimes(1);
    expect(createServer).toHaveBeenCalledWith(chatModule.onConnection);
  });

  it("calls the listen function with the right arguments", () => {
    const listenCallback = mockServer.listen;
    expect(listenCallback).toHaveBeenCalledWith(10000, expect.any(Function));
    expect(listenCallback).toHaveReturnedWith(mockServer);
  });
});

describe("setupConnection", () => {
  afterAll(() => {
    while (chatModule.connections[0]) {
      chatModule.connections.pop();
    }
  });

  it("the connections list is empty by default", () => {
    expect(chatModule.connections.length).toBe(0);
  });

  const mockSocket = Object.create(null);

  it("should return the user id of the new user", () => {
    expect(chatModule.setupConnection(mockSocket)).toBe("user-1");
  });

  it("the connections list should have one element", () => {
    expect(chatModule.connections.length).toBe(1);
  });

  it("the connections list has one element and it is the first user", () => {
    expect(chatModule.connections[0]).toEqual({
      id: "user-1",
      socket: mockSocket,
    });
  });
});

describe("onDisconnect", () => {
  it("should not have connections in the beginning", () => {
    expect(chatModule.connections.length).toBe(0);
  });

  it("should have one connection after setting up a connection", () => {
    expect(chatModule.setupConnection(Object.create(null))).toBe("user-2");
    expect(chatModule.connections.length).toBe(1);
  });

  it("should go back to having no connections after onDisconnect", () => {
    chatModule.onDisconnect("user-2")();
    console.log("here");

    expect(chatModule.connections.length).toBe(0);
  });
});

// describe.skip("broadcast", () => {
//   // add a connection
//   const mockWrite = jest.fn();
//   const mockSocket = { write: mockWrite };
//   chatModule.setupConnection(mockSocket as any);
// });
