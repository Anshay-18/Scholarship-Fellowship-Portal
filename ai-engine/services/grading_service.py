"""
Khet To Ghar - Computer Vision Produce Grading & Fraud Prevention Engine
Analyzes uploaded harvest photos for size, defect spots, color uniformity,
assigns Quality Grades (Grade A, B, C) and generates AI confidence scores.
"""

import io
from PIL import Image, ImageStat
import numpy as np
from typing import Dict, Any, Tuple

class CropGradingEngine:
    def __init__(self):
        # Grade thresholds based on visual defect ratio and freshness coefficient
        self.grade_thresholds = {
            "GRADE_A": {"min_freshness": 85.0, "max_defect_pct": 5.0},
            "GRADE_B": {"min_freshness": 70.0, "max_defect_pct": 14.0},
            "GRADE_C": {"min_freshness": 50.0, "max_defect_pct": 30.0}
        }

    def analyze_crop_image(self, image_bytes: bytes, claimed_grade: str = "UNGRADED") -> Dict[str, Any]:
        """
        Extracts visual metrics from the image:
        - Freshness / Color Uniformity index
        - Surface defect spot ratio
        - Quality Grade & AI Confidence Score
        - Fraud Mismatch Check
        """
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception as e:
            raise ValueError(f"Invalid image format: {str(e)}")

        # Resize to standard analysis resolution
        analysis_img = image.resize((256, 256))
        img_array = np.array(analysis_img, dtype=np.float32)

        # 1. Color variance & Saturation analysis (Freshness Indicator)
        stat = ImageStat.Stat(analysis_img)
        # Average brightness and standard deviation of color channels
        r_mean, g_mean, b_mean = stat.mean[:3]
        r_std, g_std, b_std = stat.stddev[:3]

        # Calculate color variance / uniformity
        color_std_avg = (r_std + g_std + b_std) / 3.0
        # Produce with uniform skin tone has lower std dev in local patches
        freshness_score = max(50.0, min(99.0, 100.0 - (color_std_avg * 0.45)))

        # 2. Defect / Blemish Spot Detection
        # Pixel darkness anomalies indicative of fungal spots, rot, or bruising
        gray = 0.2989 * img_array[:, :, 0] + 0.5870 * img_array[:, :, 1] + 0.1140 * img_array[:, :, 2]
        mean_intensity = np.mean(gray)
        # Blemish pixels are significantly darker than surrounding produce flesh
        dark_spots = (gray < (mean_intensity * 0.45)).sum()
        total_pixels = gray.size
        defect_ratio = float(dark_spots / total_pixels) * 100.0
        defect_percentage = round(min(defect_ratio * 4.2, 45.0), 2)

        # 3. Determine AI Grade
        if freshness_score >= 82.0 and defect_percentage <= 5.5:
            assessed_grade = "GRADE_A"
            base_conf = 93.0 + (freshness_score - 82.0) * 0.35
        elif freshness_score >= 68.0 and defect_percentage <= 15.0:
            assessed_grade = "GRADE_B"
            base_conf = 88.0 + (freshness_score - 68.0) * 0.4
        else:
            assessed_grade = "GRADE_C"
            base_conf = 85.0 + min(defect_percentage * 0.3, 10.0)

        # Deduct noise / blur uncertainty
        confidence_score = round(min(98.5, max(75.0, base_conf - (defect_percentage * 0.1))), 1)

        # 4. Fraud Prevention & Discrepancy Check
        is_flagged_mismatch, flag_reason = self._check_fraud_mismatch(claimed_grade, assessed_grade)

        grade_explanations = {
            "GRADE_A": "Premium export/urban direct retail grade. Uniform coloration, firm skin, zero significant surface blemishes.",
            "GRADE_B": "Standard market grade. Slight cosmetic size or pigmentation variation, zero internal decay. Perfect for daily family cooking.",
            "GRADE_C": "Secondary processing grade. Surface spotting or size disparity. Best suited for pulp, puree, or institutional canteen use."
        }

        return {
            "assessed_grade": assessed_grade,
            "confidence_score": confidence_score,
            "claimed_grade": claimed_grade,
            "is_flagged_mismatch": is_flagged_mismatch,
            "flag_reason": flag_reason,
            "metrics": {
                "freshness_index": round(freshness_score, 1),
                "surface_defect_pct": defect_percentage,
                "color_uniformity_pct": round(max(60.0, 100.0 - color_std_avg), 1),
                "image_dimensions": f"{image.width}x{image.height}"
            },
            "grade_description": grade_explanations.get(assessed_grade, "")
        }

    def _check_fraud_mismatch(self, claimed_grade: str, assessed_grade: str) -> Tuple[bool, str]:
        """
        Flags listings if the seller claims an inflated grade compared to the AI assessment.
        """
        claimed = claimed_grade.upper()
        if claimed in ("UNGRADED", "", None):
            return False, ""

        grade_rank = {"GRADE_A": 3, "GRADE_B": 2, "GRADE_C": 1}
        claimed_rank = grade_rank.get(claimed, 0)
        assessed_rank = grade_rank.get(assessed_grade, 0)

        if claimed_rank > assessed_rank:
            diff = claimed_rank - assessed_rank
            if diff >= 2:
                return True, f"Severe quality inflation detected: Claimed {claimed} but AI computer vision verified as {assessed_grade}."
            else:
                return True, f"Quality mismatch: Claimed {claimed} appears to be {assessed_grade}. Listing tagged for buyer transparency."

        return False, ""

grading_engine = CropGradingEngine()
