import { ObjectId } from 'mongodb'

export interface UserType {
  _id?: ObjectId
  fullname: string
  gender: string
  university: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  fullname: string
  gender: string
  university: string
  created_at?: Date
  updated_at?: Date

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.fullname = user.fullname || ''
    this.gender = user.gender || ''
    this.university = user.university || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
