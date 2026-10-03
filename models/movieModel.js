const { MongoClient, ObjectId, mongoConnection } = require('./mongodbConnection');

async function index() {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("movies").find().sort({ year: -1 }).limit(20).toArray();
    await client.close();
    return movies;
}

async function moviesSearch(partOfMovieTitle) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("movies").find({ title: { $regex: partOfMovieTitle, $options: 'i' } }).sort({ year: -1 }).limit(20).toArray();
    await client.close();
    return movies;
}

async function getByGenre(genre) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("movies")
        .find({ genres: { $regex: new RegExp(`^${genre}$`, 'i') } })
        .sort({ year: -1 })
        .limit(20)
        .toArray();
    await client.close();
    return movies;
}

async function show(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    await client.close();
    return movie;
}

async function store(movieData) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const genres = typeof movieData.genres === 'string'
        ? movieData.genres.split(',').map(g => g.trim()).filter(Boolean)
        : (Array.isArray(movieData.genres) ? movieData.genres : []);
    const cast = typeof movieData.cast === 'string'
        ? movieData.cast.split(',').map(c => c.trim()).filter(Boolean)
        : (Array.isArray(movieData.cast) ? movieData.cast : []);

    const doc = {
        title: movieData.title,
        year: parseInt(movieData.year, 10) || new Date().getFullYear(),
        genres: genres,
        cast: cast,
        thumbnail: movieData.thumbnail || '',
        extract: movieData.extract || ''
    };
    const result = await db.collection("movies").insertOne(doc);
    await client.close();
    return result;
}

async function update(id, movieData) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const genres = typeof movieData.genres === 'string'
        ? movieData.genres.split(',').map(g => g.trim()).filter(Boolean)
        : (Array.isArray(movieData.genres) ? movieData.genres : []);
    const cast = typeof movieData.cast === 'string'
        ? movieData.cast.split(',').map(c => c.trim()).filter(Boolean)
        : (Array.isArray(movieData.cast) ? movieData.cast : []);

    const updateDoc = {
        $set: {
            title: movieData.title,
            year: parseInt(movieData.year, 10) || new Date().getFullYear(),
            genres: genres,
            cast: cast,
            thumbnail: movieData.thumbnail || '',
            extract: movieData.extract || ''
        }
    };
    const result = await db.collection("movies").updateOne({ _id: new ObjectId(id) }, updateDoc);
    await client.close();
    return result;
}

async function destroy(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const result = await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
    await client.close();
    return result;
}

async function getAllGenres() {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const genres = await db.collection("movies").distinct("genres");
    await client.close();
    return genres.filter(g => g && typeof g === "string" && g.trim().length > 0).sort();
}

module.exports = {
    index,
    moviesSearch,
    getByGenre,
    getAllGenres,
    show,
    store,
    update,
    destroy
}