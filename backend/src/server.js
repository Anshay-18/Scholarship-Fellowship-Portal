import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { config } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import logisticsRoutes from './routes/logisticsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const server = http.createServer(app);

// Socket.io for real-time order matching and shared-logistics telemetry
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'Khet To Ghar API Gateway',
    timestamp: new Date().toISOString(),
    supportedRoles: ['FARMER', 'BUYER'],
    problemStatement: 'SIH 2026 - 26033: Elimination of Intermediaries'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/logistics', logisticsRoutes);

// Error handling middleware
app.use(errorHandler);

// Socket.io Connection Handlers
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  socket.on('join:farmer', (farmerId) => {
    socket.join(`farmer:${farmerId}`);
    console.log(`[Socket.io] Farmer joined room: farmer:${farmerId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

server.listen(config.port, () => {
  console.log('===========================================================');
  console.log(`🌾 KHET TO GHAR BACKEND RUNNING ON PORT ${config.port}`);
  console.log(`🚀 Problem Statement: SIH 2026 (ID: 26033)`);
  console.log(`📡 AI Engine Integration Target: ${config.aiEngineUrl}`);
  console.log('===========================================================');
});
