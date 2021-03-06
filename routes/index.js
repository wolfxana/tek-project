const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const classController = require('../controllers/classesController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', authController.isLoggedIn, catchErrors(userController.index));
router.post('/', catchErrors(postController.createPost));
router.get('/events/', authController.isLoggedIn, (req, res) => res.render('calendar'));
router.get('/chat/', authController.isLoggedIn, userController.chat);

router.get('/profile/', authController.isLoggedIn, userController.profile);
router.post('/profile/', authController.isLoggedIn, userController.update);

router.get('/login/', (req, res) => {
	res.render('login', {'title': 'login'});
});
router.post('/login/', authController.login);

router.get('/logout/', authController.logout);

router.get('/contact/', authController.isLoggedIn, userController.contact);
router.post('/contact/', authController.isLoggedIn, userController.sendEmail);

router.post('/comment/:id/', catchErrors(commentController.createComment));

router.get('/calendar/', authController.isLoggedIn, (req, res) => { res.render('calendar')});
router.get('/mail/', authController.isLoggedIn, (req, res) => { res.render('mail')});

//tags routes
router.get('/tags/', authController.isLoggedIn, userController.getTags);
router.post('/tags/', authController.isLoggedIn, userController.createTag);

//courses routes
router.get('/courses/', authController.isLoggedIn, userController.getCourses);

// library routes
router.get('/library/', authController.isLoggedIn, userController.getBooks);

//search
router.get('/search/', authController.isLoggedIn,  catchErrors(userController.search));

//teacher routes
router.get('/my-classes/', authController.isLoggedIn, authController.isTeacher, classController.getClassesByTeacher);

//reactions api
router.post('/api/post/:id/like/', catchErrors(userController.like));
router.post('/api/post/:id/dislike/', catchErrors(userController.dislike));

module.exports = router;
