import express, { NextFunction, Request, Response } from 'express';
import Error from '../interface/error.interface';

const errorHandeling = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'oops! somthing went wrong';
  res.status(status).json({
    status,
    message,
  });
};

export default errorHandeling;
