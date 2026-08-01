import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = os.getenv(
    "GEE_PROJECT_ID"
)

if PROJECT_ID is None:
    raise ValueError(
        "GEE_PROJECT_ID not found in env"
    )


