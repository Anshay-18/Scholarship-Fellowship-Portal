import { inMemoryStore } from '../config/db.js';
import { aiService } from '../services/aiService.js';
import { priceGuardrailService } from '../services/priceGuardrailService.js';
import { v4 as uuidv4 } from 'uuid';

export const assessCropQuality = async (req, res, next) => {
  try {
    const { claimedGrade } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Harvest photo required. Please upload an image of the crop yield.'
      });
    }

    // Call AI vision grading
    const gradingResult = await aiService.gradeCrop(file.buffer, file.originalname, claimedGrade);

    // Run Fraud Check
    const fraudEvaluation = priceGuardrailService.detectQualityFraud(
      claimedGrade,
      gradingResult.assessed_grade
    );

    return res.status(200).json({
      success: true,
      data: {
        ...gradingResult,
        is_flagged_mismatch: fraudEvaluation.isMismatch || gradingResult.is_flagged_mismatch,
        flag_reason: fraudEvaluation.reason || gradingResult.flag_reason
      }
    });
  } catch (error) {
    next(error);
  }
};

export const checkPriceGuardrail = async (req, res, next) => {
  try {
    const { cropName, farmerPrice, grade, district } = req.body;

    if (!cropName || farmerPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: 'cropName and farmerPrice are required fields.'
      });
    }

    const evaluation = await priceGuardrailService.evaluateListingPrice(
      cropName,
      Number(farmerPrice),
      grade || 'GRADE_A',
      district || 'Nashik'
    );

    return res.status(200).json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    next(error);
  }
};

export const createCropListing = async (req, res, next) => {
  try {
    const farmer = req.user;
    const {
      cropName,
      variety,
      description,
      quantityKg,
      farmerPricePerKg,
      claimedGrade,
      aiAssessedGrade,
      aiConfidenceScore,
      isFlaggedMismatch,
      flagReason,
      images,
      harvestDate,
      bypassGuardrailWarning
    } = req.body;

    if (!cropName || !quantityKg || !farmerPricePerKg) {
      return res.status(400).json({
        success: false,
        message: 'Missing mandatory fields: cropName, quantityKg, farmerPricePerKg.'
      });
    }

    // Evaluate Guardrail Server-side
    const guardrail = await priceGuardrailService.evaluateListingPrice(
      cropName,
      Number(farmerPricePerKg),
      aiAssessedGrade || claimedGrade || 'GRADE_A',
      farmer.district || 'Nashik'
    );

    if (guardrail.requires_warning_acknowledgement && !bypassGuardrailWarning) {
      return res.status(422).json({
        success: false,
        requires_acknowledgement: true,
        guardrail_evaluation: guardrail,
        message: `Guardrail Alert: ${guardrail.advisory}. Set 'bypassGuardrailWarning: true' to confirm manual override.`
      });
    }

    const newProduct = {
      id: `prod-${Date.now()}`,
      farmerId: farmer.id,
      farmerName: farmer.name,
      fpoName: farmer.fpoName || 'Independent Farmer Partner',
      cropName,
      variety: variety || 'Standard Local',
      description: description || 'Fresh farm-gate harvest directly supplied without middlemen.',
      quantityKg: Number(quantityKg),
      availableQuantityKg: Number(quantityKg),
      farmerPricePerKg: Number(farmerPricePerKg),
      aiPredictedPricePerKg: guardrail.ai_recommended_price,
      mandiBenchmarkPricePerKg: guardrail.mandi_modal_price,
      claimedGrade: claimedGrade || 'GRADE_A',
      aiAssessedGrade: aiAssessedGrade || claimedGrade || 'GRADE_A',
      aiConfidenceScore: Number(aiConfidenceScore) || 94.5,
      isFlaggedMismatch: Boolean(isFlaggedMismatch),
      flagReason: flagReason || null,
      images: Array.isArray(images) && images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop'
      ],
      harvestDate: harvestDate || new Date().toISOString(),
      district: farmer.district || 'Nashik',
      status: isFlaggedMismatch ? 'FLAGGED' : 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    inMemoryStore.products.unshift(newProduct);

    return res.status(201).json({
      success: true,
      message: 'Produce listed successfully on Khet To Ghar network!',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = (req, res) => {
  const { crop, district, grade } = req.query;
  let filtered = [...inMemoryStore.products];

  if (crop) {
    filtered = filtered.filter(p => p.cropName.toLowerCase().includes(crop.toLowerCase()));
  }
  if (district) {
    filtered = filtered.filter(p => p.district.toLowerCase() === district.toLowerCase());
  }
  if (grade) {
    filtered = filtered.filter(p => p.aiAssessedGrade === grade);
  }

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = inMemoryStore.products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product listing not found.' });
  }

  const farmer = inMemoryStore.users.find(u => u.id === product.farmerId);

  res.status(200).json({
    success: true,
    data: {
      ...product,
      farmerInfo: {
        name: farmer ? farmer.name : product.farmerName,
        fpo: farmer ? farmer.fpoName : product.fpoName,
        trustScore: farmer ? farmer.trustScore : 4.9,
        totalRatings: farmer ? farmer.totalRatings : 45
      }
    }
  });
};
