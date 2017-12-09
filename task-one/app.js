const pug = require('pug');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Init App
var app = express();

// Load View Engine
app.set('view engine', 'pug')

// Register a simple middleware to get the IP, method, and URL the client is requesting
app.use((req, res, next) => {
    let output = `New connection from ${req.ip} :: ${req.method} ${req.url}`;
    console.log(output); // Output the data to console
    if (req.url === '/robots.txt') return res.status(403).render('deny');

    next(); // Continue with the code execution.
});

// Add cookieParser middleware
app.use(cookieParser());

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * Home route (/)
 * Can be accessed by going to http://example.com:3000/
 */
app.get('/', (req, res) => res.send('Hello World - Brijesh'));

const usersURL = 'https://jsonplaceholder.typicode.com/users';
const postsURL = 'https://jsonplaceholder.typicode.com/posts';

function getUsers() {
  return axios.get(usersURL);
}

function getPostsCount() {
  return axios.get(postsURL);
}

/**
 * Authors route (/authors)
 * This page can be accessed by going to http://example.com:3000/authors
 */
app.get('/authors', (req, res) => {
  axios.all([getUsers(), getPostsCount()])
    .then(axios.spread((users, posts) => {
      name = [];
      users.data.forEach((user) => {
        name.push(user.name);
      });
      noOfPosts = [];
      posts.data.forEach((post) => {
        if(noOfPosts[post.userId - 1] == null){
          noOfPosts[post.userId - 1] = 1;
        }
        else {
          noOfPosts[post.userId - 1] += 1;
        }
      });
      for(var i = 0; i < name.length; i++) {
          res.write('=> ' + name[i] + ' created ' + noOfPosts[i] + ' posts\n');
      }
      res.end();
    })).catch((error) => {
        res.status(500).render('error');
    });
});

/**
 * Set Cookie route (/setcookie)
 * This page can be accessed by going to http://example.com:3000/setcookie
 */
app.get('/setcookie', (req, res) => {
  res.cookie('name', 'Brijesh')
  .cookie('age', 19)
  .send('Cookie is set');
});

/**
 * Get Cookies route (/getcookies)
 * This page can be accessed by going to http://example.com:3000/getcookies
 */
app.get('/getcookies', (req, res) => {
  res.send('Name: ' + req.cookies.name + ' Age:' + req.cookies.age);
});

/**
 * HTML route (/html)
 * This page can be accessed by going to http://example.com:3000/html
 */
app.get('/html', (req, res) => res.render('page'));

/**
 * Input route (/input)
 * This page can be accessed by going to http://example.com:3000/input
 */
app.get('/input', (req, res) => res.render('input'));

/**
 * Output route (/output)
 * This page can be accessed by going to http://example.com:3000/output
 */
app.post('/output', (req, res) => {
    console.log('Parsed data from POST request /input', req.body.data);
    res.send('We logged the data and printed it in the console.'
        + ' Here is a copy of what you sent => ' + '<b>' + req.body.data + '</b>');
});

/**
 * Starts the webserver (router) on port 3000 and listens for connections
 */
app.listen(3000, () => console.log('Server started on port 3000'));
