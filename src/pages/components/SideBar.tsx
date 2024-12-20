import { useState } from 'react'
import { IconButton, Box, Icon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [isHoveredUser, setIsHoveredUser] = useState(false);
    const [isHoveredViviendas, setIsHoveredViviendas] = useState(false);
    const [isCertificates, setIsCertificates] = useState(false);
    const [isTeams, setIsTeams] = useState(false);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const toggleSidebar = () => setOpen(!open);

  return (
    <div>
        <IconButton edge="start" color="inherit" aria-label="menu"sx={{ width: '40px',
            height: '50px',  
            borderRadius: '0', 
            mr: 2
            }}
            onClick={toggleSidebar}
            >
            <MenuIcon />
        </IconButton>
        {open && (
        <>
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(5px)',
                zIndex: 1000
            }} onClick={toggleSidebar}></Box>

            <Box
                sx={{
                position: 'fixed',
                backgroundColor: 'white',
                top: 0,
                left: 0,
                height: '100%',
                width: '250px',
                boxShadow: 2,
                zIndex: 1200,
                overflowY: 'auto',
                }}
            >
                <div>
                    <div style={{ display: 'flex', margin: '4%', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <IconButton onClick={toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="0.5em" height="0.5em" viewBox="0 0 48 48">
                                <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                                    <path d="M8 8L40 40" />
                                    <path d="M8 40L40 8" />
                                </g>
                            </svg>
                        </IconButton>
                    </div>
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div
                            onClick={()=>navigate('/Users')}
                            style={{
                                color: isHoveredUser ? '#1E90FF' : 'black',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={() => setIsHoveredUser(true)}
                            onMouseLeave={() => setIsHoveredUser(false)}
                            >
                            <Icon style={{paddingRight:'2%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M21.053 20.8c-1.132-.453-1.584-1.698-1.584-1.698s-.51.282-.51-.51s.51.51 1.02-2.548c0 0 1.413-.397 1.13-3.68h-.34s.85-3.51 0-4.7c-.85-1.188-1.188-1.98-3.057-2.547s-1.188-.454-2.547-.396s-2.492.793-2.492 1.19c0 0-.85.056-1.188.396c-.34.34-.906 1.924-.906 2.32s.283 3.06.566 3.625l-.337.114c-.284 3.283 1.13 3.68 1.13 3.68c.51 3.058 1.02 1.756 1.02 2.548s-.51.51-.51.51s-.452 1.245-1.584 1.698s-7.416 2.886-7.927 3.396c-.512.51-.454 2.888-.454 2.888H29.43s.06-2.377-.452-2.888c-.51-.51-6.795-2.944-7.927-3.396zm-12.47-.172c-.1-.18-.148-.31-.148-.31s-.432.24-.432-.432s.432.432.864-2.16c0 0 1.2-.335.96-3.118h-.29s.144-.59.238-1.334a10 10 0 0 1 .037-.996l.038-.426c-.02-.492-.107-.94-.312-1.226c-.72-1.007-1.008-1.68-2.59-2.16c-1.584-.48-1.01-.384-2.16-.335c-1.152.05-2.112.672-2.112 1.01c0 0-.72.047-1.008.335c-.27.27-.705 1.462-.757 1.885v.28c.048.654.26 2.45.47 2.873l-.286.096c-.24 2.782.96 3.118.96 3.118c.43 2.59.863 1.488.863 2.16s-.432.43-.432.43s-.383 1.058-1.343 1.44l-.232.092v5.234h.575c-.03-1.278.077-2.927.746-3.594c.357-.355 1.524-.94 6.353-2.862zm22.33-9.056c-.04-.378-.127-.715-.292-.946c-.718-1.008-1.007-1.68-2.59-2.16s-1.007-.384-2.16-.335c-1.15.05-2.11.672-2.11 1.01c0 0-.72.047-1.008.335c-.27.272-.71 1.472-.758 1.89h.033l.08.914c.02.23.022.435.027.644c.09.666.21 1.35.33 1.59l-.286.095c-.24 2.782.96 3.118.96 3.118c.432 2.59.863 1.488.863 2.16s-.43.43-.43.43s-.054.143-.164.34c4.77 1.9 5.927 2.48 6.28 2.833c.67.668.774 2.316.745 3.595h.48V21.78l-.05-.022c-.96-.383-1.344-1.44-1.344-1.44s-.433.24-.433-.43s.433.43.864-2.16c0 0 .804-.23.963-1.84V14.66q0-.026-.003-.05h-.29s.216-.89.293-1.862z" />
                                </svg>
                            </Icon>
                            User
                        </div>
                        <div onClick={()=>navigate('/Housing')}
                            style={{
                                color: isHoveredViviendas ? '#1E90FF' : 'black',
                                transition: 'color 0.3s ease',
                                }}
                            onMouseEnter={() => setIsHoveredViviendas(true)}
                            onMouseLeave={() => setIsHoveredViviendas(false)}
                        >
                            <Icon style={{paddingRight:'2%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3L2 12h3v8h14v-8h3zm0 5.75A2.25 2.25 0 0 1 14.25 11A2.25 2.25 0 0 1 12 13.25A2.25 2.25 0 0 1 9.75 11A2.25 2.25 0 0 1 12 8.75M12 15c1.5 0 4.5.75 4.5 2.25V18h-9v-.75c0-1.5 3-2.25 4.5-2.25"/></svg>
                            </Icon>
                            Viviendas
                        </div>
                        <div onClick={()=>navigate('/Certificates')}
                            style={{
                                color: isCertificates ? '#1E90FF' : 'black',
                                transition: 'color 0.3s ease',
                                }}
                            onMouseEnter={() => setIsCertificates(true)}
                            onMouseLeave={() => setIsCertificates(false)}    
                        >
                            <Icon style={{paddingRight:'2%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.586 2A2 2 0 0 1 15 2.586L19.414 7A2 2 0 0 1 20 8.414V20a2 2 0 0 1-2 2h-5a1 1 0 1 1 0-2h5V10h-4.5A1.5 1.5 0 0 1 12 8.5V4H6v4a1 1 0 0 1-2 0V4a2 2 0 0 1 2-2zM7 10a4 4 0 0 1 3 6.646v4.192a1.1 1.1 0 0 1-1.592.984L7 21.118l-1.408.704A1.1 1.1 0 0 1 4 20.838v-4.192A4 4 0 0 1 7 10m1 7.874a4 4 0 0 1-2 0v1.508l.553-.276a1 1 0 0 1 .894 0l.553.276zM7 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7-7.586V8h3.586z"/></g></svg>
                            </Icon>
                            Certificados
                        </div>
                        <div onClick={()=>navigate('/Teams')}
                            style={{
                                color: isTeams ? '#1E90FF' : 'black',
                                transition: 'color 0.3s ease',
                                }}
                            onMouseEnter={() => setIsTeams(true)}
                            onMouseLeave={() => setIsTeams(false)}
                        >
                            <Icon style={{paddingRight:'2%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 2.002a1.998 1.998 0 1 0 0 3.996a1.998 1.998 0 0 0 0-3.996M12.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M5 7.993A1 1 0 0 1 6 7h4a1 1 0 0 1 1 1v3a3 3 0 0 1-.146.927A3.001 3.001 0 0 1 5 11zM4 8c0-.365.097-.706.268-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 0 3.436 2.319A4 4 0 0 1 4 10.999zm8 0v3c0 .655-.157 1.273-.436 1.819A2.5 2.5 0 0 0 15 10.5V8a1 1 0 0 0-1-1h-2.268c.17.294.268.635.268 1"/></svg>
                            </Icon>
                            Reuniones
                        </div>
                    </div>
                </div>
            </Box>
        </>
        )}
        </div>
    );
};

export default SideBar
