import React, { useEffect, useRef, useState } from "react";
import "./Map.scss";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { LngLatLike } from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW1hZGkiLCJhIjoiY2xtM3lxejQ4MTY3ZjNrcDlyMGMydXNmNiJ9.FLaY38F_p9GvuCj4bxhQQA";

interface MapProps {
  lng: number;
  lat: number;
}

const Map: React.FC<MapProps> = ({ lng, lat }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const marker = useRef<any>(null);
  const [zoom, setZoom] = useState<number>(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat] as LngLatLike,
      zoom: zoom,
    });
    new mapboxgl.Marker({ element: marker.current! as any })
      .setLngLat([lng, lat] as LngLatLike)
      .addTo(map.current);
  }, [lng, lat, zoom]);

  return (
    <div>
      <div ref={marker} className="marker"></div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
