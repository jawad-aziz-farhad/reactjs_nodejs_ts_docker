import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    productName: string;
    productPrice: number;
    productCurrency: string;
    productDesc: string;
    productImage: string;
    created_at?: Date;
    updated_at?: Date;
    enabled?: boolean;
}
