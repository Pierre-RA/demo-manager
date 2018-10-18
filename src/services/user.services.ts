import { ApiError } from '../errors'
import { IUser, IUserCreateRequest, IUserList, IUserUpdateRequest } from '../interfaces'
import { User } from '../models'
import { BAD_REQUEST } from '../util/http-codes'

export class UserService {
  async getUserById(id: string): Promise<IUser> {
    const user = await User.findOne({ _id: id })

    if (!user) {
      throw new ApiError(BAD_REQUEST, `No user found with id: ${id}`)
    }

    return user
  }

  async getList(): Promise<IUserList> {
    const users = await User.find()

    return {
      users
    }
  }

  async createUser(user: IUserCreateRequest): Promise<IUser> {
    const entry = new User(user)
    const newUser = await entry.save()
    return newUser
  }

  async updateUser(id: string, user: IUserUpdateRequest): Promise<IUser> {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })

    if (!updatedUser) {
      throw new ApiError(BAD_REQUEST, `No user found with id: ${id}`)
    }

    return updatedUser
  }

  async deleteUser(id: string) {
    const user = await User.findByIdAndRemove({ _id: id })

    if (!user) {
      throw new ApiError(BAD_REQUEST, `No user found with id: ${id}`)
    }

    return user
  }

}
