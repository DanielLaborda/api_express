'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const PlatformSchema = new mongoose_1.Schema({
    icon: { type: String, lowercase: true },
    title: { type: String },
    createAT: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Platform', PlatformSchema);
