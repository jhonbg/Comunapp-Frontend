import React, { useState, useRef, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLoadScript, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import { useUser } from '../../UserContext';
import '../../styles/globals.css'

interface ModalHousingProps {
  open: boolean;
  onClose: () => void;
  onAddVivienda: (nuevaVivienda: { direccion: string; fechaCreacion: string; codigoUsuarioCrea: string }) => void;
}

const libraries: ("places")[] = ['places'];

const ModalHousing: React.FC<ModalHousingProps> = ({ open, onClose, onAddVivienda }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBhG8mz7X7j8Nqk2ble6hNuNcXOvPZQOOs',
    libraries,
  });

  const [direccion, setDireccion] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 4.711, lng: -74.0721 });
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [zoom, setZoom] = useState(14); 
  const { user } = useUser();

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const obtenerFechaActual = (): string => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  const handleCrearVivienda = () => {
    if (direccion && selectedPosition) {
      const nuevaVivienda = {
        direccion,
        fechaCreacion: obtenerFechaActual(),
        codigoUsuarioCrea: user?.name || '',
        latitud: selectedPosition.lat.toString(),
        longitud: selectedPosition.lng.toString(),
      };
      onAddVivienda(nuevaVivienda);
      onClose();
    } else {
      alert('Por favor, selecciona una dirección válida.');
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const newPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedPosition(newPos);
      setDireccion(place.formatted_address || '');
      setMapCenter(newPos);
      setZoom(16);
      mapRef.current?.panTo(newPos);
    }
  };  

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setSelectedPosition(newPos);
      setMapCenter(newPos);
      setZoom(16);
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPos }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setDireccion(results[0].formatted_address);
        } else {
          console.error('Geocoding failed:', status);
        }
      });
    }
  };

  const handleBuscarLugar = () => {
    if (direccion) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: direccion }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const newPos = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          setSelectedPosition(newPos);
          setMapCenter(newPos);
          setZoom(16);
          mapRef.current?.panTo(newPos);
        } else {
          alert('No se pudo encontrar la dirección.');
        }
      });
    } else {
      alert('Por favor ingresa una dirección.');
    }
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 5,
          p: 4,
          minWidth: '30%',
          maxWidth: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
            Nueva vivienda
          </Typography>
          <Button onClick={onClose}>X</Button>
        </div>

        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 1 }}>
          Detalles de la vivienda
        </Typography>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Buscar dirección..."
            className="w-full p-3 border"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </Autocomplete>
        <Button variant="outlined" onClick={handleBuscarLugar} sx={{ mb: 2, border:'1px solid #A7f3D0', color:'#A7f3D0'}}
          onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = 'rgb(22, 163, 74)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.border = '1px solid #A7f3D0';
                  target.style.backgroundColor = 'white';
                }}>
          Buscar lugar
        </Button>
        <GoogleMap
          center={mapCenter}
          zoom={zoom}
          mapContainerStyle={{ width: '100%', height: '300px' }}
          onClick={handleMapClick}
          onLoad={onMapLoad}
        >
          {selectedPosition && (
            <Marker
              position={selectedPosition}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
          )}
        </GoogleMap>
        <Button
          variant="contained"
          onClick={handleCrearVivienda}
          disabled={!direccion || !selectedPosition}
          style={{backgroundColor:'rgb(22, 163, 74)', color:'white'}}
        >
          Crear Vivienda
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalHousing;
