

import {response} from 'express'
import { validationResult } from 'express-validator';


const validarCampos = (req,res=response,netx) => {

// Manejo de errores

const errors = validationResult(req);

if (!errors.isEmpty()) {

     return res.status(400).json({
       ok: false,
       error: errors.mapped()
     })

};

netx()

}

export {
    validarCampos
}