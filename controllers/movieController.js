const movieModel = require("../models/movieModel");

const index = (req, res) => {
    movieModel.index()
        .then(movies => {
            res.render("pages/movies/index", { movies, activeGenre: 'all' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error loading movies");
        });
}

const moviesSearch = (req, res) => {
    const partOfMovieTitle = req.query.partOfMovieTitle || '';
    movieModel.moviesSearch(partOfMovieTitle)
        .then(movies => {
            res.render("pages/movies/index", { movies, activeGenre: '', searchQuery: partOfMovieTitle });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error searching movies");
        });
}

const byGenre = (req, res) => {
    const genre = req.params.genre;
    movieModel.getByGenre(genre)
        .then(movies => {
            res.render("pages/movies/index", { movies, activeGenre: genre.toLowerCase() });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error loading genre movies");
        });
}

const createForm = (req, res) => {
    res.render("pages/movies/createForm");
}

const store = (req, res) => {
    let thumbnail = req.body.thumbnail;
    if (req.file) {
        thumbnail = "/img/uploades/" + req.file.filename;
    }
    
    movieModel.store({
        title: req.body.title,
        year: req.body.year,
        genres: req.body.genres,
        cast: req.body.cast,
        thumbnail: thumbnail,
        extract: req.body.extract
    })
    .then(() => {
        res.redirect("/movies");
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("Error creating movie");
    });
}

const show = (req, res) => {
    const id = req.params.id;
    movieModel.show(id)
        .then(movie => {
            if (!movie) {
                return res.status(404).render("pages/movies/show", { movie: null });
            }
            res.render("pages/movies/show", { movie });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error loading movie details");
        });
}

const updateForm = (req, res) => {
    const id = req.params.id;
    movieModel.show(id)
        .then(movie => {
            if (!movie) {
                return res.redirect("/movies");
            }
            res.render("pages/movies/updateForm", { movie });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error loading movie edit form");
        });
}

const update = (req, res) => {
    const id = req.body.id;
    let thumbnail = req.body.thumbnail;
    if (req.file) {
        thumbnail = "/img/uploades/" + req.file.filename;
    }

    movieModel.update(id, {
        title: req.body.title,
        year: req.body.year,
        genres: req.body.genres,
        cast: req.body.cast,
        thumbnail: thumbnail,
        extract: req.body.extract
    })
    .then(() => {
        res.redirect("/movies/show/" + id);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send("Error updating movie");
    });
}

const destroy = (req, res) => {
    const id = req.params.id;
    movieModel.destroy(id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error deleting movie");
        });
}

module.exports = {
    index,
    moviesSearch,
    byGenre,
    createForm,
    store,
    show,
    updateForm,
    update,
    destroy
}