import { model, Schema } from 'mongoose';

export const categorySchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
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

export const CategoryModel = model( 'Category', categorySchema );