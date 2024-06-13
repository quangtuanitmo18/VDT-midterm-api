import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
export interface UserType {
  _id?: ObjectId
  fullname: string
  gender: string
  university: string
  username: string
  password: string
  role: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  fullname: string
  gender: string
  university: string
  username: string
  password: string
  role: string
  created_at?: Date
  updated_at?: Date

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.fullname = user.fullname || ''
    this.gender = user.gender || ''
    this.username = user.username || ''
    this.password = user.password || ''
    this.role = user.role || 'user'
    this.university = user.university || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
