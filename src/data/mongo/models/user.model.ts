import { model, Schema } from 'mongoose';

export const userSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: true,
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
    },
    img: {
        type: String,
    },
    role: {
        type: [ String ],
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ],
        default: [ 'USER_ROLE' ],
    },
} );

userSchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => {
        delete ret._id;
        delete ret.password;
    },
} );

export const UserModel = model( 'User', userSchema );
