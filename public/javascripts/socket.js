(() => {
    if (Notification.permission == 'default') {
        Notification.requestPermission(() => {
            console.log('o usuário ainda não deu permissão');
        });
    }

    var notify = function (data, type) {
        var notification = new Notification(data.title, {
            body: data.msg,
            icon: '/images/' + type + '.png'
        });
    }

    var socket = io('http://localhost:3000');

    socket.on('hello', (msg) => {
        console.log(msg);
        //notify(msg, 'user');
    });

    $('#user_remove').click((e) => {
        var nome = $('#user_remove').data('nome');

        $.get($('#user_remove').attr('href'), function () {
            socket.emit('user_remove', {nome: nome});
            window.location = '/users';
        });

        e.preventDefault();
    });

    socket.on('user_add_response', (msg) => {
        console.log(msg);
        notify(msg, 'user_add');
        $('main').load('/users #content_container');
    });

    socket.on('user_remove_response', (msg) => {
        console.log(msg);
        notify(msg, 'user_remove');
        $('main').load('/users #content_container');
    });

    $('#user_add').submit((e) => {

        var formDataArray = $('#user_add').serializeArray();
        var data = {
            nome: null
        };

        for (var i = 0; i < formDataArray.length; i++) {
            if (formDataArray[i].name == 'nome') {
                data.nome = formDataArray[i].value;
            }
        }

        $.ajax({
            type: 'POST',
            url: $('#user_add').attr('action'),
            data: $('#user_add').serialize(),
            success: () => {
                socket.emit('user_add', data);
                window.location = '/users';
            }
        });

        e.preventDefault();
    });

})();