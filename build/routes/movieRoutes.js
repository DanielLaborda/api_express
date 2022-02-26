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
const movie_1 = __importDefault(require("../models/movie"));
const review_1 = __importDefault(require("../models/review"));
class MovieRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var options = {
                query: {},
                sort: { date: -1 },
                populate: "account",
                limit: 5
            };
            const movies = yield movie_1.default.paginate(options);
            res.json(movies);
        });
    }
    getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let reviews = [];
            // consultamos la pelicula
            const movie = yield movie_1.default.findOne({ _id: req.params.id }).populate('reviews');
            if (movie !== null) {
                movie.reviews.map((aux) => {
                    reviews.push({
                        "_id": aux._id.toString(),
                        "platform": aux.platform.toString(),
                        "author": aux.author,
                        "body": aux.body,
                        "score": aux.score,
                        "createAT": aux.createAT,
                        "updateAT": aux.updateAT
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
                res.json("Un error ocurrio");
            }
        });
    }
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMovie = new movie_1.default(req.body);
            yield newMovie.save();
            res.json({ data: newMovie });
        });
    }
    updateMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movie_1.default.findOne({ _id: req.params.id }, function (error, doc) {
                if (error) {
                    res.json('this id is incorrect');
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
            const newMovie = yield movie_1.default.findOneAndUpdate({ _id: req.params.id }, { "reviews": updateReview }, { new: true });
            res.json(newMovie);
        });
    }
    routes() {
        this.router.get('/', this.getMovies);
        this.router.get('/:id', this.getMovie);
        this.router.post('/', this.createMovie);
        this.router.put('/:id', this.updateMovie);
        this.router.delete('/:id', this.deleteMovie);
        this.router.post('/createReview/:id', this.createReviewMovie);
    }
}
const movieRoutes = new MovieRouter();
movieRoutes.routes();
exports.default = movieRoutes.router;
