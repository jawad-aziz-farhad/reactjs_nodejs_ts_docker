import * as mongoose from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const Schema = mongoose.Schema;

export const ProductSchema: any = new Schema({
    productName: {
        required: true,
        type: String
    },
    productPrice: {
        required: true,
        type: Number,
    },
    productCurrency: {
        default: 'USD',
        type: String,
    },
    productDesc: {
        required: true,
        type: String,
    },
    productImage: {
        required: true,
        type: String,
    },
    createdAt : {
        default: new Date(),
        type : Date,
    },
});


export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)
