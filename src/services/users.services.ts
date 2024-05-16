import User, { UserType } from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class UsersService {
  public async createUser(user: UserType) {
    return await databaseService.users.insertOne(new User({ ...user }))
  }
  public async getUserById(id: string) {
    return await databaseService.users.findOne({ _id: new ObjectId(id) })
  }
}

const usersService = new UsersService()

export default usersService
