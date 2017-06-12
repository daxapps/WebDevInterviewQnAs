const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {router: usersRouter} = require('./users');

app.use(express.static('public'));

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

// logging
app.use(morgan('common'));

app.use('/users/', usersRouter);

app.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});

let server;

function runServer() {
	// const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
  		server = app.listen(PORT, () => {
  			console.log(`Your app is listening on port ${PORT}`);
  			resolve(server);
  		}).on('error', err => {
        mongoose.disconnect();
  			reject(err)
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

app.get('/users', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});





// app.listen(process.env.PORT || 8080);