import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../style/pages/OrphanagesMap.css';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}
const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58,68],
    iconAnchor: [29, 68],
    popupAnchor: [170,2]
})

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    console.log(orphanages);
 
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

return (
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Happy" />

                <h2> Escolha seu Orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita </p>
            </header>

            <footer>
              <strong>Manaus</strong>
              <span>Amazonas</span>
            </footer>
        </aside>

        <Map
            center={[-3.0273733,-59.9303597]}
            zoom={15}
            style={{ width: '100%', height: '100%'}}        
        >   
            <TileLayer 
            url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVsdXppby1zb3V6YSIsImEiOiJja2c4eWsyem8wMWZqMnRzMmFqMWpyZG9tIn0.Wfivjwk-SRWm-yhkMPKxGQ"
        />

        {orphanages.map(orphanage => {
            return(

                <Marker
            key={orphanage.id}
            icon={mapIcon}
            position= {[orphanage.latitude,orphanage.longitude]}
            
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                 {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#FFF"/>
                </Link>
            </Popup>  
        </Marker>
            )
        })}

        </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
       
    </div>//page-map
)
}

export default OrphanagesMap;