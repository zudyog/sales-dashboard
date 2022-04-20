import { Schema, model } from "mongoose";

import { Customer } from "./Customer";

class BaseSchema<T> extends Schema<T> {
    constructor(sche: any) {
        super(sche);
        this.set('toJSON', {
            getters: true,
            virtuals: true,
            transform: (doc, converted) => {
                delete converted._id;
            }
        });
    }

}

const CustomersSchema = new BaseSchema<Customer>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
});

export const CustomerModel = model<Customer>('Customers', CustomersSchema);