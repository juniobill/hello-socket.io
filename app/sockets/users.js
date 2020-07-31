module.exports = function (io) {
    io.sockets.on('connection', (client) => {
        client.emit('hello', {title: 'Bem vindo', msg: 'Você está conectado'});


        client.on('user_add', (data) => {
            client.broadcast.emit('user_add_response', {
                title: 'Novo professor',
                msg: 'O professor ' + data.nome + ' foi contratado!'
            });
        });

        client.on('user_remove', (data) => {
            client.broadcast.emit('user_remove_response', {
                title: 'Professor removido',
                msg: 'O professor ' + data.nome + ' foi demitido!'
            });
        });
    });
}
