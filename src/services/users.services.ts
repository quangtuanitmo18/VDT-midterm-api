import User, { UserType } from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import _omit from 'lodash/omit'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/utils/crypto'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { signToken, verifyToken } from '~/utils/jwt'
import { envConfig } from '~/constants/config'

class UsersService {
  public async createUser(user: UserType) {
    const _id = new ObjectId()
    await databaseService.users.insertOne(new User({ _id, ...user }))
    return databaseService.users.findOne({ _id })
  }

  public async updateUser(id: string, user: UserType) {
    const body = _omit(user, ['_id', 'created_at', 'updated_at'])
    await databaseService.users.updateOne({ _id: new ObjectId(id) }, { $set: body })
    return await databaseService.users.findOne({ _id: new ObjectId(id) })
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

  public async checkUsernameExist(username: string) {
    const user = await databaseService.users.findOne({ username })
    return Boolean(user)
  }
  private signAccessToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify,
        role: 'user'
      },
      privateKey: envConfig.jwtSecretAccessToken as string,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn
      }
    })
  }
  private signRefreshToken({ user_id, verify, exp }: { user_id: string; verify: UserVerifyStatus; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          verify,
          exp,
          role: 'user'
        },
        privateKey: envConfig.jwtSecretRefreshToken as string
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: envConfig.jwtSecretRefreshToken as string,
      options: {
        expiresIn: envConfig.refreshTokenExpiresIn
      }
    })
  }
  private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
  }
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()

    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        role: 'user',
        password: hashPassword(payload.password)
      })
    )

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Verified
    })
    return {
      access_token,
      refresh_token
    }
  }
}

const usersService = new UsersService()

export default usersService
