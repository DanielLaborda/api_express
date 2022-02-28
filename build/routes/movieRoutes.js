"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const movie_1 = __importDefault(require("../models/movie"));
const review_1 = __importDefault(require("../models/review"));
class MovieRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                query: {},
                sort: { date: -1 },
                populate: 'account',
                limit: 5
            };
            const movies = yield movie_1.default.paginate(options);
            res.json(movies);
        });
    }
    getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = [];
            // consultamos la pelicula
            const movie = yield movie_1.default.findOne({ _id: req.params.id }).populate('reviews');
            if (movie !== null) {
                movie.reviews.map((aux) => {
                    reviews.push({
                        '_id': aux._id.toString(),
                        'platform': aux.platform.toString(),
                        'author': aux.author,
                        'body': aux.body,
                        'score': aux.score,
                        'createAT': aux.createAT,
                        'updateAT': aux.updateAT
                    });
                });
                //ordenamos las reviews
                reviews.sort((n1, n2) => {
                    if (n1.platform > n2.platform) {
                        return 1;
                    }
                    if (n1.platform < n2.platform) {
                        return -1;
                    }
                    return 0;
                });
                // mostramos resultados
                const result = {
                    _id: movie._id,
                    slug: movie.slug,
                    image: movie.image,
                    title: movie.title,
                    director: movie.director,
                    platform: movie.platform,
                    score: movie.score,
                    createAt: movie.createAt,
                    updateAT: movie.updateAT,
                    reviews: reviews
                };
                res.json(result);
            }
            else {
                res.json('Un error ocurrio');
            }
        });
    }
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.body.title;
            let existMovieID = '';
            //Consultamos la lista de pelis
            const url = 'http://localhost:7000/api/movies/';
            const movies = yield axios_1.default.get(url).then(response => {
                return response.data;
            }).catch(error => {
                console.log('Error en la api' + error);
                return '';
            });
            movies.map((element) => {
                if (title === element.title) {
                    existMovieID = element._id;
                }
            });
            // creamos o modificamos
            if (!existMovieID) {
                const newMovie = new movie_1.default(req.body);
                yield newMovie.save();
                res.json({ data: newMovie });
            }
            else {
                console.log(existMovieID);
                const updateData = { 'title': req.body.title };
                if (req.body.image) {
                    updateData['image'] = req.body.image;
                }
                if (req.body.director) {
                    updateData['director'] = req.body.director;
                }
                const updateMovie = yield movie_1.default.findOneAndUpdate({ _id: existMovieID }, updateData, { new: true });
                res.json(updateMovie);
            }
        });
    }
    updateMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movie_1.default.findOne({ _id: req.params.id }, function (error, doc) {
                if (error) {
                    res.json('this ID is incorrect');
                }
                else {
                    const newMovie = movie_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
                    res.json(newMovie);
                }
            });
        });
    }
    deleteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movie_1.default.findOneAndDelete({ _id: req.params.id });
            res.json('se borro con exito');
        });
    }
    createReviewMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = new review_1.default(req.body);
            yield newReview.save();
            console.log(newReview);
            const movie = yield movie_1.default.findOne({ _id: req.params.id }).populate('reviews');
            let updateReview = [];
            if (movie) {
                updateReview = movie.reviews;
                updateReview.push({ newReview });
            }
            const newMovie = yield movie_1.default.findOneAndUpdate({ _id: req.params.id }, { 'reviews': updateReview }, { new: true });
            res.json(newMovie);
        });
    }
    cloneMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movie_1.default.findOne({ _id: req.params.id }, { _id: false }, function (error, doc) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        res.json('this ID is incorrect');
                    }
                    else {
                        const newData = {
                            'slug': doc.slug,
                            'image': doc.image,
                            'title': doc.title,
                            'director': doc.director,
                            'platform': doc.platform,
                            'score': doc.score,
                            'createAt': doc.createAt,
                            'updateAT': doc.updateAT,
                            'reviews': doc.reviews
                        };
                        const newMovie = new movie_1.default(newData);
                        yield newMovie.save();
                        res.json({ data: newMovie });
                    }
                });
            });
        });
    }
    routes() {
        this.router.get('/', this.getMovies);
        this.router.get('/:id', this.getMovie);
        this.router.post('/', this.createMovie);
        this.router.post('/createReview/:id', this.createReviewMovie);
        this.router.post('/cloneMovie/:id', this.cloneMovie);
        this.router.put('/:id', this.updateMovie);
        this.router.delete('/:id', this.deleteMovie);
    }
}
const movieRoutes = new MovieRouter();
movieRoutes.routes();
exports.default = movieRoutes.router;
