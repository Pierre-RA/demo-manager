import {
  Body,
  Delete,
  Example,
  Get,
  Post,
  Put,
  Response,
  Route,
  SuccessResponse,
  Tags
} from 'tsoa'

import {
  IUser,
  IUserCreateRequest,
  IUserError,
  IUserList,
  IUserUpdateRequest
} from '../interfaces'
import { UserService } from '../services/user.services'

@Route('Users')
export class UsersController {

  @Tags('User')
  @SuccessResponse('200', 'successful')
  @Response<IUserError>('400', 'user not found')
  @Get('{userId}')
  @Example<IUser>({
    createdAt: new Date(),
    email: 'test@test.com',
    id: '1'
  })
  public async Get(userId: string): Promise<IUser> {
    return new UserService().getUserById(userId)
  }

  @Tags('User')
  @Get()
  @Example<IUserList>({
    users: [{
      createdAt: new Date(),
      email: 'e@e.com',
      id: '12'
    }, {
      createdAt: new Date(),
      email: 'er@e.com',
      id: '1'
    }]
  })
  public async GetList(): Promise<IUserList> {
    return new UserService().getList()
  }

  @Tags('User')
  @Post()
  public async Create(@Body() request: IUserCreateRequest): Promise<IUser> {
    return new UserService().createUser(request)
  }

  @Tags('User')
  @Delete('{userId}')
  public async Delete(userId: string): Promise<void> {
    return new UserService().deleteUser(userId)
  }

  @Tags('User')
  @Put('{userId}')
  public async Update(userId: string, @Body() request: IUserUpdateRequest): Promise<IUser> {
    // console.log(userId, request)
    // return {
    //   id: '123sad',
    //   email: 'est',
    //   createdAt: new Date()
    // }
    return new UserService().updateUser(userId, request)
  }
}
