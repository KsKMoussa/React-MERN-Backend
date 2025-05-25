import express from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.js';
import { dbconection } from './database/config.js';
import cors from 'cors'
import eventsRouter from './routes/events.js';

dotenv.config();

// Crear el servidor express


const app = express();

//Conecxion a la BD

dbconection()

//Importamos CORS
app.use(cors())

cors

// Posteo de las peticiones 

app.use(express.json())


//Directorio Publico

app.use(express.static('public'))

// Rutas



app.use('/api/auth',router);
app.use('/api/events',eventsRouter);



//Escuchar peticiones

app.listen(process.env.PORT,()=> {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})
