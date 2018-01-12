import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import bodyParser from 'body-parser'
import session from 'express-session'
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server.set('trust proxy', 1 )

var sessionData = {
  secret: 'booksGud',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}


function renderReactComponent(req, res) {
  const context = {};
  const serverData = res.locals.serverData ? res.locals.serverData : {};
  console.log('servdata')
  console.log( serverData )

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

function initializeServerData(req,res,next){
  res.locals.serverData = {};
  next();
}

function isLoggedIn(req,res,next){
  console.log('is logged in?')
  console.log( req.session )
	if( req.session.user_id ){
		res.locals.serverData.isLoggedIn = true;
	}
  next();
}

function requireLoggedIn(req,res,next){
	if( req.session.user_id ){
		next();
	} else {
		res.send('You must be logged in to access this page.');
	}
}

function requireNotLoggedIn(req,res,next){
  if( req.session.user_id ){
    res.send('You are already logged in');
  } else {
    next();
  }
}

// MIDDLEWARES GO HERE
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(session(sessionData))
  .use(initializeServerData)
  // Routes
  .get('/books', isLoggedIn, (req,res,next)=>{
    var currentPage = req.query.page ? req.query.page : 1;
    res.locals.serverData.currentPage = currentPage;
    // Query for total Pages
    res.locals.serverData.totalPages = 22;
    // find books within query limit currentPage -> currentPage+10
    res.locals.serverData.books = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ]
    next();
  }, renderReactComponent )

  .get('/', isLoggedIn, renderReactComponent )
  .get('/profile', requireLoggedIn, renderReactComponent )

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  })) 
  .post('/register', requireNotLoggedIn, function (req, res) {
    var post = req.body;

    // Send user and password into db and get unique key
    // Set req.session.user_id to key
    if (post.user === '1' && post.password === '2') {
      req.session.user_id = 'johns_user_id_here'
      res.redirect('/')
    } else {
      res.send('That username/password combination already exists, try something else!')
    }
  })
  .post('/login', requireNotLoggedIn, function (req, res) {
    var post = req.body;
    
    // Check user and password in db
    // if exists set req.session.user_id to unique key
    if (post.user === '1' && post.password === '2') {
      req.session.user_id = 'johns_user_id_here'
      res.redirect('/')
    } else {
      res.send('That username/password combination does not exist, please register first!');
    }
  })
  .get('/logout', function(req,res) {
    req.session.destroy(()=>{
      res.redirect('/');
    })
  })

export default server;
