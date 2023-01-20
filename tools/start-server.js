const fs = require('fs');
const express = require('express');
const app = express();

const outDir = './out/';
if (!fs.existsSync(outDir)) {
    console.error('Path does not exist: ' + outDir);
    return;
}
app.use(express.static(outDir));
app.listen(3000, () => console.log('server is listening on port:3000'));