import { model, Schema } from 'mongoose';

export const productSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true,
    },
    available: {
        type: Boolean,
        default: false,
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

productSchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => {
        delete ret._id;
    },
} );

export const ProductModel = model( 'Product', productSchema );
