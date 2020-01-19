const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./route');
const { setupWebsocket } = require('./websocket');

const azunerMobileApps = require('azure-mobile-apps');
const app = express();
const mobile = azunerMobileApps();
app.use(mobile);
const server = http.Server(app);

const port = process.env.PORT || 3030;
setupWebsocket(server);

mongoose.connect('mongodb+srv://alejackiu:141245@cluster0-nriqr.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(routes);



server.listen(port);