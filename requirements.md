Write a very simple chat server that should listen on TCP port 10000 for clients. The chat protocol is very simple, clients connect with the TCP protocol and write single lines of text to the socket. On each new line of text, the server will broadcast that line to all other connected clients.

Requirements:
- [x] The server listens for TCP connections
- [x] The server listens on port 10000
- [ ] The server on receiving a new line of text broadcasts that line to all other connected clients
  - [ ] So I need to know the number of "lines" in each received message

- [ ] The client connects via TCP on port 10000
- [ ] The client writes single lines of text to the socket 
  - [ ] How can it write "single lines of text"?

# TODO:

- [x] Create a tcp server listening for connection on 10k
  - [x] Test it by sending some data on the same connection and log it with console.log
    - [x] use `nc -v` to connect



- [x] Check how TCP works
  The concept of "line" is not specified in the TCP protocol
  - [ ] Take 512 characters long strings as "lines" and will drop anything after it
  - [ ] I will treat \n as new line divider (optional)

- [ ] on data
    - [ ] send the line to all connected clients
      - [ ] send data to all connected clients
      - [ ] get all connected clients
  - [ ] decide logic for defining a "line"

bonus: 
- ogni client ha un nome
- fai test con lunghezze differenti
- gestisci \n
- gestisci solo 512, stile irc
