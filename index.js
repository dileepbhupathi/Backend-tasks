require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router')
const auth = require('./middlewares/auth')

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(auth)

app.use('/', router);

// app.get('/', (req, res) => {
//     res.send({ status: 'API is running!' });
// });

app.use(function (req, res) {
    res.status(404).json({
        error: `URL ${req.url} with method ${req.method} is not exist`
    })
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        error: err.message || "something went wrong"
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error.message || error);
    // process.exit(1); 
});
