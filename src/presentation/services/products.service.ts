import { CreateProductDto, PaginationDto } from '../../domain/dtos';
import { ProductModel } from '../../data';
import { CustomError } from '../../domain/errors';

export class ProductsService {

    async createProduct( createProductDto: CreateProductDto ) {

        const productExists = await ProductModel.findOne( { name: createProductDto.name } );

        if ( productExists ) {
            throw CustomError.badRequest( 'Product already exists' );
        }

        try {
            const product = new ProductModel( createProductDto );

            await product.save();

            return product;
        } catch ( error ) {
            throw CustomError.internalError( `${ error }` );
        }
    }

    async getProducts( paginationDto: PaginationDto ) {
        try {
            const [ total, products ] = await Promise.all( [
                ProductModel.countDocuments(),
                ProductModel.find()
                    .populate( 'user', 'name email id' )
                    .populate( 'category', 'name id' )
                    .skip( ( paginationDto.page - 1 ) * paginationDto.limit )
                    .limit( paginationDto.limit ),
            ] );

            return {
                products,
                page: paginationDto.page,
                limit: paginationDto.limit,
                total,
                totalPages: Math.ceil( total / paginationDto.limit ),
            };
        } catch ( error ) {
            throw CustomError.internalError( `${ error }` );
        }
    }

}
