const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8000);
console.log('');
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

console.log('console listening');