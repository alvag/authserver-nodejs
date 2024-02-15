import { LoginUserDto } from '../../dtos';
import { AuthRepository } from '../../repositories';
import { JwtAdapter } from '../../../config';
import { CustomError } from '../../errors';

interface UserToken {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

interface LoginUserUseCase {
    execute( loginUserDto: LoginUserDto ): Promise<UserToken>;
}

type SignTokenFunction = ( payload: any, expiresIn?: string ) => Promise<string | undefined>


export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignTokenFunction = JwtAdapter.generateToken,
    ) {
    }

    async execute( loginUserDto: LoginUserDto ): Promise<UserToken> {
        const user = await this.authRepository.login( loginUserDto );

        const token = await this.signToken( {
            id: user.id,
        } );

        if ( !token ) {
            throw CustomError.internalError( 'Error generating token' );
        }

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
