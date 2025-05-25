
import { response } from "express";
import { EventoModel } from "../models/evento.js";


const getEventos = async (req,res = response) => {
        
    const eventos = await EventoModel.find()
                                     .populate('user','name')

    try {
        res.json( {
        
            ok: true,
            eventos 
        }
       ) 
    } catch (error) {
        console.log("Error en el servidor:", error);
        res.status(500).json({ ok: false, msg: "Error interno en el servidor" });
    }



}
  

   const crearEventos = async(req,res = response) => {

    // Guardar Evento en moongole

    const evento = new EventoModel( req.body);
    

    try {
        
        evento.user = req.uid
        const eventoDB = await evento.save();

        res.status(200).json({
            ok: true,
            mesg:'Evento Guardado',
            eventoDB
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

   const actualizarEventos = async(req,res = response) => {

    const eventoid = req.params.id;
    const uid = req.uid

   
    try {

        const evento = await EventoModel.findById( eventoid )
        //console.log( req.uid)
        //console.log( evento.user.toString())

        if ( !evento ) {

          return  res.status(404).json({
                ok: false,
                msg: 'Evento No existe para este Id '
            });
        }


        if (evento.user.toString() !== uid )   {

            return   res.status(401).json({
                ok: false,
                msg: 'No tiene Privilegios para modificar'
          })
          
       };

       const nuevoEvento = {
        ...req.body,
        user: uid
       }

       const EventoActualizado =  await EventoModel.findByIdAndUpdate(eventoid,nuevoEvento,{new:true} )

       res.json({
        ok: true,
        evento: EventoActualizado
  })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}

   const eliminarEventos = async(req,res = response) => {


    const eventoid = req.params.id;
    const uid = req.uid
   

    try {

        const evento = await EventoModel.findById( eventoid )
        console.log( req.uid)
        console.log( evento)


        if ( !evento ) {

           return  res.status(404).json({
                ok: false,
                msg: 'Evento Id No existe em BD para  ser eliminar  '
            });
        };

        if (evento.user.toString() !== uid )   {

            return   res.status(401).json({
                ok: false,
                msg: 'No tiene Privilegios para Eliminar'
          })
          
       };

     
       const EventoEminado =  await EventoModel.findByIdAndDelete(eventoid)

        res.status(500).json({
            ok: false,
            msg: 'Evento Eliminado',
            evento: EventoEminado 
        })

        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

    
}


export { getEventos, crearEventos ,actualizarEventos,eliminarEventos};
