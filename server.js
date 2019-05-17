const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const Data = require('./models/Data.js');

app.post('/', (req, res) => {
    Data.findOne({
        'user': '123415'
    }).then(data => {
        if (data) {
            let matchingData = data.cpuUsage.filter(x => {
                if (x.value == req.body.value && x.date == req.body.date) {
                    return true;
                }
                return false;
            });

            if (matchingData.length == 0) {
                data.cpuUsage.push({
                    date: req.body.date,
                    value: req.body.value
                });

                data.save((err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    res.json({
                        recived: true
                    });

                });
            } else {
                res.json({
                    recived: true
                });
            }

        } else {
            let data = new Data({
                user: '123415',
                cpuUsage: [{
                    date: new Date().toISOString(),
                    value: req.body.value
                }]
            });

            data.save(data, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(`Created user ${data.user}`);

                res.json({
                    recived: true
                })
            });
        }
    });
});

mongoose.connect('mongodb://user_123:user_123@ds147391.mlab.com:47391/vanguardio', {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const port = 80;

app.listen(port, () => console.log(`Server running on port ${port}`));
