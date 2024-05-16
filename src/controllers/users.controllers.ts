import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { getUserByIdParams } from '~/models/requests/User.requests'
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

export const getUserByIdController = async (
  req: Request<getUserByIdParams, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const data = await usersService.getUserById(id)
  return res.json({
    message: USERS_MESSAGES.GET_USER_BY_ID_SUCCESS,
    data
  })
}
