import { LoginUserDto, RegisterUserDto } from '../../domain/dtos';
import { UserModel } from '../../data';
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities';
import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { EmailService } from './email.service';

export class AuthService {

    constructor(
        private readonly emailService: EmailService,
    ) {
    }

    async registerUser( registerUserDto: RegisterUserDto ) {
        const existUser = await UserModel.findOne( { email: registerUserDto.email } );

        if ( existUser ) throw CustomError.badRequest( 'Email already exists' );

        try {
            const user = await UserModel.create( registerUserDto );
            user.password = bcryptAdapter.hash( registerUserDto.password );
            await user.save();

            await this.sendEmailValidationLink( user.email );

            const { password, ...createdUser } = UserEntity.fromObject( user );

            const token = await JwtAdapter.generateToken( {
                id: createdUser.id,
            } );

            if ( !token ) throw CustomError.internalError( 'Error generating token' );

            return {
                user: createdUser,
                token,
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

        const token = await JwtAdapter.generateToken( {
            id: userEntity.id,
            email: userEntity.email,
        } );

        if ( !token ) throw CustomError.internalError( 'Error generating token' );

        return {
            user: userEntity,
            token,
        };
    }

    private async sendEmailValidationLink( email: string ) {
        const token = await JwtAdapter.generateToken( { email } );

        if ( !token ) throw CustomError.internalError( 'Error generating token' );

        const link = `${ envs.WEB_APP_URL }/auth/validate-email/${ token }`;
        const subject = 'Validate your email';
        const html = `
        <h1>Validate your email</h1>
        <p>Click the link below to validate your email</p>
        <a href="${ link }">Validate your email: ${ email }</a>        
        `;
        const isSent = await this.emailService.sendEmail( {
            to: email,
            subject,
            htmlBody: html,
        } );

        if ( !isSent ) throw CustomError.internalError( 'Error sending email' );
    }

    async validateEmail( token: string ) {
        try {

            const payload = await JwtAdapter.validaToken( token );

            if ( !payload ) throw CustomError.badRequest( 'Invalid token' );

            const { email } = payload as { email: string };

            const user = await UserModel.findOne( { email } );

            if ( !user ) throw CustomError.badRequest( 'Invalid token' );

            user.emailValidated = true;
            await user.save();

            return user;
        } catch ( error ) {
            throw CustomError.internalError( `${ error }` );
        }
    }
}
