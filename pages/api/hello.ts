// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {

  //obtenemos las cookies que habian desde donde se hizo la peticion(Resful API) en pages/theme-changer
  console.log(req.cookies);

  res.status(200).json({ 
    name: 'John Doe' ,
    ...req.cookies, //regresamos las cookies
  })
}
