var auth = require('./auth.js'),
    device = require('./device.js'),
    filters = require('./filters.js'),
    site = require('./site.js')

// SENSITIVE CODE, for now seems fine
//app.all('*', filters.setReqView )

app.get( '/', site.home);
//app.get( '/', site.pageA);
//app.get( '/pageB', site.pageB);

//app.get( '/auth/popover', auth.popover);
app.post('/auth/signup', auth.signup)
app.post('/auth/login',  auth.login)

app.get('/user/:userId?/devices/:deviceId?', device.retrieve);
app.post('/user/:userId?/devices/:deviceId?', device.register);
