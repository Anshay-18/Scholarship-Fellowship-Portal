import { aiService } from './aiService.js';

class PriceGuardrailService {
  /**
   * Enforces price intelligence when a farmer creates or updates a listing
   */
  async evaluateListingPrice(cropName, farmerPrice, grade, district) {
    const evaluation = await aiService.evaluateFairPrice(cropName, farmerPrice, grade, district);
    
    // Safety check: is pricing allowed to proceed directly or requires acknowledgement?
    const requiresWarningAck = evaluation.status !== 'FAIR_AND_OPTIMAL';
    
    return {
      ...evaluation,
      requires_warning_acknowledgement: requiresWarningAck
    };
  }

  /**
   * Compares farmer claimed grade against AI computer vision grade
   */
  detectQualityFraud(claimedGrade, assessedGrade) {
    const ranks = { GRADE_A: 3, GRADE_B: 2, GRADE_C: 1, UNGRADED: 0 };
    const claimedRank = ranks[claimedGrade] || 0;
    const assessedRank = ranks[assessedGrade] || 0;

    if (claimedRank > assessedRank) {
      return {
        isMismatch: true,
        reason: `Quality Mismatch: Farmer claimed ${claimedGrade} but Computer Vision verified as ${assessedGrade}. Listing flagged for quality audit.`
      };
    }

    return {
      isMismatch: false,
      reason: null
    };
  }
}

export const priceGuardrailService = new PriceGuardrailService();
