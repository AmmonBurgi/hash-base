require('dotenv').config();
const express = require('express'),
    // massive = require('massive'),
    // session = require('express-session'),
    // {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env,
    multibase = require('multibase'),
    multihash = require('multihashes'),
    app = express(),
    port = 4030
    // authCtrl = require('./controllers/authController')

    app.use(express.json());

    // app.use(session({
    //     resave: false,
    //     saveUninitialized: true,
    //     secret: SESSION_SECRET,
    //     cookie: {maxAge: 1000 * 60 * 60 * 24}
    // }));

    // Authentication Endpoints VVV
    // app.post('/api/auth/login', authCtrl.login)
    // app.post('/api/auth/register', authCtrl.register)
    // app.get('/api/auth/logout', authCtrl.logout)

    // massive({
    //     connectionString: CONNECTION_STRING,
    //     ssl: {rejectUnauthorized: false}
    // }).then(db => {
    //     app.set('db', db);
    //     console.log('db connected!')
    // });
    
        app.listen(port, () => console.log(`Server is listening on port ${port}`));