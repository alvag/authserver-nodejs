import { Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';
import { AuthRepository } from '../../domain/repositories';
import { UserModel } from '../../data';
import { LoginUser, RegisterUser } from '../../domain/use-cases';

export class AuthController {

    constructor(
        public readonly authRepository: AuthRepository,
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

        new RegisterUser( this.authRepository )
            .execute( registerDto! )
            .then( data => res.json( data ) )
            .catch( error => this.handleError( error, res ) );
    };

    login = ( req: Request, res: Response ) => {
        const [ error, loginUserDto ] = LoginUserDto.create( req.body );
        if ( error ) return res.status( 400 ).json( { error } );

        new LoginUser( this.authRepository ).execute( loginUserDto! )
            .then( user => res.json( user ) )
            .catch( error => this.handleError( error, res ) );
    };

    getUsers = ( req: Request, res: Response ) => {
        UserModel.find()
            .then( users => res.json( users ) )
            .catch( error => this.handleError( error, res ) );
    };

}
