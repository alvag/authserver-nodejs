import { model, Schema } from 'mongoose';

export const productSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'User is required' ],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [ true, 'Category is required' ],
    },
} );

export const ProductModel = model( 'Product', productSchema );