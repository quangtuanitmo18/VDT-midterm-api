import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import {
  LoginReqBody,
  RegisterReqBody,
  deleteUserByIdParams,
  getUserByIdParams,
  updateUserByIdParams
} from '~/models/requests/User.requests'
import User, { UserType } from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'

export const createUserController = async (
  req: Request<ParamsDictionary, any, UserType>,
  res: Response,
  next: NextFunction
) => {
  const data = await usersService.createUser(req.body)
  return res.status(201).json({
    message: USERS_MESSAGES.CREATE_USER_SUCCESS,
    data
  })
}

export const updateUserController = async (
  req: Request<updateUserByIdParams, any, UserType>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const data = await usersService.updateUser(id, req.body)
  return res.status(204).json({
    message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
    data
  })
}

export const deleteUserController = async (
  req: Request<deleteUserByIdParams, any, UserType>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const result = await usersService.deleteUser(id)
  return res.status(204).json({
    message: USERS_MESSAGES.DELETE_USER_SUCCESS,
    result
  })
}

export const getListUsersController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await usersService.getAllUsers()
  return res.json({
    message: USERS_MESSAGES.GET_LIST_USERS_SUCCESS,
    data
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

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  // console.log(user)
  const user_id = user._id as ObjectId
  const result = await usersService.login({ user_id: user_id.toString(), verify: 1, role: user.role })
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
