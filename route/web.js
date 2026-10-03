const express = require('express');
const webRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

/* const productController = require('../controllers/productController'); */

const movieController = require('../controllers/movieController');

/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/uploades/");
    },
    filename: (req, file, cb) => {
        if(file){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
});

const upload = multer({
    storage: storage
});


/* -------------- route roles ------------------------ */

/* -------------------movies route roles----------------------- */
webRouter.get('/', (req, res) => {
    res.redirect('/movies');
});

webRouter.get('/movies', (req, res) => {
    movieController.index(req, res);
});

webRouter.get('/moviesSearch', (req, res) => {
    movieController.moviesSearch(req, res);
});

webRouter.get('/movies/genre/:genre', (req, res) => {
    movieController.byGenre(req, res);
});

webRouter.get('/movies/createForm', (req, res) => {
    movieController.createForm(req, res);
});

webRouter.post('/movies/store', upload.single('photo'), (req, res) => {
    movieController.store(req, res);
});

webRouter.get('/movies/show/:id', (req, res) => {
    movieController.show(req, res);
});

webRouter.get('/movies/updateForm/:id', (req, res) => {
    movieController.updateForm(req, res);
});

webRouter.post('/movies/update', upload.single('photo'), (req, res) => {
    movieController.update(req, res);
});

webRouter.get('/movies/destroy/:id', (req, res) => {
    movieController.destroy(req, res);
});


/* webRouter.get('/products', (req, res) => {
    productController.index(req, res);
});

webRouter.get('/products/createForm', (req, res) => {
    productController.createForm(req, res);
});

webRouter.post('/products/store', upload.single('photo'), (req, res) => {
    productController.store(req, res);
});

webRouter.get('/products/show/:id', (req, res) => {
    productController.show(req, res);
});

webRouter.get('/products/destroy/:id', (req, res) => {
    productController.destroy(req, res);
});

webRouter.get('/products/updateForm/:id', (req, res) => {
    productController.updateForm(req, res);
});
webRouter.post('/products/update', upload.single('photo'), (req, res) => {
    productController.update(req, res);
}); */


module.exports = webRouter;