
import TileLayer from "ol/layer/Tile";
import OSM from 'ol/source/OSM';
import { fromLonLat } from "ol/proj";
import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import Feature from 'ol/Feature';


const Map = ({ children, zoom, center }) => {


  const point = new Feature({
    geometry: new Point(fromLonLat([40.976310, 57.008294]))//57.008294, 40.976310
  });

  const point2 = new Feature({
    geometry: new Point(fromLonLat([40.977837, 57.008411]))//57.008411, 40.977837
  });

  const point3 = new Feature({
    geometry: new Point(fromLonLat([40.979329, 57.008656]))//57.008656, 40.979329
  });

  const point4 = new Feature({
    geometry: new Point(fromLonLat([40.979991, 57.006484]))//57.006484, 40.979991
  });

  const point5 = new Feature({
    geometry: new Point(fromLonLat([40.981395, 57.008000]))//57.008000, 40.981395
  });

  const point6 = new Feature({
    geometry: new Point(fromLonLat([40.982446, 57.007162]))//57.007162, 40.982446
  });

  const point7 = new Feature({
    geometry: new Point(fromLonLat([40.980595, 57.006970]))//57.006970, 40.980595
  });

  const point8 = new Feature({
    geometry: new Point(fromLonLat([40.977766, 57.006466]))//57.006466, 40.977766
  });

  const point9 = new Feature({
    geometry: new Point(fromLonLat([40.973606, 57.006304]))//57.006304, 40.973606
  });

  const point10 = new Feature({
    geometry: new Point(fromLonLat([40.977051, 57.008176]))
  });

  const point11 = new Feature({
    geometry: new Point(fromLonLat([40.978715, 57.008289]))
  });

  const point12 = new Feature({
    geometry: new Point(fromLonLat([40.979873, 57.008382]))
  });

  const point13 = new Feature({
    geometry: new Point(fromLonLat([40.982221, 57.008513]))
  });

  const point14 = new Feature({
    geometry: new Point(fromLonLat([40.979997, 57.007376]))
  });

  const vectorSource = new VectorSource({
    features: [point, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11, point12, point13, point14],
  });


  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const mapRef = useRef();

  const [map, setMap] = useState();

  useEffect(() => {
    let options = {
      view: new ol.View({
        zoom: 12,
        center: fromLonLat([41, 57])
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      controls: [],
      overlays: []
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center])

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map" >
        {children}

      </div>
    </MapContext.Provider>
  )
}
export default Map;