//creo servidor

const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT       

//importando http para socket 

const http = require('http')
const server = http.createServer(app)

//importo Routes
const homeRouter = require('./router/home.router')


//requiero handlbars

const handlebars = require('express-handlebars')

//socket

const { Server } = require('socket.io')
const io = new Server(server)

//public

app.use(express.static(__dirname + '/public'))

//inicializo handlebars

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//Uso routes

app.use('/home', homeRouter)

//sockets

let messages = []

io.on('connection', (socket) => {
    console.log('nuevo usuario en linea')
    socket.emit('wellcome','Bienvenido!')
    socket.on('message', (data) => {
        messages.push(data)
        console.log(messages)
        io.sockets.emit('messages-all', messages)
    })
})



server.listen(PORT , ( ) => {
    console.log('servidor corriendo en servidor 8080')
})