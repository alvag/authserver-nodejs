import { RegisterUserDto } from '../../domain/dtos';
import { UserModel } from '../../data';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities';

export class AuthService {

    async registerUser( registerUserDto: RegisterUserDto ) {
        const existUser = await UserModel.findOne( { email: registerUserDto.email } );

        if ( existUser ) throw CustomError.badRequest( 'Email already exists' );

        try {
            const user = await UserModel.create( registerUserDto );
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

}
