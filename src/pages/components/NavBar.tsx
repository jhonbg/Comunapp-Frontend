import React, {useState ,useEffect }from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SideBar from './SideBar';
import { useUser } from '../../UserContext';
import { green } from '@mui/material/colors';
  
interface Cargo {
  id: number;
  descripcion: string;
}

const NavBar: React.FC =() => {
    const { user } = useUser();
    const [cargos, setCargos] = useState<Cargo[]>([]);

    const API_URL_CARGOS = 'https://comunapp-api.azurewebsites.net/api/cargo?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D';
  
    useEffect(() => {
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
  
      fetchCargos();
    }, []);

    const getCargoDescription = (id: number): string => {
      const cargo = cargos.find(c => c.id === id);
      return cargo ? cargo.descripcion : 'Desconocido';
    };
    return (
    <div >
      <AppBar>
        <Toolbar style={{backgroundColor:'#16A34A'}}>
          <SideBar/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'white', fontWeight: 'bold'}}>
            Junta de Acción Comunal Santo Tomás
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
          {user ? (
              <>
                <Typography variant="body1" style={{ color: 'white' }}>
                  {user.nombres} {user.apellidos}
                </Typography>
                <Typography variant="body2" style={{ color: 'white' }}>
                  {getCargoDescription(user.idCargo)}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" style={{ color: 'white' }}>
                Usuario no autenticado
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
