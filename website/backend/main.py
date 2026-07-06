from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from pathlib import Path
import json

app = FastAPI(
    title="Electroduction Portfolio API",
    version="2.0.0",
    description="API for Electroduction portfolio projects"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# DATA MODELS
# ============================================

class Product(BaseModel):
    id: int
    name: str
    category: str
    price: float
    icon: str
    description: str

class Recipe(BaseModel):
    id: int
    title: str
    category: str
    time: str
    servings: int
    difficulty: str
    icon: str
    description: str
    ingredients: List[str]
    instructions: List[str]

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

class GameScore(BaseModel):
    player_name: str
    score: int
    level: int
    date: datetime = None

class LeaderboardEntry(BaseModel):
    player_name: str
    score: int
    level: int
    date: str

# ============================================
# DATA
# ============================================

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

PRODUCTS = [
    {"id": 1, "name": "Premium Laptop Pro", "category": "laptops", "price": 1299, "icon": "💻", "description": "High-performance laptop"},
    {"id": 2, "name": "Smartphone X", "category": "phones", "price": 899, "icon": "📱", "description": "Latest flagship"},
    {"id": 3, "name": "Wireless Headphones", "category": "accessories", "price": 199, "icon": "🎧", "description": "Noise-cancelling"},
]

def load_data(filename: str, default=None):
    filepath = DATA_DIR / filename
    if filepath.exists():
        with filepath.open('r') as f:
            return json.load(f)
    return default if default is not None else []

def save_data(filename: str, data):
    filepath = DATA_DIR / filename
    with filepath.open('w') as f:
        json.dump(data, f, indent=2, default=str)

# ============================================
# ROOT & HEALTH
# ============================================

@app.get("/")
async def root():
    return {
        "message": "Electroduction Portfolio API v2.0",
        "endpoints": {
            "products": "/api/products",
            "health": "/api/health",
            "leaderboard": "/api/leaderboard"
        }
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# ============================================
# PRODUCT ENDPOINTS
# ============================================

@app.get("/api/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    """Get products, optionally filtered by category"""
    if category and category != 'all':
        return [p for p in PRODUCTS if p.get('category') == category]
    return PRODUCTS

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: int):
    """Get a single product"""
    for p in PRODUCTS:
        if p['id'] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

# ============================================
# GAME ENDPOINTS
# ============================================

@app.post("/api/game/score")
async def submit_score(score: GameScore):
    """Submit a game score"""
    leaderboard = load_data("leaderboard.json", [])
    new_entry = {
        "player_name": score.player_name,
        "score": score.score,
        "level": score.level,
        "date": (score.date or datetime.now()).isoformat()
    }
    leaderboard.append(new_entry)
    save_data("leaderboard.json", leaderboard)
    return {"message": "Score submitted", "rank": len([e for e in leaderboard if e["score"] > score.score]) + 1}

@app.get("/api/leaderboard")
async def get_leaderboard(limit: int = 10):
    """Get top leaderboard scores"""
    leaderboard = load_data("leaderboard.json", [])
    sorted_board = sorted(leaderboard, key=lambda x: x["score"], reverse=True)[:limit]
    return {"topScores": sorted_board}

# ============================================
# CONTACT ENDPOINTS
# ============================================

@app.post("/api/contact")
async def submit_contact(message: ContactMessage):
    """Submit contact message"""
    messages = load_data("messages.json", [])
    new_message = {
        "name": message.name,
        "email": message.email,
        "message": message.message,
        "timestamp": datetime.now().isoformat()
    }
    messages.append(new_message)
    save_data("messages.json", messages)
    return {"message": "Contact message received"}

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
