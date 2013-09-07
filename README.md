Self C-Cure
===========

Webapp code for a Fall 2013 PenApps hackathon application.


DATA
----
```
user: {
    email:
    id:
}

device: {
    name: String,
    userId: ObjectId,
    limit: Number,
    ranges: [{
        start: Number (####),
        end: Number (####)
    }],
    armed: Boolean
}
```

API
---

POST: auth/login/  
POST,PUT,GET,DELETE: users/:id/devices/:id

[MIT License](http://opensource.org/licenses/MIT) (c) Thotpod 2013
