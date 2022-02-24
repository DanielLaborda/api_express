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
class MovieRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield movie_1.default.find().populate('platform reviews');
            res.json(movies);
        });
    }
    getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getMovie = yield movie_1.default.findOne({ _id: req.params.id }).populate('platform reviews');
            if (getMovie == undefined) {
                res.json('Ese Dato no existe');
            }
            else {
                res.json(getMovie);
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
            const newMovie = yield movie_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(newMovie);
        });
    }
    deleteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movie_1.default.findOneAndDelete({ _id: req.params.id });
            res.json('se borro con exito');
        });
    }
    routes() {
        this.router.get('/', this.getMovies);
        this.router.get('/:id', this.getMovie);
        this.router.post('/', this.createMovie);
        this.router.put('/:id', this.updateMovie);
        this.router.delete('/:id', this.deleteMovie);
    }
}
const movieRoutes = new MovieRouter();
movieRoutes.routes();
exports.default = movieRoutes.router;
