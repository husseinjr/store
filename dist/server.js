"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./middleware/config"));
const connection_1 = __importDefault(require("./Database/connection"));
const port = config_1.default.port || 3000;
// create instance from the server
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // time
    limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
}));
// set view engine to ejs
app.set('view engine', 'ejs');
// database connection ->
connection_1.default
    .sync({ force: true })
    .then(() => {
    console.log('syncornization done..');
})
    .catch((err) => {
    console.log('error in synchorization : ', err);
});
// routing home
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World, This is Home Page',
    });
});
// for testing end point throw new error
app.get('/error', (req, res) => {
    // throw new Error("Error from this endpoint '/error'");
    res.json({
        message: 'we will not reach hear',
    });
});
// handel errors
app.use(error_middleware_1.default);
// Global error handeling rediricting for 404 page
app.use((_req, res) => {
    res.status(404).render('404', {
        errorMessage: 'The page you are looking for does not exist.',
    });
});
// start the server
app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});
exports.default = app;
