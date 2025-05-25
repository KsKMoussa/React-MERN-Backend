
import { Router }  from 'express';
import  { loginUsuario ,crearUsuario, renovarUsuario} from '../controllers/auth.js';
import {check} from'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';



const router = Router()

/*

Rutas de usuarios   / Auth

host +  '/api/auth'


*/


router.post('/new',
    
    [//midleware
        check('name','El Nombre es Obligatorio').not().isEmpty(),
        check('email','El Email es obligatorio').isEmail(),
        check('password','El password es Obligatorio').isLength({min:6}),
        validarCampos
         
    ],
    
    crearUsuario);

router.post('/',
    
        [//midleware
            check('password','El password es Obligatorio').isLength({min:6}),
            validarCampos
             
        ],
    
    loginUsuario);

router.get('/renew',validarJWT,renovarUsuario);

 export default router;