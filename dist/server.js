'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const express_rate_limit_1 = require('express-rate-limit');
const error_middleware_1 = __importDefault(
  require('./middleware/error.middleware'),
);
const config_1 = __importDefault(require('./middleware/config'));
const port = config_1.default.port || 3000;
// create instance from the server
const app = (0, express_1.default)();
// middlewares
app.use(
  (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // time
    limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  }),
);
// set view engine to ejs
app.set('view engine', 'ejs');
// routing home
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World, This is Home Page',
  });
});
// for testing end point throw new error
app.get('/error', (req, res) => {
  throw new Error("Error from this endpoint '/error'");
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
