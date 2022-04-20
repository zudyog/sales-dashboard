import mongoose from "mongoose";

export interface Customer extends mongoose.Document {
    // id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    createdOn: Date;
}