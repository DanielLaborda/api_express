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
const util_1 = require("util");
const review_1 = __importDefault(require("../models/review"));
class ReviewRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield review_1.default.find().populate('platform');
            res.json(reviews);
        });
    }
    getReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield review_1.default.findOne({ _id: req.params.id }, function (error, doc) {
                if (error) {
                    res.json('This ID is incorrect');
                }
                else {
                    res.json(doc);
                }
            });
        });
    }
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataInvalid = false;
            if (req.body.score) {
                if (!(0, util_1.isNumber)(req.body.score) || req.body.score < -1 || req.body.score > 6) {
                    dataInvalid = true;
                }
            }
            if (!dataInvalid) {
                const newReview = new review_1.default(req.body);
                yield newReview.save();
                res.json({ data: newReview });
            }
            else {
                res.json("Data not valid");
            }
        });
    }
    updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = yield review_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(newReview);
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield review_1.default.findOneAndDelete({ _id: req.params.id });
            res.json('se borro con exito');
        });
    }
    routes() {
        this.router.get('/', this.getReviews);
        this.router.get('/:id', this.getReview);
        this.router.post('/', this.createReview);
        this.router.put('/:id', this.updateReview);
        this.router.delete('/:id', this.deleteReview);
    }
}
const reviewRoutes = new ReviewRouter();
reviewRoutes.routes();
exports.default = reviewRoutes.router;
