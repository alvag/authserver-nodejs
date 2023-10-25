import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos';
import { AuthService } from '../services';
import { CustomError } from '../../domain/errors';

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) {
    }

    private handleError( error: unknown, res: Response ) {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json( { error: error.message } );
        }

        console.log( `Error: ${ error }` );
        return res.status( 500 ).json( { error: 'Internal server error' } );
    }

    register = ( req: Request, res: Response ) => {
        const [ error, registerDto ] = RegisterUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( { error } );

        this.authService.registerUser( registerDto! )
            .then( user => res.json( user ) )
            .catch( error => this.handleError( error, res ) );
    };

    login = ( req: Request, res: Response ) => {
        res.json( 'Login' );
    };

    validateEmail = ( req: Request, res: Response ) => {
        res.json( 'Validate Email' );
    };

}
