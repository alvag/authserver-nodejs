import { Request, Response } from 'express';

export class AuthController {

    constructor() {
    }

    register = ( req: Request, res: Response ) => {
        res.json( 'Register' );
    };

    login = ( req: Request, res: Response ) => {
        res.json( 'Login' );
    };

    validateEmail = ( req: Request, res: Response ) => {
        res.json( 'Validate Email' );
    };

}
