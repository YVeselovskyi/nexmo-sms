const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const NexmoApp = require('nexmo');

const config = require('./config.js');

const nexmo = new NexmoApp({
    apiKey: config.apiKey,
    apiSecret: config.apiSecret
}, {debug: true});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/send-sms', (req, res) => {
    res.send(req.body);
    const toNumber = req.body.number;
    const text = req.body.text;
    nexmo.message.sendSms(config.number, toNumber, text, {
        type: 'unicode'
    }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            console.dir(responseData);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
