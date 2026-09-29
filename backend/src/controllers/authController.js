import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { inMemoryStore } from '../config/db.js';

export const registerUser = (req, res) => {
  const { name, phone, role, district, state, fpoName } = req.body;

  if (!name || !phone || !role) {
    return res.status(400).json({ success: false, message: 'Name, phone, and role are required.' });
  }

  // Strict role verification: strictly FARMER or BUYER
  if (!['FARMER', 'BUYER'].includes(role.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: "Invalid role. Role must strictly be 'FARMER' or 'BUYER'. No Admin accounts permitted."
    });
  }

  const existing = inMemoryStore.users.find(u => u.phone === phone);
  if (existing) {
    return res.status(409).json({ success: false, message: 'User with this phone number already exists.' });
  }

  const newUser = {
    id: `usr-${role.toLowerCase()}-${Date.now()}`,
    name,
    phone,
    role: role.toUpperCase(),
    district: district || (role.toUpperCase() === 'FARMER' ? 'Nashik' : 'Mumbai'),
    state: state || 'Maharashtra',
    fpoName: role.toUpperCase() === 'FARMER' ? (fpoName || 'Independent Farmer') : null,
    trustScore: 5.0,
    totalRatings: 0,
    successfulOrders: 0
  };

  inMemoryStore.users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, role: newUser.role, district: newUser.district },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: `${newUser.role} account registered successfully.`,
    token,
    user: newUser
  });
};

export const loginUser = (req, res) => {
  const { phone, role } = req.body;

  const user = inMemoryStore.users.find(u => u.phone === phone);
  if (!user) {
    // If user doesn't exist, auto-create a demo session for rapid hackathon review
    const targetRole = (role || 'FARMER').toUpperCase();
    const demoUser = {
      id: `usr-${targetRole.toLowerCase()}-${Date.now()}`,
      name: targetRole === 'FARMER' ? 'Demo Farmer' : 'Demo Buyer',
      phone,
      role: targetRole,
      district: targetRole === 'FARMER' ? 'Nashik' : 'Mumbai',
      state: 'Maharashtra',
      trustScore: 4.9,
      totalRatings: 15,
      successfulOrders: 18
    };
    inMemoryStore.users.push(demoUser);

    const token = jwt.sign(
      { id: demoUser.id, name: demoUser.name, role: demoUser.role, district: demoUser.district },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Demo session started.',
      token,
      user: demoUser
    });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role, district: user.district },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    token,
    user
  });
};
