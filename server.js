const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// const {router: usersRouter} = require('./users');

const {PORT, DATABASE_URL} = require('./config');
const {Account} = require('./models/account');
const {routes, app} = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));
// logging
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'siege rhino',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.locals.moment = require('moment');

mongoose.Promise = global.Promise;

passport.use(new LocalStrategy({usernameField: 'username'}, Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

// this function connects to our database, then starts the server
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });  
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

// app.listen(process.env.PORT || 8080);