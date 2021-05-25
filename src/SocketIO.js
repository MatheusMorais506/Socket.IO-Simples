/* 
    https://devpleno.com/socket-io-parte1/
    https://www.youtube.com/watch?v=qZUDuBcbJ9A&t=286s

    Socket.io é uma implementação em node para web socket, ou seja, uma forma de fazer comunicação 
    em tempo real, mas mais importante que isso é sua possibilidade de fallBack. O Socket.io continua 
    sendo a melhor opção para comunicação em tempo real quando utilizamos o node.
*/
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket) =>{
    console.log('new connection',socket.id)
    socket.on('msg', (msg) =>{
        console.log(msg)
        socket.broadcast.emit('msg', msg);
        socket.join('contador')
    })
})

let counter = 0
setInterval(()=> { 
    io.to('contador').emit('msg', counter++)
},1000)

http.listen(3000, ()=>{
    console.log('Listening on port 3000')
})
