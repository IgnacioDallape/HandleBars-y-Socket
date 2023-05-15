const socket = io()
socket.on('wellcome', (data) => {
    console.log(data)
})
socket.on('messages-all', (data) => {
    render(data)
})

const render = (data) => {
    const html = data.map(e => {
        return (
            `
        <div>
            <span>
            <strong> ${e.author}  </strong>
            <em> ${e.text} </em>        

            </span>
        </div>
        `
        )

    }).join('')
    document.getElementById('box').innerHTML = html
}

const addMessage = () => {
    const mensaje = {
        author : document.getElementById('user').value,
        text : document.getElementById('mensaje').value,

    }

    socket.emit('message', mensaje)
    
    console.log(mensaje)
    return false
}