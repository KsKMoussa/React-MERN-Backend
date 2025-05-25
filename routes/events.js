
import { Router }  from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { getEventos,crearEventos,actualizarEventos,eliminarEventos } from '../controllers/events.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { isDate } from '../helpers/isDate.js';

/*
 Rutas de acceso  '/api/events'
*/


const eventsRouter = Router();

//Podemos validar todas las rutas ccon el JWT en una sola sentencia


//eventsRouter.use(validarJWT)

//Todos tienen que estar vlidadas con el JWT

//Obtener Eventos

    eventsRouter.get('/' , validarJWT,getEventos)

//Crear eventos

eventsRouter.post('/' ,
           [//midleware
            
            check('title','El Titulo es Obligatorio').not().isEmpty(),
            check('start','La fecha de Inicio es obligatoria').custom(isDate),
            check('end','La fecha Final es obligatoria').custom(isDate),
            validarCampos
             
        ],
    
    validarJWT, crearEventos)

//Actualizar eventos

eventsRouter.put('/:id' , validarJWT , actualizarEventos)

//Borrar eventos

eventsRouter.delete('/:id' , validarJWT, eliminarEventos)



export default eventsRouter ;