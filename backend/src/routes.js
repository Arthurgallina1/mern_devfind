const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const router = Router();


router.get('/devs', DevController.index);
router.get('/search', SearchController.index);
/* 
@Sign Up a Dev
**/
router.post('/devs', DevController.store);

module.exports = router;