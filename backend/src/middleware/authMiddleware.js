import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For easy prototype testing, allow fallback to demo farmer or buyer if x-demo-role is supplied
    const demoRole = req.headers['x-demo-role'];
    if (demoRole === 'FARMER') {
      req.user = { id: 'usr-farm-01', name: 'Ramesh Jadhav', role: 'FARMER', district: 'Nashik' };
      return next();
    } else if (demoRole === 'BUYER') {
      req.user = { id: 'usr-buy-01', name: 'Pooja Sharma', role: 'BUYER', district: 'Mumbai' };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Authentication required. Missing Bearer token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const requireRole = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== allowedRole) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: This resource is strictly restricted to ${allowedRole} accounts.`
      });
    }
    next();
  };
};
