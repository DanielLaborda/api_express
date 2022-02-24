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
const platform_1 = __importDefault(require("../models/platform"));
class PlatformtRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getPlatforms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const platforms = yield platform_1.default.find();
            res.json(platforms);
        });
    }
    getPlatform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const platform = yield platform_1.default.findOne({ _id: req.params.id });
            if (platform == undefined) {
                res.json('Ese Dato no existe');
            }
            else {
                res.json(platform);
            }
        });
    }
    createPlatform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { icon, title } = req.body;
            console.log(icon);
            const newPlatform = new platform_1.default({ icon: icon, title: title });
            console.log(newPlatform);
            yield newPlatform.save();
            res.json({ data: newPlatform });
        });
    }
    updatePlatform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateDateNew, createDateNew, newData;
            if (req.body.updateAT) {
                updateDateNew = new Date(req.body.updateAT);
            }
            if (req.body.createAt) {
                createDateNew = new Date(req.body.createAt);
            }
            if (updateDateNew && createDateNew) {
                newData = {
                    icon: req.body.icon,
                    title: req.body.title,
                    createAt: createDateNew,
                    updateAT: updateDateNew
                };
            }
            else if (createDateNew) {
                newData = {
                    icon: req.body.icon,
                    title: req.body.title,
                    createAt: createDateNew
                };
            }
            else if (updateDateNew) {
                newData = {
                    icon: req.body.icon,
                    title: req.body.title,
                    updateAT: updateDateNew
                };
            }
            else {
                newData = req.body;
            }
            const newPlatform = yield platform_1.default.findOneAndUpdate({ _id: req.params.id }, newData, { new: true });
            res.json(newPlatform);
        });
    }
    deletePlatform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield platform_1.default.findOneAndDelete({ _id: req.params.id });
            res.json('se borro con exito');
        });
    }
    routes() {
        this.router.get('/', this.getPlatforms);
        this.router.get('/:id', this.getPlatform);
        this.router.post('/', this.createPlatform);
        this.router.put('/:id', this.updatePlatform);
        this.router.delete('/:id', this.deletePlatform);
    }
}
const platformRoutes = new PlatformtRouter();
platformRoutes.routes();
exports.default = platformRoutes.router;
