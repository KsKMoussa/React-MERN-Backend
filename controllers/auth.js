
import { response } from "express";

import { validationResult } from "express-validator";
import { UsuarioModel } from "../models/Usuario.js";
import bcrypt from 'bcryptjs'
import  { generarJWT } from "../helpers/jws.js"; 



const crearUsuario = async(req,res = response) => {


  const { name,email,password } = req.body;

  try {

    let usuario = await UsuarioModel.findOne({email});

    if (usuario)  {
      return res.status(400).json({
        ok: false,
        msg: 'Ya se encuentra registrado el correo'
    })

    }

        //Encrypat contrasena

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

    usuario = new UsuarioModel({ name, email, password: hashedPassword });
    await usuario.save()

     //Generar JWT

     const token = await generarJWT(usuario._id,usuario.name)

    // Manejo de errores
  
      res.status(201).json({
           ok: true,
           uid: usuario._id,
           name: usuario.name ,
           token: token
       })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte al Administrador'
  })

  }

  };

  const loginUsuario = async(req,res=response) => {

    const { email,password } = req.body;


// Verificar si el usuario existe

try {

  const usuario = await UsuarioModel.findOne({email});

    if (!usuario)  {
      return res.status(400).json({
        ok: false,
        msg: 'Email No registrado'
    })
  
  }
    
  // Verificar Password

  const validatePassword = await bcrypt.compare(password,usuario.password);

  if (!validatePassword ) {
    return res.status(400).json({
      ok: false,
      msg: 'Password Incorrecto'
  })

  }

  //Generar JWT

  const token = await generarJWT(usuario._id,usuario.name)

  res.status(201).json({
    ok: true,
    uid: usuario._id,
    name: usuario.name ,
    token
})


} catch (error) {

  console.log(error);
  res.status(500).json({
    ok: false,
    msg: 'Contacte al Administrador'
})
  
}

  };

  const renovarUsuario = async(req,res=response) =>  {

    const {uid,name} = req;

    //Generar JWT

    const token = await generarJWT(uid,name)

    res.json({
         ok: true,
         msg: 'Renew del usuario',
         token
     })
  }

  export { crearUsuario, loginUsuario ,renovarUsuario};

  