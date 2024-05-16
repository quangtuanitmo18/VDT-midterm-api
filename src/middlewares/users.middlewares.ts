import { checkSchema, Schema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'

import { validate } from '~/utils/validation'

const userSchema: Schema = {
  fullname: {
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
  gender: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.GENDER_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGES.GENDER_MUST_BE_A_STRING
    },
    trim: true
  },
  university: {
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
