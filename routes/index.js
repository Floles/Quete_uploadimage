const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: 'tmp/'
});

/* GET home page. */
router.get('/monupload', function(req, res, next){
	res.render('index');
});

router.post('/monupload', upload.array('monfichier', 4), function(req, res, next) {
	req.files.forEach(function(el){
	   if (el.size < (3 * 1024 * 1024) && (el.mimetype === 'image/png')){
	        fs.rename(el.path, 'public/images/' + el.originalname, (err) => console.log(err));    
	        
	    } else {
	        res.send('Vous avez fait une erreur dans le téléchargement');
	    }
	});
	res.send('téléchargement ok')
});

module.exports = router;
