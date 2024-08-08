const uploadRouter = require('./controllers/upload');

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use('/', uploadRouter);

app.listen(8080, () => {
    console.log('伺服器啟動在 http://localhost:8080');
});
