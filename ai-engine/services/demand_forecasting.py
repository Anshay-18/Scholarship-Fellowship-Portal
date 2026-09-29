"""
Khet To Ghar - Demand Forecasting & AI Crop Advisory (Prophet-compatible engine)
Forecasts local regional commodity demand 30-60 days in advance to help farmers
plan crop sowings, avoid market gluts, and maximize seasonal price realization.
"""

from datetime import datetime, timedelta
import math
from typing import Dict, Any, List

class DemandForecastingEngine:
    def forecast_crop_demand(self, crop_name: str, region: str = "Maharashtra", days: int = 30) -> Dict[str, Any]:
        """
        Simulates Facebook Prophet trend + seasonal decomposition for regional demand forecasting.
        """
        crop_clean = crop_name.lower().strip()
        base_date = datetime.now()
        
        # Seasonal parameters
        crop_profiles = {
            "red onion": {"base_metric_tons": 450, "growth_rate": 0.04, "season_peak_month": 10},
            "hybrid tomato": {"base_metric_tons": 620, "growth_rate": -0.02, "season_peak_month": 11},
            "sharbati wheat": {"base_metric_tons": 800, "growth_rate": 0.01, "season_peak_month": 4},
            "baby potato": {"base_metric_tons": 510, "growth_rate": 0.03, "season_peak_month": 1}
        }
        
        profile = crop_profiles.get(crop_clean, {"base_metric_tons": 400, "growth_rate": 0.02, "season_peak_month": 6})
        
        forecast_points: List[Dict[str, Any]] = []
        for i in range(0, days, 5):
            point_date = base_date + timedelta(days=i)
            # Seasonal sinusoidal wave
            month_factor = math.sin((point_date.month / 12.0) * 2 * math.pi)
            day_trend = 1.0 + (profile["growth_rate"] * (i / 30.0))
            projected_demand = round(profile["base_metric_tons"] * day_trend * (1.0 + 0.18 * month_factor), 1)
            lower_bound = round(projected_demand * 0.91, 1)
            upper_bound = round(projected_demand * 1.09, 1)

            forecast_points.append({
                "date": point_date.strftime("%Y-%m-%d"),
                "yhat_demand_tons": projected_demand,
                "yhat_lower": lower_bound,
                "yhat_upper": upper_bound
            })

        # Advisory determination
        avg_demand_trend = (forecast_points[-1]["yhat_demand_tons"] - forecast_points[0]["yhat_demand_tons"]) / forecast_points[0]["yhat_demand_tons"]
        
        if avg_demand_trend > 0.08:
            advisory = f"High Opportunity: Demand for {crop_name} is projected to rise {round(avg_demand_trend * 100, 1)}% over the next 30 days. Recommend expanding acreage or staging harvest."
            action_code = "EXPAND_ACREAGE"
        elif avg_demand_trend < -0.05:
            advisory = f"Supply Saturation Warning: Projected demand decline of {abs(round(avg_demand_trend * 100, 1))}%. Consider inter-cropping or staggered dispatch to avoid local Mandi price drops."
            action_code = "DIVERSIFY_CROP"
        else:
            advisory = f"Stable Market: Steady consumer demand expected for {crop_name}. Maintain standard planting cycle with guaranteed forward direct contracts."
            action_code = "MAINTAIN_LEVELS"

        return {
            "crop_name": crop_name,
            "region": region,
            "forecast_period_days": days,
            "advisory": advisory,
            "recommended_action": action_code,
            "forecast_points": forecast_points,
            "top_deficit_nearby_hubs": ["Thane Metro", "Navi Mumbai Housing Clusters", "Pune Hinjewadi"]
        }

forecast_engine = DemandForecastingEngine()
