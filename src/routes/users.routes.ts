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
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  createUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  isAdminValidator,
  loginValidator,
  registerValidator,
  updateUserValidator
} from '~/middlewares/users.middlewares'
import { UserType } from '~/models/schemas/User.schema'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post(
  '/create',
  accessTokenValidator,
  isAdminValidator,
  createUserValidator,
  filterMiddleware<UserType>(['fullname', 'gender', 'university', 'username', 'password', 'role']),
  wrapRequestHandler(createUserController)
)
usersRouter.put(
  '/update/:id',
  accessTokenValidator,
  isAdminValidator,
  updateUserValidator,
  filterMiddleware<UserType>(['fullname', 'gender', 'university', 'username', 'password', 'role']),
  wrapRequestHandler(updateUserController)
)

usersRouter.delete(
  '/delete/:id',
  accessTokenValidator,
  isAdminValidator,
  deleteUserValidator,
  wrapRequestHandler(deleteUserController)
)

usersRouter.get('/list', wrapRequestHandler(getListUsersController))

usersRouter.get('/:id', getUserByIdValidator, wrapRequestHandler(getUserByIdController))

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

export default usersRouter
