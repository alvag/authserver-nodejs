import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CreateCategoryDto } from '../../domain/dtos';

export class CategoryController {
    private handleError( error: unknown, res: Response ) {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json( { error: error.message } );
        }

        console.log( `Error: ${ error }` );
        return res.status( 500 ).json( { error: 'Internal server error' } );
    }

    createCategory = ( req: Request, res: Response ) => {
        const [ error, createCategoryDto ] = CreateCategoryDto.create( req.body );

        if ( error ) return res.status( 400 ).json( { error } );

        res.json(
            createCategoryDto,
        );
    };

    getCategories = ( req: Request, res: Response ) => {
        res.json( { message: 'Categories' } );
    };
}
