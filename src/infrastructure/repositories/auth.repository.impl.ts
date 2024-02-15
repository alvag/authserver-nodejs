import { LoginUserDto, RegisterUserDto } from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';
import { AuthRepository } from '../../domain/repositories';
import { AuthDatasource } from '../../domain/datasources';

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource,
    ) {
    }

    login( loginUserDto: LoginUserDto ): Promise<UserEntity> {
        return this.authDatasource.login( loginUserDto );
    }

    register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
        return this.authDatasource.register( registerUserDto );
    }
}
