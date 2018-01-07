var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
