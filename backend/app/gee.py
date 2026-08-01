"""
This is the main scientific backbone of this application.

This script uses the JRC data for Flood Hazard zonation

Author/Developer
    Dr. Shankharoop Ghoshal/U-PREPARE/USDMA/ULMMC/WORLDBANK

"""

import ee
import os
from app.config import PROJECT_ID

## Initialize GEE
ee.Authenticate()
ee.Initialize(
    project = PROJECT_ID,
    opt_url = "https://earthengine-highvolume.googleapis.com"
)

# buffer_distance_m = 5000
vis_params = {"palette":["lightcyan", "skyblue", "royalblue", "blue", "darkblue"]}

def flood_hazard_mapper(latitude, longitude, buffer_distance_m, return_period):

    # Create ROI by adding a buffer and a bounding box
    roi = ee.Geometry.Point([longitude, latitude]).buffer(buffer_distance_m).bounds()

    # Load the jrc dataset
    jrc = (ee.ImageCollection("JRC/CEMS_GLOFAS/FloodHazard/v1")
            .filterBounds(roi)
    )

    # Filter by RP and mosaic and clip
    flood_ras = (
        jrc.filterBounds(roi)
           .filter(ee.Filter.eq("return_period", return_period))
           .mosaic()
           .clip(roi)
    )

    map_id = flood_ras.getMapId(vis_params)
    tile_url = map_id["tile_fetcher"].url_format

    return {
        "tile_url": tile_url,
        "bounds": roi.bounds().getInfo()
    }
