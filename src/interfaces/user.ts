export interface IUser {
  id: string
  email: string
  createdAt: Date
}

export interface IUserList {
  users: Array<IUser>
}

export interface IUserCreateRequest {
  email: string
}

export interface IUserUpdateRequest {
  createdAt?: Date
  email: string
}

export interface IUserError {
  message: string
  status: number
}
