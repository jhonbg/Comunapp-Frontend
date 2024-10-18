import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import {Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

interface ModalHousingProps {
  open: boolean;
  onClose: () => void;
  idUsuario: number | null;
}

interface Vivienda {
    id: number;
    direccion: string;
    fechaCreacion: string;
    codigoUsuarioCrea: string;
}

    const SelectHousing: React.FC<ModalHousingProps> = ({ open, onClose, idUsuario}) => {
    const [viviendas, setViviendas] = useState<Vivienda[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedViviendaId, setSelectedViviendaId] = useState<number | null>(null);

    const API_URL = 'https://comunapp-api.azurewebsites.net/api/vivienda?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';

    
        useEffect(() => {
        const fetchViviendas = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) {
              throw new Error(`Error al obtener los datos: ${response.statusText}`);
            }
            const data = await response.json();
            setViviendas(data);
          } catch (err) {
          }
        };
    
        fetchViviendas();
      }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredViviendas = viviendas.filter(vivienda =>
        vivienda.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (id: number) => {
        setSelectedViviendaId(id === selectedViviendaId ? null : id);
    };

    const handleSelect = async () => {
        try {
            await axios.get(`https://comunapp-api.azurewebsites.net/api/persona/${idUsuario}/asignarVivienda/${selectedViviendaId}?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`);
            alert('Usuario asignado a vivienda')
            onClose();
          } catch (error) {
            console.log("error",idUsuario,selectedViviendaId)
          }
    };

    return (
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
            minWidth: '20%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <div style={{ display: 'flex', flexDirection:'column',  margin:'5%'}}>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <Typography id="modal-modal-title" variant='h5' sx={{ fontWeight: 'bold' }}>
                        Asignar vivienda
                    </Typography>
                    <Button onClick={onClose}>X</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <Typography style={{ marginBottom: '5px' }}>Buscar Por Dirección</Typography>
                        <input
                            type="text"
                            style={{ width: 'auto', padding: '10px', boxSizing: 'border-box' }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Ingrese dirección"
                        />
                    </div>
                    <button onClick={handleSelect}>Asignar</button>
                </div>
            </div>
            <div>
                <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                    <TableContainer component={Paper} style={{ maxHeight: 'auto', overflow: 'auto', maxWidth: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Fecha de Creación</TableCell>
                                    <TableCell>Usuario Creador</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredViviendas.map((vivienda) => (
                                <TableRow 
                                    key={vivienda.id}
                                    onClick={() => handleRowClick(vivienda.id)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: selectedViviendaId === vivienda.id ? '#e0e0e0' : 'transparent' // Cambiar el color de fondo si está seleccionado
                                      }}
                                >
                                    <TableCell>{vivienda.id}</TableCell>
                                    <TableCell>{vivienda.direccion}</TableCell>
                                    <TableCell>{vivienda.fechaCreacion}</TableCell>
                                    <TableCell>{vivienda.codigoUsuarioCrea}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </Box>
        </Modal>
    );
};

export default SelectHousing;