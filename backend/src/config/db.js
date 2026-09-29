/**
 * Database Layer for Khet To Ghar
 * Provides pre-seeded realistic data for seamless hackathon demonstrations
 * and supports connection to MySQL via Prisma or direct driver when configured.
 */

// Initial Seed Dataset for SIH Demonstration
export const inMemoryStore = {
  users: [
    {
      id: 'usr-farm-01',
      name: 'Ramesh Jadhav',
      phone: '9822012345',
      email: 'ramesh.farmer@khet2ghar.in',
      role: 'FARMER',
      district: 'Nashik',
      state: 'Maharashtra',
      fpoName: 'Sahyadri Farmers Producer Co.',
      trustScore: 4.92,
      totalRatings: 48,
      successfulOrders: 52
    },
    {
      id: 'usr-farm-02',
      name: 'Sukhwinder Singh',
      phone: '9814098765',
      email: 'sukhwinder.farm@khet2ghar.in',
      role: 'FARMER',
      district: 'Ludhiana',
      state: 'Punjab',
      fpoName: 'Malwa Organic FPO',
      trustScore: 4.85,
      totalRatings: 34,
      successfulOrders: 38
    },
    {
      id: 'usr-buy-01',
      name: 'Pooja Sharma',
      phone: '9820054321',
      email: 'pooja.buyer@gmail.com',
      role: 'BUYER',
      district: 'Mumbai',
      state: 'Maharashtra',
      address: 'Greenwoods Cooperative Society, Andheri East',
      trustScore: 5.0,
      totalRatings: 12,
      successfulOrders: 12
    }
  ],
  products: [
    {
      id: 'prod-01',
      farmerId: 'usr-farm-01',
      farmerName: 'Ramesh Jadhav',
      fpoName: 'Sahyadri Farmers Producer Co.',
      cropName: 'Red Onion',
      variety: 'Gavran Nashik Special',
      description: 'Sun-cured premium Nashik red onions with thick outer skin and low moisture content. Direct from Dindori farm belt.',
      quantityKg: 1500.0,
      availableQuantityKg: 1200.0,
      farmerPricePerKg: 28.0,
      aiPredictedPricePerKg: 28.5,
      mandiBenchmarkPricePerKg: 26.5,
      claimedGrade: 'GRADE_A',
      aiAssessedGrade: 'GRADE_A',
      aiConfidenceScore: 96.2,
      isFlaggedMismatch: false,
      flagReason: null,
      images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop'],
      harvestDate: new Date(Date.now() - 2 * 86400000).toISOString(),
      district: 'Nashik',
      status: 'ACTIVE'
    },
    {
      id: 'prod-02',
      farmerId: 'usr-farm-01',
      farmerName: 'Ramesh Jadhav',
      fpoName: 'Sahyadri Farmers Producer Co.',
      cropName: 'Hybrid Tomato',
      variety: 'Vaishali Red',
      description: 'Vine-ripened firm tomatoes, harvested early morning. Zero pesticide residue, high lycopene content.',
      quantityKg: 800.0,
      availableQuantityKg: 650.0,
      farmerPricePerKg: 24.0,
      aiPredictedPricePerKg: 23.5,
      mandiBenchmarkPricePerKg: 22.0,
      claimedGrade: 'GRADE_A',
      aiAssessedGrade: 'GRADE_A',
      aiConfidenceScore: 94.8,
      isFlaggedMismatch: false,
      flagReason: null,
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop'],
      harvestDate: new Date(Date.now() - 1 * 86400000).toISOString(),
      district: 'Nashik',
      status: 'ACTIVE'
    },
    {
      id: 'prod-03',
      farmerId: 'usr-farm-02',
      farmerName: 'Sukhwinder Singh',
      fpoName: 'Malwa Organic FPO',
      cropName: 'Sharbati Wheat',
      variety: 'Golden Grain A+',
      description: 'Heavy golden whole wheat grains. Unpolished, 100% naturally dried with high rotis fluff factor.',
      quantityKg: 3000.0,
      availableQuantityKg: 2800.0,
      farmerPricePerKg: 36.0,
      aiPredictedPricePerKg: 35.0,
      mandiBenchmarkPricePerKg: 34.0,
      claimedGrade: 'GRADE_A',
      aiAssessedGrade: 'GRADE_A',
      aiConfidenceScore: 98.1,
      isFlaggedMismatch: false,
      flagReason: null,
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop'],
      harvestDate: new Date(Date.now() - 10 * 86400000).toISOString(),
      district: 'Ludhiana',
      status: 'ACTIVE'
    }
  ],
  orders: [],
  ratings: []
};
