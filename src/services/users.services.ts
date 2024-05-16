import User, { UserType } from '~/models/schemas/User.schema'
import databaseService from './database.services'

class UsersService {
  public async createUser(user: UserType) {
    return await databaseService.users.insertOne(new User({ ...user }))
  }
}

const usersService = new UsersService()

export default usersService
