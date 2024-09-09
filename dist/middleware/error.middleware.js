"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandeling = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'oops! somthing went wrong';
    res.status(status).json({
        status,
        message,
    });
};
exports.default = errorHandeling;
