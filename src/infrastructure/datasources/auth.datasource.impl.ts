import { AuthDatasource } from '../../domain/datasources';
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { UserModel } from '../../data';
import { BcryptAdapter } from '../../config';

type HashFunction = ( password: string ) => string;
type CompareFunction = ( password: string, hashed: string ) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {
    }

    async login( loginUserDto: LoginUserDto ): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {
            const user = await UserModel.findOne( {
                email,
            } );

            if ( !user ) throw CustomError.badRequest( 'Invalid credentials' );

            const isPasswordValid = this.comparePassword( password, user.password );

            if ( !isPasswordValid ) throw CustomError.badRequest( 'Invalid credentials' );

            return UserEntity.fromObject( user );

        } catch ( error ) {
            if ( error instanceof CustomError ) {
                throw error;
            }

            throw CustomError.internalError();
        }
    }

    async register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            const existUser = await UserModel.findOne( { email } );

            if ( existUser ) throw CustomError.badRequest( 'Email already exists' );

            const user = await UserModel.create( {
                name,
                email,
                password: this.hashPassword( password ),
            } );

            await user.save();

            return UserEntity.fromObject( user );
        } catch ( error ) {
            if ( error instanceof CustomError ) {
                throw error;
            }

            throw CustomError.internalError();
        }
    }
}
