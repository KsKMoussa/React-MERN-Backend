import express, { response } from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.js';
import { dbconection } from './database/config.js';
import cors from 'cors'
import eventsRouter from './routes/events.js';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 2. Configurar __dirname

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

// creamos el path generico


// Crear el servidor express

const app = express();

//Conecxion a la BD

dbconection()

//Importamos CORS
app.use(cors())

// Posteo de las peticiones 

app.use(express.json())


//Directorio Publico
app.use(express.static(path.join( __dirname, 'public')));

//app.use(express.static('public'))

// Rutas

app.use('/api/auth',router);
app.use('/api/events',eventsRouter);


app.use('/{*splat}', (req, res)=>{

                res.sendFile(path.join(__dirname, 'public/index.html'))

})



//Escuchar peticiones

app.listen(process.env.PORT,()=> {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})
