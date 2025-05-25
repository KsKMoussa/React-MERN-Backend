
import { response } from 'express'
import jwt from 'jsonwebtoken'



const validarJWT = (req,res=response,next) => {

    // x-token , en los headers
    const token = req.header('x-token');

     if (!token) {
        return  res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        })
     }

     try {

        const payload = jwt.verify(
            token,
             process.env.SECRET_JWT_SEED);     
             req.name = payload.name;
             req.uid= payload.uid
        
     } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Fallo en la verificacion del token'
        })
     }

  next();
}

export { validarJWT }