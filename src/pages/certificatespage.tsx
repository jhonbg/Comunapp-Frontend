import NavBar from './components/NavBar';
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { FileDown } from 'lucide-react';

interface User {
    id: number;
    nombres: string;
    apellidos: string;
    tipoIdentificacion: number;
    identificacion: string;
    correo: string;
    celular: string;
    telefono: string;
    idCargo: number;
    fechaNacimiento: string;
    fechaInicioResidencia: string;
    discapacidad: boolean;
    idGrupoEtnico: number;
    lgtbiq: boolean;
    idNivelAcademico: number;
    estado: string;
  }
  
  interface Cargo {
    id: number;
    descripcion: string;
  }

const certificatespage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<number | null>(null);

    const API_URL_USERS = 'https://comunapp-api.azurewebsites.net/api/persona?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';
    const API_URL_CARGOS = 'https://comunapp-api.azurewebsites.net/api/cargo?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(API_URL_USERS);
            if (!response.ok) {
              throw new Error(`Error al obtener los datos: ${response.statusText}`);
            }
            const data = await response.json();
            setUsers(data);
          } catch (err) {
            setLoading(false);
          } finally {
            setLoading(false);
          }
        };
    
        const fetchCargos = async () => {
          try {
            const response = await fetch(API_URL_CARGOS);
            if (!response.ok) {
              throw new Error(`Error al obtener los datos: ${response.statusText}`);
            }
            const data = await response.json();
            setCargos(data);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchUsers();
        fetchCargos();
      }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    
    const filteredUsers = users.filter(user =>
        user.identificacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (id: number) => {
        setSelectedUsers(id === selectedUsers ? null : id);
    };

    const getCargoDescription = (id: number): string => {
        const cargo = cargos.find(c => c.id === id);
        return cargo ? cargo.descripcion : 'Desconocido';
    };

    const handleCertificateAffiliate = async (user: User) => {
        try {
            const response = await fetch(`https://comunapp-api.azurewebsites.net/api/persona/${user.id}/certificado/afiliacion?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`);
            
            if (!response.ok) {
                throw new Error(`Error al descargar el certificado: ${response.statusText}`);
            }
    
            const blob = await response.blob();
    
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificado_afiliacion_${user.nombres}.pdf`;
    
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al manejar la descarga:", error);
        }
    };

    const handleCertificateNeighborhood = async (user: User) => {
        try {
            const response = await fetch(`https://comunapp-api.azurewebsites.net/api/persona/${user.id}/certificado/vecindad?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`);
            
            if (!response.ok) {
                throw new Error(`Error al descargar el certificado: ${response.statusText}`);
            }
    
            const blob = await response.blob();
    
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificado_vecindad_${user.nombres}.pdf`;
    
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al manejar la descarga:", error);
        }
    };
    

    if (loading) {
        return <div>Cargando...</div>;
    }
    
  return (
    <div>
        <NavBar/>
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
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center', width: '100%', maxWidth: '1200px', margin:'20px'}}>
          <Container>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                margin: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '40%',
                }}
              >
                <Typography style={{ marginBottom: '5px', fontSize:'1.5rem', fontWeight:'bold'}}>Buscar Por Documento</Typography>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Ingrese documento"
                />
              </div>
            </div>
          </Container>
        </Paper>
  
        <Paper elevation={4} style={{ padding: '10px', textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
          <Container maxWidth="xl" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Container maxWidth="lg" style={{ marginTop: '20px', textAlign:'left'}}>
                <Typography variant="h5" style={{ marginBottom: '10px', fontWeight:'bold',fontSize:'1.5rem'}}>
                  Lista de Usuarios
                </Typography>
                <TableContainer component={Paper} style={{ maxHeight: 'auto', overflow: 'auto', maxWidth: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Nombre</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Apellido</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Cargo</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Fecha de Nacimiento</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Teléfono</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Email</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Residencia</TableCell>
                        <TableCell style={{background:'rgb(59, 130, 246)', color: 'white'}}>Afiliado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers
                        .filter((user) => user.estado === 'A')
                        .map((user) => (
                          <TableRow
                            key={user.id}
                            onClick={() => handleRowClick(user.id)}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: selectedUsers === user.id ? '#e0e0e0' : 'transparent',
                            }}
                          >
                            <TableCell>{user.nombres}</TableCell>
                            <TableCell>{user.apellidos}</TableCell>
                            <TableCell>{getCargoDescription(user.idCargo)}</TableCell>
                            <TableCell>{user.fechaNacimiento}</TableCell>
                            <TableCell>{user.telefono}</TableCell>
                            <TableCell>{user.correo}</TableCell>
                            <TableCell>
                              <Button 
                              onClick={() => handleCertificateNeighborhood(user)}
                              style={{
                                color: 'rgb(59, 130, 246)',
                              }}
                              onMouseEnter={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.color = 'rgb(37, 99, 235)';
                              }}
                              onMouseLeave={(e) => {
                                const target = e.target as HTMLButtonElement;
                                target.style.color = 'rgb(59, 130, 246)';
                              }}><FileDown size={18}/></Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleCertificateAffiliate(user)}
                                disabled={user?.idCargo === 11}
                                style={{
                                  color: user?.idCargo === 11 ? 'gray' : 'rgb(59, 130, 246)', // Cambiar color si está deshabilitado
                                  cursor: user?.idCargo === 11 ? 'not-allowed' : 'pointer', // Mostrar un cursor diferente
                                }}
                                onMouseEnter={(e) => {
                                  if (user?.idCargo !== 11) {
                                    const target = e.target as HTMLButtonElement;
                                    target.style.color = 'rgb(37, 99, 235)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (user?.idCargo !== 11) {
                                    const target = e.target as HTMLButtonElement;
                                    target.style.color = 'rgb(59, 130, 246)';
                                  }
                                }}
                              >
                                    <FileDown size={18}/>
                              </Button>
                            </TableCell>
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
    </div>
  )
}

export default certificatespage
