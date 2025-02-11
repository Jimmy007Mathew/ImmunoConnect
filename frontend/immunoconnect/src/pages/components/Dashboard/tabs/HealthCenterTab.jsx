import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const HealthCenterTab = () => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    // Load the GoMaps API script
    const script = document.createElement("script");
    script.src =
      "https://maps.gomaps.pro/maps/api/js?AlzaSyWkRBoz7mqvRXc_hbeztzeFCnLtRnDVBVt&libraries=geometry,places";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      getCurrentLocation();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          initMap(pos);
        },
        () => {
          alert("Please enable location access to view the map.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const initMap = (position) => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: position,
      zoom: 14,
    });

    new window.google.maps.Marker({
      position: position,
      map: map,
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold text-blue-600">
        Your Current Location
      </h2>
      <div
        id="map"
        style={containerStyle}
        className="rounded-lg shadow-lg border"
      ></div>
    </div>
  );
};

export default HealthCenterTab;
