import NavBar from './components/NavBar'
import { Typography, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalTeams from './components/ModalTeams';

interface Reunion {
  id: number;
  codigoUsuarioCrea: string;
  fechaInicioReunion: string;
  fechaFinReunion: string;
  titulo: string;
  estado: string;
  ordenDia: string;
  rutaActa?: string;
  asistentes: {
    id: number;
    nombres: string;
    apellidos: string;
    tipoIdentificacion: number;
    correo: string;
    idCargo: number;
    discapacidad: boolean;
    idGrupoEtnico: number;
    lgtbiq: boolean;
    idNivelAcademico: number;
    idVivienda: number;
  }[];
}

const teamspage = () => {
  const [reuniones, setReuniones] = useState<Reunion[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() =>{
    const fetchReuniones = async () => {
      try {
        const response = await axios.get('https://comunapp-api.azurewebsites.net/api/reunion?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D')
        setReuniones(response.data);
      } catch (error) {
        console.error('Error al obtener las reuniones', error)
      }
    };
    fetchReuniones();
  }, [])

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
          <Container maxWidth="xl" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Container maxWidth="lg" style={{ marginTop: '20px', textAlign:'left'}}>
                <div style={{display:'flex', justifyContent:'space-around', marginBottom:'8px'}}>
                  <Typography variant="h5" style={{ marginBottom: '10px', fontWeight:'bold',fontSize:'1.5rem'}}>
                    Lista de Usuarios
                  </Typography>
                  <Button variant="contained"
                    style={{
                      background: 'rgb(34, 197, 94)',
                    }}
                    onClick={handleOpenModal}
                  >
                    Agendar Reunión
                  </Button>
                </div>
                <TableContainer component={Paper} style={{ maxHeight: 'auto', overflow: 'auto', maxWidth: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Titulo de reunión</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Fecha</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Estado</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Cant de Asistentes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reuniones.map((reunion) =>(
                        <TableRow key={reunion.id}>
                          <TableCell>{reunion.titulo}</TableCell>
                          <TableCell>
                            {new Date(reunion.fechaInicioReunion).toLocaleDateString('es-ES')} -{' '}
                            {new Date(reunion.fechaInicioReunion).toLocaleTimeString('es-ES')}
                          </TableCell>
                          <TableCell>{reunion.estado === 'A' ? 'Activo' : 'Inactivo'}</TableCell>
                          <TableCell style={{textAlign:'center'}}>{reunion.asistentes.length}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </div>
          </Container>
        </Paper>
      </Box>
      <ModalTeams open={openModal} onClose={handleCloseModal}/>
    </div>
  )
}

export default teamspage
