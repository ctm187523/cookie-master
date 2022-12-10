import NextLink from 'next/link';

import { AppBar, IconButton, Toolbar, Link, Typography } from "@mui/material";
import { MenuOpenOutlined} from '@mui/icons-material';


export const NavBar = () => {
    return (
       <AppBar position='sticky' elevation={ 0 }>
           <Toolbar>
               <IconButton 
                size='large'
                edge='start'
               >
                   <MenuOpenOutlined />
               </IconButton>
                    <Link href="/" underline='none'>
                        <Typography variant='h6' color="white">CookieMaster</Typography>
                    </Link>

                    {/* con el div y flex:1 hacemos una separacion entre los componentes del navbar */}
                    <div style={{ flex: 1 }}></div>

                    <Link href="/theme-changer" underline='none'>
                        <Typography variant='h6' color="white">Cambiar Tema</Typography>
                    </Link>
           </Toolbar>
       </AppBar>
    )
}
