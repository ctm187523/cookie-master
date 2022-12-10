import Head from "next/head"
import { FC, ReactElement } from "react"
import { NavBar } from "../ui"

interface Props {
    children :ReactElement | ReactElement[], 
}

export const Layout:FC<Props> = ( { children }) => {
    return (
        <>
            <Head>

            </Head>
            <nav>
                {/* importamos el Navbar creado en ../ui */}
                <NavBar />
            </nav>
            <main style={{ padding: '20px 50px'}}>
                { children}
            </main>
        </>
    )
}
