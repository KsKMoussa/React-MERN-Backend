
import jwt from 'jsonwebtoken'

const generarJWT = (uid,name) => {

    return new Promise((resolve, reject) => {

                           // Verificar valores antes de firmar el JWT
                           if (!uid || !name) {
                            reject('UID o Name no están definidos');
                        }

          const payload = {uid,name}
          
          jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn: '2h' },(err,token)=> {
                if (err) {
                    console.log(err);
                    reject('No se pude Resolver el Token')
                }
                resolve( token )

            } )
    })


}

export { generarJWT } 