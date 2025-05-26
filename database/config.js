


import  mongoose  from 'mongoose'

const dbconection = async() => {

try {

 mongoose.connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: false // Solo para desarrollo
  });

 console.log('Conectado a DB');
    
} catch (error) {

    console.log(error)

    throw new Error('Error al Conectarse a la BD');
    
}

}


export {dbconection}



