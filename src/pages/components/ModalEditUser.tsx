import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

interface TipoSelect {
    id: number;
    descripcion: string;
  }

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
  

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user }) => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<TipoSelect[]>([]);
  const [gruposEtnico, setGruposEtnico] = useState<TipoSelect[]>([]);
  const [nivelAcademico, setNivelAcademico] = useState<TipoSelect[]>([]);
  const [cargo, setCargo] = useState<TipoSelect[]>([]);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoIdentificacion, setTipoIdentificacion] = useState<number | undefined>(tiposIdentificacion[0]?.id);
  const [idGrupoEtnico, setIdGrupoEtnico] = useState<number | undefined>(gruposEtnico[0]?.id);
  const [identificacion, setIdentificacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idCargo, setIdCargo] = useState<number | undefined>(cargo[0]?.id);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaInicioResidencia, setFechaInicioResidencia] = useState('');
  const [discapacidad, setDiscapacidad] = useState(0);
  const [lgtbiq, setLgtbiq] = useState(0);
  const [idNivelAcademico, setIdNivelAcademico] = useState<number | undefined>(nivelAcademico[0]?.id);
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

  useEffect(() => {
    if (user) {
      setNombres(user.nombres || '');
      setApellidos(user.apellidos || '');
      setTipoIdentificacion(user.tipoIdentificacion || tiposIdentificacion[0]?.id);
      setIdentificacion(user.identificacion || '');
      setCorreo(user.correo || '');
      setCelular(user.celular || '');
      setTelefono(user.telefono || '');
      setIdGrupoEtnico(user.idGrupoEtnico || gruposEtnico[0]?.id);
      setIdCargo(user.idCargo || cargo[0]?.id);
      setFechaNacimiento(user.fechaNacimiento || '');
      setFechaInicioResidencia(user.fechaInicioResidencia || '');
      setIdNivelAcademico(user.idNivelAcademico || nivelAcademico[0]?.id);
    }
  }, [user, tiposIdentificacion, gruposEtnico, nivelAcademico, cargo]);

  const editarUsuario = async () => {
    const editarUsuario = {
      nombres,
      apellidos,
      tipoIdentificacion,
      identificacion,
      correo,
      celular,
      telefono,
      idCargo,
      fechaNacimiento: fechaNacimiento || user?.fechaNacimiento,
      fechaInicioResidencia: fechaInicioResidencia || user?.fechaInicioResidencia,
      discapacidad,
      idGrupoEtnico,
      lgtbiq,
      idNivelAcademico,
      estado: "A",
    };

    try {
      await axios.post(`https://comunapp-api.azurewebsites.net/api/persona/${user?.id}?code=jHxnbq4O_ZSg5YZHlAebB4nCtW582vBT2bhqBREk-tG5AzFudUVGNw%3D%3D`, editarUsuario);
      alert('Usuario creado exitosamente');
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        console.log(editarUsuario,user?.id)
      } else {
        console.error("Unknown error", error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    setter: Dispatch<SetStateAction<string>>
  ) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\d/g, '').toUpperCase();
    setter(formattedValue);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
  
    if (numericValue.length <= 10) { 
      setter(numericValue);
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
            Editar usuario
          </Typography>
          <Button onClick={onClose}>X</Button>
        </div>

        <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1 }}>
          Detalles de Usuario
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around'}}>
          <Typography>Fecha de Nacimiento: {user?.fechaNacimiento}</Typography>
          <Typography>Fecha de Inicio Recidencia: {user?.fechaInicioResidencia}</Typography>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Nombre/es*</Typography>
            <input type="text" style={{ width: '100%' }} value={nombres} onChange={(e) => handleInputChange(e, setNombres)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Apellidos*</Typography>
            <input type="text" style={{ width: '100%' }} value={apellidos} onChange={(e) => handleInputChange(e, setApellidos)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Tipo de Documento*</Typography>
            <select style={{ width: '100%' }} value={tipoIdentificacion} onChange={(e) => setTipoIdentificacion(Number(e.target.value))}>
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
            <input type="text" style={{ width: '100%' }} value={identificacion} onChange={(e) => handleNumberChange(e, setIdentificacion)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Email*</Typography>
            <input type="email" style={{ width: '100%' }} value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Grupo étnico</Typography>
            <select style={{ width: '100%' }} value={idGrupoEtnico} onChange={(e) => setIdGrupoEtnico(Number(e.target.value))}>
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
          <div style={{ flex: 1 }}>
            <Typography>Teléfono</Typography>
            <input type="text" style={{ width: '100%' }} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Celular</Typography>
            <input type="text" style={{ width: '100%' }} value={celular} onChange={(e) => handleNumberChange(e, setCelular)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de nacimiento</Typography>
            <input type="date" style={{ width: '100%' }} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Fecha de inicio de residencia</Typography>
            <input type="date" style={{ width: '100%' }} onChange={(e) => setFechaInicioResidencia(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Typography>Discapacidad</Typography>
            <select style={{ width: '100%' }} value={discapacidad} onChange={(e) => setDiscapacidad(Number(e.target.value))}>
              <option value="0">No</option>
              <option value="1">Sí</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>LGTBIQ+</Typography>
            <select style={{ width: '100%' }} value={lgtbiq} onChange={(e) => setLgtbiq(Number(e.target.value))}>
              <option value="0">No</option>
              <option value="1">Sí</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <Typography>Nivel académico</Typography>
            <select style={{ width: '100%' }} value={idNivelAcademico} onChange={(e) => setIdNivelAcademico(Number(e.target.value))}>
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
            <select style={{ width: '100%' }} value={idCargo} onChange={(e) => setIdCargo(Number(e.target.value))}>
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

        <Button variant="contained" onClick={editarUsuario}>Actualizar Usuario</Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;