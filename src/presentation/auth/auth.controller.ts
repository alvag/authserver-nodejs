import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos';
import { AuthService } from '../services';

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) {
    }

    register = ( req: Request, res: Response ) => {
        const [ error, registerDto ] = RegisterUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( { error } );

        this.authService.registerUser( registerDto! )
            .then( user => res.json( user ) );
    };

    login = ( req: Request, res: Response ) => {
        res.json( 'Login' );
    };

    validateEmail = ( req: Request, res: Response ) => {
        res.json( 'Validate Email' );
    };

}
