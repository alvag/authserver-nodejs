import { model, Schema } from 'mongoose';

export const categorySchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true,
    },
    available: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'User is required' ],
    },
} );

categorySchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => {
        delete ret._id;
    },
} );

export const CategoryModel = model( 'Category', categorySchema );
