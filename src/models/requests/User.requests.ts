import { ParamsDictionary } from 'express-serve-static-core'
import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'

export interface getUserByIdParams extends ParamsDictionary {
  id: string
}

export interface updateUserByIdParams extends ParamsDictionary {
  id: string
}

export interface deleteUserByIdParams extends ParamsDictionary {
  id: string
}

export interface RegisterReqBody {
  username: string
  fullname: string
  password: string
  confirm_password: string
  university: string
  gender: string
}

export interface LoginReqBody {
  username: string
  password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
