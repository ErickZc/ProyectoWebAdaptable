let map, infoWindow;


  function initMap() {
    
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 13.7942, lng: -88.8965 },
      zoom: 8,
    });
    infoWindow = new google.maps.InfoWindow();

    ubicacion()
    marker();

    
  }

  function marker() {
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });
      
    countries.forEach(e => {
      const pos = { lat: parseFloat(e.region.lat), lng:  parseFloat(e.region.long) };
    

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        label: `${e.active.toLocaleString()} casos `,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(`
        Casos Activos <b>${e.active.toLocaleString()}</b> <br />
        Casos Confirmados <b>${e.confirmed.toLocaleString()}</b> <br />
        Muertes <b>${e.deaths.toLocaleString()}</b> <br />
        Tasa de letalidad <b>${e.fatality_rate.toFixed(4)}</b> <br />
        Muertes <b>${e.deaths.toLocaleString()}</b> <br />
        Última actualización <b>${e.last_update}</b> <br />
        `);
        infoWindow.open(map, marker);
      });
      return marker;
    });
  

  }
      
  window.initMap = initMap;

//Mostrar ubicaci[on] actual de el usuario
function ubicacion () {
  const locationButton = document.createElement("button");

  locationButton.textContent = "Mi ubicación actual";
  locationButton.setAttribute('class', 'btn btn-info mt-2')
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}
















