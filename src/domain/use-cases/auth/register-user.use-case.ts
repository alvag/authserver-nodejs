import { RegisterUserDto } from '../../dtos';
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

interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;
}

type SignTokenFunction = ( payload: any, expiresIn?: string ) => Promise<string | undefined>

export class RegisterUser implements RegisterUserUseCase {
    constructor( private readonly authRepository: AuthRepository,
                 private readonly signToken: SignTokenFunction = JwtAdapter.generateToken,
    ) {
    }

    async execute( registerUserDto: RegisterUserDto ): Promise<UserToken> {

        const user = await this.authRepository.register( registerUserDto );

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
