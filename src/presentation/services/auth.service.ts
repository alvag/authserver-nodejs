import { LoginUserDto, RegisterUserDto } from '../../domain/dtos';
import { UserModel } from '../../data';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities';
import { bcryptAdapter } from '../../config';

export class AuthService {

    async registerUser( registerUserDto: RegisterUserDto ) {
        const existUser = await UserModel.findOne( { email: registerUserDto.email } );

        if ( existUser ) throw CustomError.badRequest( 'Email already exists' );

        try {
            const user = await UserModel.create( registerUserDto );
            user.password = bcryptAdapter.hash( registerUserDto.password );
            await user.save();

            const { password, ...createdUser } = UserEntity.fromObject( user );

            return {
                user: createdUser,
                token: '',
            };
        } catch ( error ) {
            throw CustomError.internalError( `${ error }` );
        }
    }

    async loginUser( loginUserDto: LoginUserDto ) {
        const user = await UserModel.findOne( { email: loginUserDto.email } );

        if ( !user ) throw CustomError.badRequest( 'Invalid credentials' );

        if ( !bcryptAdapter.compare( loginUserDto.password, user.password ) ) throw CustomError.badRequest( 'Invalid credentials' );

        const { password, ...userEntity } = UserEntity.fromObject( user );

        return {
            user: userEntity,
            token: '',
        };
    }

}
