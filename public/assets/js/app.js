var numberField = document.querySelector('input[name=number]');
var textField = document.querySelector('input[name=text]');
var button = document.querySelector('button[type=button]');

function send() {
    var number = numberField.value.replace(/\D/g,''); // remove all non-numeric chars
    var text = textField.value;
    fetch('/send-sms', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(function(res){ console.log(res) })
    .catch(function(error){ console.log(error)});
}

textField.addEventListener('keyup', function(e) {
    if ((e.keyCode || e.charCode) === 13) send();
}, false); // when a user presses an Enter key

button.addEventListener('click', send, false); // when a user click the "Send" button