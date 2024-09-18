import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

interface TipoSelect {
  id: number;
  descripcion: string;
}

interface ModalMessageProps {
  open: boolean;
  onClose: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({ open, onClose }) => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<TipoSelect[]>([]);
  const [gruposEtnico, setGruposEtnico] = useState<TipoSelect[]>([]);
  const [nivelAcademico, setNivelAcademico] = useState<TipoSelect[]>([]);
  const [cargo, setCargo] = useState<TipoSelect[]>([]);

  const fetchTiposIdentificacion = async () => {
    try {
      const response = await axios.get('https://comunapp-api.azurewebsites.net/api/tipoIdentificacion?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D');
      setTiposIdentificacion(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de identificación:', error);
    }
  };

  const fetchGrupoEtnico = async () => {
    try {
      const response = await axios.get('https://comunapp-api.azurewebsites.net/api/grupoEtnico?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D');
      setGruposEtnico(response.data);
    } catch (error) {
      console.error('Error al obtener los grupos étnicos:', error);
    }
  };

  const fetchNivelAcademico = async () => {
    try {
      const response = await axios.get('https://comunapp-api.azurewebsites.net/api/nivelAcademico?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D');
      setNivelAcademico(response.data);
    } catch (error) {
      console.error('Error al obtener los niveles academicos:', error);
    }
  };

  const fetchCargo = async () => {
    try {
      const response = await axios.get('https://comunapp-api.azurewebsites.net/api/cargo?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D');
      setCargo(response.data);
    } catch (error) {
      console.error('Error al obtener los cargos:', error);
    }
  };

  useEffect(() => {
    if(open) {
      fetchCargo();
    }
  })

  useEffect(() => {
    if(open) {
      fetchNivelAcademico();
    }
  })

  useEffect(() => {
    if(open) {
      fetchGrupoEtnico();
    }
  })

  useEffect(() => {
    if (open) {
      fetchTiposIdentificacion();
    }
  }, [open]);

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
        minWidth: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography id="modal-modal-title" variant='h5' sx={{ fontWeight: 'bold' }}>
            Nuevo usuario
          </Typography>
          <Button onClick={onClose}>X</Button>
        </div>

        <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1 }}>
          Detalles de Usuario
        </Typography>

        <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
                <Typography>Nombre/es*</Typography>
                <input type="text" style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
                <Typography>Apellidos*</Typography>
                <input type="text" style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
                <Typography>Dirección</Typography>
                <input type="text" style={{ width: '100%' }} />
            </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Rol*</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de nacimiento</Typography>
            <input type="date" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Número de teléfono o celular*</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Fechas */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de afiliación*</Typography>
            <input type="date" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de residencia</Typography>
            <input type="date" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Posee algún tipo de discapacidad?*</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Sí</option>
              <option value="1">No</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Tipo de Documento*</Typography>
            <select style={{ width: '100%' }}>
              {tiposIdentificacion.length > 0 ? (
                tiposIdentificacion.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))
              ) : (
                <option>Cargando tipos de documento...</option>
              )}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Documento*</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Cual?</Typography>
            <input type="text" style={{ width: '100%' }} />
          </div>
        </div>


        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Email*</Typography>
            <input type="email" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Grupo étnico</Typography>
            <select style={{ width: '100%' }}>
            {gruposEtnico.length > 0 ? (
                gruposEtnico.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))
              ) : (
                <option>Cargando grupos étnicos...</option>
              )}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Hace parte de la Comunidad LGTBIQ+*</Typography>
            <select style={{ width: '100%' }}>
              <option value="0">Sí</option>
              <option value="1">No</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Cargo*</Typography>
            <select style={{ width: '100%' }}>
            {cargo.length > 0 ? (
                cargo.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))
              ) : (
                <option>Cargando cargos...</option>
              )}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Nivel académico</Typography>
            <select style={{ width: '100%' }}>
            {nivelAcademico.length > 0 ? (
                nivelAcademico.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))
              ) : (
                <option>Cargando niveles academicos...</option>
              )}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ background: "grey", color: 'white', width: '150px' }}>Crear Usuario</button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalMessage;