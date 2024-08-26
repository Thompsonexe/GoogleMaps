import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function App() {
  useEffect(() => {
    //const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const apiKey = "AIzaSyC2L6m5jBUVhgHFRAvAInRG_XOS8abGl6w";
    
    if (!apiKey) {
      console.error("Google Maps API key is missing.");
      return;
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      try {
        const center = { lat: 22.3193, lng: 114.1694 }; // Hong Kong center

        const map = new google.maps.Map(document.getElementById("map"), {
          center: center,
          zoom: 17,
          tilt: 45,  // Camera tilted at 45 degrees
          heading: 0, // Start the heading at 0 degrees
          mapId: "e1f98bc66abd592", // Use your new Map ID here
        });

        // Draw a red circle around the center point
        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: map,
          center: center,
          radius: 100, // Radius in meters
        });

        // Animate the map by rotating around the center
        let heading = 0;
        const animationDuration = 20000; // 20 seconds for a full loop
        const framesPerSecond = 60;
        const frameDuration = 1000 / framesPerSecond;
        const totalFrames = (animationDuration / 1000) * framesPerSecond;
        const headingIncrement = 360 / totalFrames;

        function animateMap() {
          heading = (heading + headingIncrement) % 360;
          map.setHeading(heading);
          map.setTilt(45); // Ensure the tilt remains at 45 degrees
          setTimeout(() => {
            requestAnimationFrame(animateMap);
          }, frameDuration);
        }

        animateMap();

      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    }).catch(error => {
      console.error("Error loading Google Maps:", error);
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Study Area: Mong Kok</h1>
      <div id="map" style={{ height: "80vh", width: "100%" }}></div>
    </div>
  );
}

export default App;
