import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CreateProductDto, PaginationDto } from '../../domain/dtos';
import { ProductsService } from '../services';

export class ProductsController {

    constructor(
        private readonly productsService: ProductsService,
    ) {
    }

    private handleError( error: unknown, res: Response ) {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json( { error: error.message } );
        }

        console.log( `Error: ${ error }` );
        return res.status( 500 ).json( { error: 'Internal server error' } );
    }

    createProduct = ( req: Request, res: Response ) => {
        const [ error, createProductDto ] = CreateProductDto.create( {
            ...req.body,
            user: req.body.user.id,
        } );

        if ( error ) return res.status( 400 ).json( { error } );

        this.productsService.createProduct( createProductDto! )
            .then( ( product ) => res.status( 201 ).json( product ) )
            .catch( ( error ) => this.handleError( error, res ) );
    };

    getProducts = ( req: Request, res: Response ) => {
        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );

        if ( error ) return res.status( 400 ).json( { error } );

        this.productsService.getProducts( paginationDto! )
            .then( ( response ) => res.status( 200 ).json( response ) )
            .catch( ( error ) => this.handleError( error, res ) );
    };
}
