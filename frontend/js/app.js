const map = L.map("map");

map.setView(
  [30.390129989353866, 78.07640405039741],
  8
);


// Add Basemap
L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
      attribution:
      "&copy; OpenStreetMap contributors"
  }
)
.addTo(map)

// Create the INFO PANEL
const infoControl = L.control({position: "topright"});


infoControl.onAdd = function(map) {

    const div = L.DomUtil.create(
        "div",
        "info-panel"
    );

    // Prevent map dragging/zoming during click
    L.DomEvent.disableClickPropagation(div);

    div.innerHTML = `
        <h3>Flood Hazard Explorer</h3>

        <p>
        Interactive Flood Inundation Depth-Return Period
        Visualization System.
        Developed by
        Dr. Shankharoop Ghoshal/U-PREPARE/WORLDBANK.
        Dataset: JRC/GloFAS.
        Model: OS-LISFLOOD.

        To Run: First select the Return Period,
        then Right Click on any River/Stream Area.
        Refresh browser to restart.
        </p>

        <label>
        Select Return Period:
        </label>

        <select id="returnPeriod">
            <option value="10" selected>
                10 Year
            </option>
            <option value="20">
                20 Year
            </option>
            <option value="50">
                50 Year
            </option>
            <option value="100">
                100 Year
            </option>
        </select>
    `;

    return div;
};


infoControl.addTo(map);

// Attach Listener
document
.getElementById("returnPeriod")
.addEventListener(
"change",
function(e){

    let period = e.target.value;

    console.log(
        "Selected return period:",
        period
    );

});








// Click Event
let floodLayer = null;

map.on(
    "contextmenu",
    function(event) {

        const lat = event.latlng.lat;
        const lon = event.latlng.lng;

        let period = document.getElementById("returnPeriod").value;

        console.log(
            "Requesting flood:",
            lat,
            lon,
            "Return Period:",
            period
        );


        fetch(
            `http://127.0.0.1:8000/flood?lat=${lat}&lon=${lon}&distance=5000&&rp=${period}`
        )

        .then(response => response.json())

        .then(data => {

            console.log("Earth Engine response:");
            console.log(data);


            // remove previous flood layer
            if (floodLayer) {
                map.removeLayer(floodLayer);
            }


            floodLayer = L.tileLayer(
                data.tile_url,
                {
                    opacity: 0.6,
                    attribution: "JRC GLOFAS / Earth Engine"
                }
            );


            floodLayer.addTo(map);


            // zoom to returned area
            if (data.bounds) {

                const coords = data.bounds.coordinates[0];

                const leafletBounds = coords.map(
                    p => [p[1], p[0]]
                );

                map.fitBounds(
                    leafletBounds
                );
            }


        })

        .catch(
            error => console.error(error)
        );

    }
);
