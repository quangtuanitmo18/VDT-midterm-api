import { Router } from 'express'
import { createUserController, getUserByIdController, updateUserController } from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import { createUserValidator, getUserByIdValidator, updateUserValidator } from '~/middlewares/users.middlewares'
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

usersRouter.get('/:id', getUserByIdValidator, wrapRequestHandler(getUserByIdController))

export default usersRouter
