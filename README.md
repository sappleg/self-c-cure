Self C-Cure
===========

Webapp code for a Fall 2013 PenApps hackathon application.


DATA
###
```
user: {
    email:
    id:
}

devices: [{
    name:
    type: 
    user_id:
    rules: {
        limit: integer,
        ranges: [{
            start: time,
            end: time
        }]
    }
    armed:
}]
```

API
###

POST: auth/login/:id
POST,PUT,GET,DELETE: users/:id/devices/:id

[MIT License](http://opensource.org/licenses/MIT) (c) Thotpod 2013
