var auth = require('./auth.js'),
    device = require('./device.js'),
    filters = require('./filters.js'),
    site = require('./site.js')

app.get('/', site.home);

/* Device modification */
app.put('/user/:userId?/devices/:deviceId?', device.update);
app.delete('/user/:userId?/devices/:deviceId?', device.delete);

/* Authentication */
app.post('/auth/signup/', auth.signup)
app.post('/auth/login/',  auth.login)

/* Device creation and retrieval */
app.get('/user/:userId?', filters.requireLogin);
app.get('/user/:userId?', device.retrieve);
app.post('/user/:userId?/devices/', filters.requireLogin);
app.post('/user/:userId?/devices/', device.register);

