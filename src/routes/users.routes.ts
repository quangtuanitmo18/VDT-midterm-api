import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  getListUsersController,
  getUserByIdController,
  loginController,
  registerController,
  updateUserController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  createUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  loginValidator,
  registerValidator,
  updateUserValidator
} from '~/middlewares/users.middlewares'
import { UserType } from '~/models/schemas/User.schema'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post(
  '/create',
  createUserValidator,
  filterMiddleware<UserType>(['fullname', 'gender', 'university']),
  wrapRequestHandler(createUserController)
)
usersRouter.put(
  '/update/:id',
  updateUserValidator,
  filterMiddleware<UserType>(['fullname', 'gender', 'university']),
  wrapRequestHandler(updateUserController)
)

usersRouter.delete('/delete/:id', deleteUserValidator, wrapRequestHandler(deleteUserController))

usersRouter.get('/list', wrapRequestHandler(getListUsersController))

usersRouter.get('/:id', getUserByIdValidator, wrapRequestHandler(getUserByIdController))

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

export default usersRouter
