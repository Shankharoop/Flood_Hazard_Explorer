from fastapi import FastAPI
from app.gee import flood_hazard_mapper
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():

    return {
        "message": "Flood Hazard API running ..."
    }


@app.get("/flood")
def flood(
    lat: float,
    lon: float,
    distance: float = 5000,
    rp: int = 100,
):
    result = flood_hazard_mapper(
        latitude=lat,
        longitude=lon,
        buffer_distance_m=distance,
        return_period=rp
    )

    return result
