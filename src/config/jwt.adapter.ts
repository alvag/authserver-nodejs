import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {
    static async generateToken( payload: any, expiresIn: string = '2h' ) {
        return new Promise<string | undefined>( resolve => {
            jwt.sign( payload, envs.JWT_SECRET_KEY, { expiresIn }, ( err, token ) => {
                if ( err ) return resolve( undefined );
                resolve( token );
            } );
        } );
    }

    static async validaToken( token: string ) {
        return new Promise( resolve => {
            jwt.verify( token, envs.JWT_SECRET_KEY, ( err, decoded ) => {
                if ( err ) return resolve( undefined );
                resolve( decoded );
            } );
        } );
    }
}
