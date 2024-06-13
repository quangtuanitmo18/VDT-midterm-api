import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'

import { USERS_MESSAGES } from '~/constants/messages'
import { verifyAccessToken } from '~/utils/commons'

import { validate } from '~/utils/validation'

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            return await verifyAccessToken(access_token, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)
