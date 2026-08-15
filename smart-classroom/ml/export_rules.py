import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATASET = ROOT / "dataset.csv"
OUTPUT = ROOT.parent / "backend" / "ml_model" / "model_meta.json"

WEIGHTS = {
    "attendance_percentage": 0.35,
    "internal_marks": 0.30,
    "assignment_score": 0.20,
    "study_hours_per_week": 0.15,
}


def weighted_score(row):
    study_normalized = min(float(row["study_hours_per_week"]) * 10, 100)
    return (
        float(row["attendance_percentage"]) * WEIGHTS["attendance_percentage"]
        + float(row["internal_marks"]) * WEIGHTS["internal_marks"]
        + float(row["assignment_score"]) * WEIGHTS["assignment_score"]
        + study_normalized * WEIGHTS["study_hours_per_week"]
    )


with DATASET.open(newline="", encoding="utf-8") as dataset_file:
    rows = list(csv.DictReader(dataset_file))

scores_by_risk = {"High": [], "Medium": [], "Low": []}
for row in rows:
    scores_by_risk[row["risk_level"]].append(weighted_score(row))

rules = {
    "weights": WEIGHTS,
    "thresholds": {
        "high_risk_below": 50,
        "medium_risk_below": 70,
    },
    "dataset_summary": {
        "rows": len(rows),
        "class_score_bands": {
            "High": {
                "mean_score": round(sum(scores_by_risk["High"]) / len(scores_by_risk["High"]), 1),
                "max_score": round(max(scores_by_risk["High"]), 1),
            },
            "Medium": {
                "mean_score": round(sum(scores_by_risk["Medium"]) / len(scores_by_risk["Medium"]), 1),
                "min_score": round(min(scores_by_risk["Medium"]), 1),
                "max_score": round(max(scores_by_risk["Medium"]), 1),
            },
            "Low": {
                "mean_score": round(sum(scores_by_risk["Low"]) / len(scores_by_risk["Low"]), 1),
                "min_score": round(min(scores_by_risk["Low"]), 1),
            },
        },
    },
}

with OUTPUT.open("w", encoding="utf-8") as output_file:
    json.dump(rules, output_file, indent=2)
