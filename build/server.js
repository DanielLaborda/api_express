'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const helmet_1 = __importDefault(require('helmet'));
const mongoose_1 = __importDefault(require('mongoose'));
const compression_1 = __importDefault(require('compression'));
const cors_1 = __importDefault(require('cors'));
const indexRoutes_1 = __importDefault(require('./routes/indexRoutes'));
const platformRoutes_1 = __importDefault(require('./routes/platformRoutes'));
const reviewRoutes_1 = __importDefault(require('./routes/reviewRoutes'));
const movieRoutes_1 = __importDefault(require('./routes/movieRoutes'));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/pruebad';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('DB is conected'));
        //settings
        this.app.set('port', process.env.PORT || 3000);
        //middlewares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/platforms', platformRoutes_1.default);
        this.app.use('/api/reviews', reviewRoutes_1.default);
        this.app.use('/api/movies', movieRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port:', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
