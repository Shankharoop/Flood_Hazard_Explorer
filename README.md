Interactive Flood Inundation Depth-Return Period
        Visualization System.
        Developed by
        Dr. Shankharoop Ghoshal/U-PREPARE/WORLDBANK.
        Dataset: JRC/GloFAS.
        Model: OS-LISFLOOD.

        To Run: First select the Return Period,
        then Right Click on any River/Stream Area.
        Refresh browser to restart.

Setup:
> Create a Python venv:
    ```bash
    python -m venv <env-name>
    ```

> Activate your environment:
    ```bash
    source <env-name>/bin/activate
    ```

>  Install the dependencies:
    ```bash
    pip install -r backend/requirements.txt
    ```

> Authenticate Earth Engine on your server:
    ```bash
    earthengine authenticate
    ```

> Create .env file and place your EE project ID as
  GEE_PROJECT_ID=<your-project-id>

> Put .env file in backend/.env

> Start frontend:
    ```bash
    python -m http.server <frontend-port>
    ```

> Start backend:
    ```bash
    uvicorn app.main:app --reload --port 8000
    ```

> Access the application:
    ```
    http://localhost:<frontend-port>/
    ```
