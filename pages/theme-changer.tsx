
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Layout } from "../components/layouts";

//hemos instalado el paquete para manejar cookies --> yarn add js-cookie
// y el paquete para el tipado con typescript --> yarn add -D @types/js-cookie
import Cookies from 'js-cookie'
import { GetServerSideProps } from "next"; 

//importamos axios con --> yarn add axios para hacer peticiones
import axios from 'axios'



const ThemeChangerPage: FC = ( props ) => {

    console.log( {props} )

    const [currentTheme, setCurrentTheme] = useState('light');

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement>) => {

        const selectedTheme = event.target.value;
        setCurrentTheme( selectedTheme);

        //almacenamos en el localStorage
        localStorage.setItem('theme', selectedTheme );

        //usamos el paquete para gestionar las Cookies importado arriba y almacenamos lo mismo que arriba en el localStorage
        Cookies.set('theme', selectedTheme );
    }

    useEffect(() => {
        
        //recuperamos lo guardado en el localStorage y lo imprimimos por consolas
        //las Cookies solo puede almacenar 4kb y el localstorage 5Mb, el principal beneficio
        //de las Cookies es que son enviadas al Backend en request time, la persona 
        //cuando hace request se envia la  Cookie inmediantamente se la pasa al backend
        //en el localStorage hay que mandar manualmente la informacion al backend
        console.log( 'Local Storage:' ,localStorage.getItem('theme'));

        //ahora no recibimos las Cookies de la funcion de abajo getServerSideProps del lado del servidor en las props
        //las recibimos de arriba de Cookies.set('theme', selectedTheme );
        console.log( 'Cookies:', Cookies.get('theme')); 
    }, [currentTheme]);

    //funcion para hacer una peticion al hacer click en Solicitud
    const onClick = async() => {

        //hacemos una peticion al archivo hello.ts de api/hello.ts y extraemos la data
        const { data } = await axios.get('/api/hello');

        console.log({ data })
    }

    return (
       <Layout>
          <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={ currentTheme }
                            onChange= { onThemeChange }
                        >
                            <FormControlLabel value='light' control={ <Radio />} label="Light"/>
                            <FormControlLabel value='dark' control={ <Radio />} label="Dark"/>
                            <FormControlLabel value='custom' control={ <Radio />} label="Custom"/>
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={ onClick }
                    >
                        Solicutd
                    </Button>
                </CardContent>
          </Card>
       </Layout>
    )
}


//usamos ServerSideRendering  para trabajar del lado del servidor, cuando alguien solicite
//esta pagina va a venir precargada con la informacion del lado del servidor
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //del context(ctx) recibido por parametro obtenemos la request req que es la solicitud
    //del cliente cuando la persona entra o refresca en este url, en el request(req) obtenemos las Cookies
    //para backend no hace falta instalar el paquete de Cookies es solo para el Frontend
    const cookies = ctx.req.cookies;

    //desestructuramos las cookies y sabemos que vienen esas dos claves, si no vienen ponemos el valor por defecto
    const { theme = 'light', name ='No name'} = cookies;

    console.log({ cookies })
    return {
        //las props son enviadas a este componente EntryPage por parametros
        props: {
            theme,
            name
        }
    }
}

export default ThemeChangerPage; //las pages deben de ser exportadas por defecto
