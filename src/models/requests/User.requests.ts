import { ParamsDictionary } from 'express-serve-static-core'

export interface getUserByIdParams extends ParamsDictionary {
  id: string
}
