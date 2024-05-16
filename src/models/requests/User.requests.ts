import { ParamsDictionary } from 'express-serve-static-core'

export interface getUserByIdParams extends ParamsDictionary {
  id: string
}

export interface updateUserByIdParams extends ParamsDictionary {
  id: string
}
