import React, { useEffect, useState } from 'react';
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
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoIdentificacion, setTipoIdentificacion] = useState<number | undefined>();
  const [identificacion, setIdentificacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [celular, setCelular] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idCargo, setIdCargo] = useState<number | undefined>();
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaInicioResidencia, setFechaInicioResidencia] = useState('');
  const [discapacidad, setDiscapacidad] = useState(0);
  const [idGrupoEtnico, setIdGrupoEtnico] = useState<number | undefined>();
  const [lgtbiq, setLgtbiq] = useState(0);
  const [idNivelAcademico, setIdNivelAcademico] = useState<number | undefined>();
  const [datosCargados, setDatosCargados] = useState(false);

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
      console.error('Error al obtener los niveles académicos:', error);
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
    if (open && !datosCargados) {
      fetchTiposIdentificacion();
      fetchGrupoEtnico();
      fetchNivelAcademico();
      fetchCargo();
      setDatosCargados(true);
    }
  }, [open, datosCargados]);

  const crearUsuario = async () => {
    const nuevoUsuario = {
      nombres,
      apellidos,
      tipoIdentificacion,
      identificacion,
      correo,
      direccion,
      celular,
      telefono,
      idCargo,
      fechaNacimiento,
      fechaInicioResidencia,
      discapacidad,
      idGrupoEtnico,
      lgtbiq,
      idNivelAcademico,
      estado: "A",
    };

    console.log('Nuevo Usuario:', nuevoUsuario, idNivelAcademico, tipoIdentificacion);

    try {
      await axios.post('https://comunapp-api.azurewebsites.net/api/agregarPersona?code=BZhf5gf0vsQHCDHoV2NtGPfN--xNwA_r31YxQPHiBCu5AzFuDu8RQQ%3D%3D', nuevoUsuario);
      alert('Usuario creado exitosamente');
      onClose(); 
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
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
        minWidth: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <input type="text" style={{ width: '100%' }} value={nombres} onChange={(e) => setNombres(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Apellidos*</Typography>
            <input type="text" style={{ width: '100%' }} value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Tipo de Documento*</Typography>
            <select style={{ width: '100%' }} onChange={(e) => setTipoIdentificacion(Number(e.target.value))}>
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
            <input type="text" style={{ width: '100%' }} value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Email*</Typography>
            <input type="email" style={{ width: '100%' }} value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Dirección</Typography>
            <input type="text" style={{ width: '100%' }} value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Grupo étnico</Typography>
            <select style={{ width: '100%' }} onChange={(e) => setIdGrupoEtnico(Number(e.target.value))}>
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
            <Typography>Teléfono</Typography>
            <input type="text" style={{ width: '100%' }} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Celular</Typography>
            <input type="text" style={{ width: '100%' }} value={celular} onChange={(e) => setCelular(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de nacimiento</Typography>
            <input type="date" style={{ width: '100%' }} value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de inicio de residencia</Typography>
            <input type="date" style={{ width: '100%' }} value={fechaInicioResidencia} onChange={(e) => setFechaInicioResidencia(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Discapacidad</Typography>
            <select style={{ width: '100%' }} onChange={(e) => setDiscapacidad(Number(e.target.value))}>
              <option value="0">No</option>
              <option value="1">Sí</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>LGTBIQ+</Typography>
            <select style={{ width: '100%' }} onChange={(e) => setLgtbiq(Number(e.target.value))}>
              <option value="0">No</option>
              <option value="1">Sí</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Nivel académico</Typography>
            <select style={{ width: '100%' }} onChange={(e) => setIdNivelAcademico(Number(e.target.value))}>
              {nivelAcademico.length > 0 ? (
                nivelAcademico.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))
              ) : (
                <option>Cargando niveles académicos...</option>
              )}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Cargo</Typography>
            <select style={{ width: '100%' }} onChange={(e) => setIdCargo(Number(e.target.value))}>
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
        </div>

        <Button variant="contained" onClick={crearUsuario}>Crear Usuario</Button>
      </Box>
    </Modal>
  );
};

export default ModalMessage;