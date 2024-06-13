import { checkSchema, ParamSchema, Schema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'
import usersService from '~/services/users.services'

import { validate } from '~/utils/validation'

const passwordSchema: ParamSchema = {
  optional: true,
  notEmpty: {
    errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

const userSchema: Schema = {
  fullname: {
    optional: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.FULLNAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.FULLNAME_MUST_BE_A_STRING
    },
    trim: true,

    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USERS_MESSAGES.FULLNAME_LENGTH_MUST_BE_FROM_1_TO_100
    }
  },
  username: {
    optional: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.USERNAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.USERNAME_MUST_BE_A_STRING
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isExistUsername = await usersService.checkUsernameExist(value)
        if (isExistUsername) {
          throw new Error(USERS_MESSAGES.USERNAME_ALREADY_EXISTS)
        }
        return true
      }
    }
  },
  password: passwordSchema,
  role: {
    optional: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.ROLE_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.ROLE_MUST_BE_A_STRING
    },
    trim: true
  },
  gender: {
    optional: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.GENDER_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.GENDER_MUST_BE_A_STRING
    },
    trim: true
  },
  university: {
    optional: true,
    notEmpty: {
      errorMessage: USERS_MESSAGES.UNIVERSITY_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.UNIVERSITY_MUST_BE_A_STRING
    },
    trim: true
  }
}

export const createUserValidator = validate(checkSchema({ ...userSchema }, ['body']))
export const updateUserValidator = validate(checkSchema({ ...userSchema }, ['body']))
export const getUserByIdValidator = validate(checkSchema({ id: { notEmpty: true } }, ['params']))
export const deleteUserValidator = validate(checkSchema({ id: { notEmpty: true } }, ['params']))
export const registerValidator = validate(
  checkSchema({ ...userSchema, password: { ...passwordSchema, notEmpty: true } }, ['body'])
)
