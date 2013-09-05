var auth = require('./auth.js'),
    device = require('./device.js'),
    filters = require('./filters.js'),
    site = require('./site.js')

app.get('/', site.home);

app.post('/auth/signup/', auth.signup)
app.post('/auth/login/',  auth.login)

app.get('/user/:userId?', device.retrieve);
app.post('/user/:userId?/devices/', device.register);
app.put('/user/:userId?/devices/:deviceId?', device.update);