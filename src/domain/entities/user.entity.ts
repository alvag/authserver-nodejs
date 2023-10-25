import { CustomError } from '../errors';

export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: string,
        public password: string,
        public role: string[],
        public img: string,
    ) {
    }

    static fromObject( object: { [ key: string ]: any } ) {
        const { id, _id, name, email, emailValidated, password, role, img } = object;

        if ( !_id && !id ) throw CustomError.badRequest( 'Id is required' );

        if ( !name ) throw CustomError.badRequest( 'Name is required' );

        if ( !email ) throw CustomError.badRequest( 'Email is required' );

        if ( emailValidated === undefined ) throw CustomError.badRequest( 'Email validated is required' );

        if ( !password ) throw CustomError.badRequest( 'Password is required' );

        if ( !role ) throw CustomError.badRequest( 'Role is required' );

        return new UserEntity(
            _id || id,
            name,
            email,
            emailValidated,
            password,
            role,
            img,
        );
    }
}
