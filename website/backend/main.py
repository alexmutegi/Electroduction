from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import json
import os

app = FastAPI(title="Electroduction Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

class GameScore(BaseModel):
    player_name: str
    score: int
    level: int
    date: datetime = datetime.now()

class LeaderboardEntry(BaseModel):
    player_name: str
    score: int
    level: int
    date: datetime

# In-memory storage (replace with database in production)
DATA_DIR = os.environ.get("DATA_DIR", os.path.join(os.path.dirname(__file__), "data"))
os.makedirs(DATA_DIR, exist_ok=True)

def load_data(filename: str, default=None):
    """Load JSON data from file"""
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            return json.load(f)
    return default if default is not None else []

def save_data(filename: str, data):
    """Save data to JSON file"""
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, default=str)

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "Electroduction Portfolio API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "game_stats": "/api/game/stats",
            "leaderboard": "/api/game/leaderboard",
            "submit_score": "/api/game/score",
            "contact": "/api/contact"
        }
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/api/game/stats")
async def get_game_stats():
    """Get overall game statistics"""
    leaderboard = load_data("leaderboard.json", [])

    total_players = len(set(entry["player_name"] for entry in leaderboard))
    total_runs = len(leaderboard)
    highest_level = max((entry["level"] for entry in leaderboard), default=0)
    bosses_defeated = sum(1 for entry in leaderboard if entry["level"] >= 5)

    return {
        "total_players": total_players,
        "total_runs": total_runs,
        "highest_level": highest_level,
        "bosses_defeated": bosses_defeated
    }

@app.get("/api/game/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(limit: int = 10):
    """Get top scores"""
    leaderboard = load_data("leaderboard.json", [])

    # Sort by score descending
    sorted_leaderboard = sorted(
        leaderboard,
        key=lambda x: x["score"],
        reverse=True
    )[:limit]

    return sorted_leaderboard

@app.post("/api/game/score")
async def submit_score(score: GameScore):
    """Submit a new game score"""
    leaderboard = load_data("leaderboard.json", [])

    new_entry = {
        "player_name": score.player_name,
        "score": score.score,
        "level": score.level,
        "date": score.date.isoformat()
    }

    leaderboard.append(new_entry)
    save_data("leaderboard.json", leaderboard)

    return {
        "message": "Score submitted successfully",
        "rank": len([e for e in leaderboard if e["score"] > score.score]) + 1
    }

@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    """Submit a contact message"""
    messages = load_data("messages.json", [])

    new_message = {
        "name": message.name,
        "email": message.email,
        "message": message.message,
        "timestamp": datetime.now().isoformat()
    }

    messages.append(new_message)
    save_data("messages.json", messages)

    return {"message": "Message received successfully"}

@app.get("/api/projects")
async def get_projects():
    """Get project information"""
    return {
        "projects": [
            {
                "id": "electroduction",
                "name": "Electroduction",
                "description": "AAA Roguelike Game",
                "tech": ["Python", "Pygame"],
                "stats": {
                    "lines_of_code": 5000,
                    "files": 24,
                    "systems": ["Combat", "Dungeon Gen", "AI", "Audio"]
                }
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# ── Certificate Program Endpoints ─────────────────────────────────────────────

class CertificateSubmission(BaseModel):
    learner_name: str
    industry: str
    industry_id: str
    score: int
    modules: list
    issued_at: str
    cert_id: str

@app.post("/api/certificates")
async def issue_certificate(cert: CertificateSubmission):
    """Issue and store a certificate after passing a program."""
    certificates = load_data("certificates.json", [])
    entry = cert.dict()
    certificates.append(entry)
    save_data("certificates.json", certificates)
    return {
        "success": True,
        "cert_id": cert.cert_id,
        "message": f"Certificate issued for {cert.learner_name} in {cert.industry}"
    }

@app.get("/api/certificates")
async def get_certificates():
    """Get all issued certificates (public leaderboard)."""
    certificates = load_data("certificates.json", [])
    # Return summary (no personal details)
    summary = [
        {
            "cert_id": c["cert_id"],
            "industry": c["industry"],
            "score": c["score"],
            "issued_at": c["issued_at"]
        }
        for c in certificates
    ]
    return {"certificates": summary, "total": len(summary)}

@app.get("/api/certificates/stats")
async def get_certificate_stats():
    """Get certificate program statistics."""
    certificates = load_data("certificates.json", [])
    by_industry = {}
    for c in certificates:
        ind = c.get("industry", "Unknown")
        if ind not in by_industry:
            by_industry[ind] = {"count": 0, "avg_score": 0, "scores": []}
        by_industry[ind]["count"] += 1
        by_industry[ind]["scores"].append(c.get("score", 0))
    for ind in by_industry:
        scores = by_industry[ind]["scores"]
        by_industry[ind]["avg_score"] = round(sum(scores) / len(scores))
        del by_industry[ind]["scores"]
    return {
        "total_certificates": len(certificates),
        "by_industry": by_industry,
        "industries_available": 6,
        "modules_per_program": 3,
        "questions_per_module": 4
    }
