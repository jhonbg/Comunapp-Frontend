import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SideBar from './SideBar';
import { useUser } from '../../UserContext';
  

const NavBar: React.FC =() => {
    const { user } = useUser();
  
    return (
    <div>
      <AppBar>
        <Toolbar style={{backgroundColor:'white'}}>
          <SideBar/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'gray', fontWeight: 'bold'}}>
            Junta de Acción Comunal Santo Tomás
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
          {user ? (
              <>
                <Typography variant="body1" style={{ color: 'gray' }}>
                  {user.nombres} {user.apellidos}
                </Typography>
                <Typography variant="body2" style={{ color: 'gray' }}>
                  {user.idCargo}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" style={{ color: 'gray' }}>
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
