import { CreateCategoryDto, PaginationDto } from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';
import { CategoryModel } from '../../data';
import { CustomError } from '../../domain/errors';

export class CategoryService {

    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ) {

        const categoryExists = await CategoryModel.findOne( { name: createCategoryDto.name } );

        if ( categoryExists ) {
            throw CustomError.badRequest( 'Category already exists' );
        }

        try {
            const category = new CategoryModel( {
                ...createCategoryDto,
                user: user.id,
            } );

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            };
        } catch ( error ) {
            throw CustomError.internalError( `${ error }` );
        }
    }

    async getCategories( paginationDto: PaginationDto ) {
        try {
            const [ total, categories ] = await Promise.all( [
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip( ( paginationDto.page - 1 ) * paginationDto.limit )
                    .limit( paginationDto.limit ),
            ] );

            return {
                categories: categories.map( ( category ) => ( {
                    id: category.id,
                    name: category.name,
                    available: category.available,
                } ) ),
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
