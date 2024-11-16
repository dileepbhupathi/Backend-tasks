const express = require('express');
const router = express.Router();
const controllers = require('./controller')
const validators = require('./middlewares/validators')

router.post('/login', validators.login, controllers.login)

router.get('/user/:id', validators.id, controllers.getUser)
router.post('/user',validators.user, controllers.createUser);

// APIs based on the requirements
router.get('/collection', controllers.getCollections)
router.post('/collection', validators.collection, controllers.createCollection)
router.delete('/collection/:id', validators.id, controllers.deleteCollection)

router.post('/recommendation', validators.recommendation, controllers.createRecommendation)
router.delete('/recommendation/:id', validators.id, controllers.removeRecommendation)



// Sample Data import

router.post('/import',controllers.importSampleData)

module.exports = router;
