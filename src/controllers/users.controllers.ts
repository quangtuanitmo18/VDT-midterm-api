import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { UserType } from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'

export const createUserController = async (
  req: Request<ParamsDictionary, any, UserType>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.createUser(req.body)
  return res.json({
    message: USERS_MESSAGES.CREATE_USER_SUCCESS,
    result
  })
}
