import {Schema, model} from 'mongoose';

export interface UserType{
    id:string;
    email:string;
    password_digest: string;
    name:string;
    address:string;
    isAdmin:boolean;
}

const userSchema = new Schema<UserType>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password_digest: {type: String, required: true},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const User = model<UserType>('user', userSchema);