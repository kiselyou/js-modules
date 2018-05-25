####### sending to sender-client only
```js
socket.emit('message', "this is a test");
```

####### sending to all clients, include sender
```js
io.emit('message', "this is a test");
``` 

####### sending to all clients except sender
```js
socket.broadcast.emit('message', "this is a test");
```

####### sending to all clients in 'game' room(channel) except sender
```js
socket.broadcast.to('game').emit('message', 'nice game');
```

####### sending to all clients in 'game' room(channel), include sender
```js
io.in('game').emit('message', 'cool game');
```

####### sending to sender client, only if they are in 'game' room(channel)
```js
socket.to('game').emit('message', 'enjoy the game');
```

####### sending to all clients in namespace 'myNamespace', include sender
```js
io.of('myNamespace').emit('message', 'gg');
```

####### sending to individual socketid
```js
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
```