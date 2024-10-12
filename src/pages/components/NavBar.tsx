import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';

interface User {
    id: number;
    nombres: string;
    apellidos: string;
    tipoIdentificacion: number;
    identificacion: string;
    correo: string;
    direccion: string;
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
  

const NavBar: React.FC = () => {
    const location = useLocation();
    const user = location.state?.user as User;
  
    return (
    <div>
      <AppBar>
        <Toolbar style={{backgroundColor:'white'}}>
          <SideBar/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'gray', fontWeight: 'bold'}}>
            Junta de Acción Comunal Santo Tomás
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body1" style={{color:'gray'}}>{user.nombres}  {user.apellidos}</Typography>
            <Typography variant="body2" style={{color:'gray'}}>{user.idCargo}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
