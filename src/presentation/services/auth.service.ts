import { RegisterUserDto } from '../../domain/dtos';
import { UserModel } from '../../data';
import { CustomError } from '../../domain/errors';

export class AuthService {

    async registerUser( registerUserDto: RegisterUserDto ) {
        const existUser = await UserModel.findOne( { email: registerUserDto.email } );

        if ( existUser ) throw CustomError.badRequest( 'Email already exists' );

        return 'User created';
    }

}
