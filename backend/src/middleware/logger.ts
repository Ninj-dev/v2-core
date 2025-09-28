import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;
    
    const statusColor = status >= 400 ? '🔴' : status >= 300 ? '🟡' : '🟢';
    console.log(`${statusColor} ${method} ${url} - ${status} (${duration}ms)`);
  });

  next();
};