var express = require('express');
const multer = require('multer')
const USERCNTRLS = require('../controllers/Usercntrs')
const ADMINCTRLS = require('../controllers/Admincntr')
const BLOGCTRLS = require('../controllers/blogcntr')
var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

//Admin Sign And Login
router.post('/AdminSign', ADMINCTRLS.AdminSign)
router.post('/AdminLogin', ADMINCTRLS.AdminLogin)

//User Sign And Login
router.post('/usersignup', USERCNTRLS.UserSign)
router.post('/LoginData', USERCNTRLS.Login)

//Blog Api
router.post('/AddBlog', upload.single('image'), ADMINCTRLS.SECURE, BLOGCTRLS.AddBlog)
router.get('/getBlogData', ADMINCTRLS.SECURE, BLOGCTRLS.getBlogData)
router.delete('/DeleteBlog', ADMINCTRLS.SECURE, BLOGCTRLS.DeleteBlog)
router.put('/UpdateBlog', ADMINCTRLS.SECURE, BLOGCTRLS.UpdateBlog)

module.exports = router;
