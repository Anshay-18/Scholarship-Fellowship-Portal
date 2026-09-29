import { inMemoryStore } from '../config/db.js';

export const createOrder = (req, res) => {
  const buyer = req.user;
  const { productId, quantityKg, deliveryAddress, deliveryNotes } = req.body;

  if (!productId || !quantityKg || !deliveryAddress) {
    return res.status(400).json({
      success: false,
      message: 'productId, quantityKg, and deliveryAddress are required.'
    });
  }

  const product = inMemoryStore.products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Crop listing not found.' });
  }

  const requestedQty = Number(quantityKg);
  if (requestedQty > product.availableQuantityKg) {
    return res.status(400).json({
      success: false,
      message: `Insufficient stock. Only ${product.availableQuantityKg} kg available.`
    });
  }

  // Deduct inventory
  product.availableQuantityKg -= requestedQty;
  if (product.availableQuantityKg <= 0) {
    product.status = 'SOLD_OUT';
  }

  const subtotal = requestedQty * product.farmerPricePerKg;
  // Shared logistics delivers 40% cheaper freight compared to individual transit
  const logisticsFee = Math.round(requestedQty * 1.8 * 100) / 100;
  const totalAmount = Math.round((subtotal + logisticsFee) * 100) / 100;

  const newOrder = {
    id: `ord-${Date.now()}`,
    buyerId: buyer.id,
    buyerName: buyer.name,
    productId: product.id,
    cropName: product.cropName,
    farmerId: product.farmerId,
    farmerName: product.farmerName,
    quantityKg: requestedQty,
    pricePerKg: product.farmerPricePerKg,
    subtotal,
    logisticsFee,
    sharedLogisticsDiscountApplied: true,
    totalAmount,
    deliveryAddress,
    deliveryNotes: deliveryNotes || '',
    status: 'CONFIRMED',
    batchRouteId: 'rt-shared-mumbai-01',
    createdAt: new Date().toISOString()
  };

  inMemoryStore.orders.unshift(newOrder);

  // Emit socket event if io is attached to req.app
  const io = req.app.get('io');
  if (io) {
    io.emit('order:created', {
      orderId: newOrder.id,
      crop: newOrder.cropName,
      quantityKg: newOrder.quantityKg,
      farmerId: newOrder.farmerId,
      status: newOrder.status
    });
  }

  res.status(201).json({
    success: true,
    message: 'Order placed successfully directly with farmer. Bypassed middlemen fees!',
    data: newOrder
  });
};

export const getBuyerOrders = (req, res) => {
  const buyerId = req.user.id;
  const orders = inMemoryStore.orders.filter(o => o.buyerId === buyerId);
  res.status(200).json({ success: true, count: orders.length, data: orders });
};

export const getFarmerOrders = (req, res) => {
  const farmerId = req.user.id;
  const orders = inMemoryStore.orders.filter(o => o.farmerId === farmerId);
  res.status(200).json({ success: true, count: orders.length, data: orders });
};
