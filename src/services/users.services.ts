import User, { UserType } from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import _omit from 'lodash/omit'

class UsersService {
  public async createUser(user: UserType) {
    return await databaseService.users.insertOne(new User({ ...user }))
  }

  public async updateUser(id: string, user: UserType) {
    const body = _omit(user, ['_id', 'created_at', 'updated_at'])
    return await databaseService.users.updateOne({ _id: new ObjectId(id) }, { $set: body })
  }

  public async deleteUser(id: string) {
    return await databaseService.users.deleteOne({ _id: new ObjectId(id) })
  }

  public async getAllUsers() {
    return await databaseService.users.find().toArray()
  }

  public async getUserById(id: string) {
    return await databaseService.users.findOne({ _id: new ObjectId(id) })
  }
}

const usersService = new UsersService()

export default usersService