import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';
import { Server } from 'socket.io'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server)

let users: string[] = []

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/../public'))

io.on('connection', (socket) => {
  console.log('client connected')

  socket.on('joined', (nickname) => {
    users.push(nickname)
    io.emit('joined', users)
  })

  socket.on('message', (msg) => {
    io.except(socket.id).emit('message', msg)
  })

  socket.on('isTyping', (nickname) => {
    io.except(socket.id).emit('isTyping', `${nickname} is typing...`)
  })

  socket.on('disconnect', () => {
    console.log('client disconnected');
  })
})

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})