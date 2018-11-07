var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (data) {
    console.log('New message', data);
    var li = jQuery('<li></li>');
    li.text(data.from + ': ' + data.text);
    
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var $messageTextbox = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: $messageTextbox.val()
    }, function () {
        $messageTextbox.val('');
    });
});

socket.on('newLocationMessage', function (data) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank" >My current location</a>');

    li.text(`${data.from}: `);
    a.attr('href', data.url);

    li.append(a);
    jQuery('#messages').append(li);
});

var $locationButton = jQuery('#send-location');
$locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    $locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        $locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        $locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});