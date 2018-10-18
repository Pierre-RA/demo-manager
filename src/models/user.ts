import { Document, model, Model, Schema } from 'mongoose'

import { IUser } from '../interfaces/user'

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
  email: String,
  createdAt: {
    type: Date,
    timestamps: true
  }
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)


