var express = require('express');
var router = express.Router();

function isLoggedIn(req,res,next){
	if( req.session.user_id ){
		res.locals.pugVars.userName = 'test'
		next();
	} else {
		res.send('You must be logged in to access this page.');
	}
}

function queryAllBooks(req,res,next){
	// query all books and place in pugvars
	res.locals.pugVars.pages = 15;
	res.locals.pugVars.currentPage = 8;
	next();
}

router.get('/', function(req, res, next) {
  res.render('index', res.locals.pugVars);
});
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', res.locals.pugVars);
});
router.get('/books', queryAllBooks, function(req, res, next) {
  res.render('books', res.locals.pugVars);
});

router.post('/auth', function (req, res) { 
	var post = req.body; 
	if (post.user === '1' && post.password === '2') { 
		req.session.user_id = 'johns_user_id_here' 
		res.send('authenticated'); 
	} else { 
		res.send('not allowed'); 
	} 
});


module.exports = router;
