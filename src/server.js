import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import bodyParser from 'body-parser'
import session from 'cookie-session'
import { renderToString } from 'react-dom/server';
import mongoose from 'mongoose'
import dbController from './dbController.js'
console.log(process.env)

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

mongoose.connect(process.env.RAZZLE_DB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connecting to db')
});

server.set('trust proxy', 1)

var sessionData = {
  secret: 'booksGud',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}

function renderReactComponent(req, res) {
  const context = {};
  const serverData = res.locals.serverData ? res.locals.serverData : {};
  console.log('serverdata', serverData)
  // Render component to html
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App {...serverData} />
    </StaticRouter>
  );
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Book My Life</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''}
        ${process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`}
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(serverData).replace(/</g, '\\u003c')}
        </script
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  }
}

function initializeServerData(req, res, next) {
  res.locals.serverData = {};
  next();
}
function isLoggedIn(req, res, next) {
  console.log('is logged in?')
  console.log(req.session)
  if (req.session.user) {
    res.locals.serverData.isLoggedIn = true;
  }
  next();
}
function requireLoggedIn(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    res.send('You must be logged in to access this page.');
  }
}
function requireNotLoggedIn(req, res, next) {
  if (req.session.user_id) {
    res.send('You are already logged in');
  } else {
    next();
  }
}

// Middleware and routes
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(session(sessionData))
  .use(initializeServerData)
  // Routes
  .get('/books-for-trade', isLoggedIn, async (req, res, next) => {
    var currentPage = req.query.page ? req.query.page : 1;
    currentPage = parseInt(currentPage, 10)
    
    var books = await dbController.findBooksForTrade( currentPage )
    res.locals.serverData.books = books
    res.locals.serverData.currentPage = currentPage;
    // use books.total
    res.locals.serverData.totalPages = 22;
    next()
  }, renderReactComponent)

  .get('/', isLoggedIn, renderReactComponent)
  .get('/profile', requireLoggedIn, (req, res, next) => {
    // Get all profile data
    // And also all books user has
    res.locals.serverData.profile = {
      firstName: 'first name',
      lastName: 'last name',
      city: 'coolsberg',
      state: 'cali',
      userName: 'userName',
      booksTraded: 2,
      requestMade: 5,
      requestReceived: 7
    }
  }, renderReactComponent)
  .get('/search/books-for-trade', (req, res) => {

  })
  .get('/search/all-books', (req, res) => {

  })

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .post('/register', requireNotLoggedIn, async function (req, res) {
    var post = req.body;
    if ( !post.userName || !post.password || !post.firstName || !post.lastName || !post.city || !post.state ) {
      res.redirect( encodeURI( '/?error=You must complete the form' ) )
      return;
    }
    var user = await dbController.registerUser(post.userName, post.password, post.firstName, post.lastName, post.city, post.state )
    if (user) {
      req.session.user = user
      res.redirect('/')
    } else {
      res.redirect( encodeURI( '/?error=That username/password combination is already taken') )
    }
  })
  .post('/login', requireNotLoggedIn, async function (req, res) {
    var post = req.body;
    var user = await dbController.authenticate(post.userName, post.password)
    if ( user.length !== 0 ) {
      req.session.user = user;
      res.redirect('/')
    } else {
      res.redirect( encodeURI( '/?error=That username/password combination does not exist, please register first' ) )
    }
  })
  .post('/add-book', async (req, res) => {
    console.log('addingbook ' + req.body.book)
    await dbController.addBook( req.body.book )
    res.send('added ' + req.body.book)
  })
  .get('/logout', function (req, res) {
    req.session = null
    res.redirect('/');
  })

export default server;
