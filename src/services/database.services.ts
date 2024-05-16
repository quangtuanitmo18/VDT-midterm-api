import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'

import { envConfig } from '~/constants/config'

const uri = `mongodb://${envConfig.dbUsername}:${envConfig.dbPassword}@${envConfig.dbHost}:${envConfig.dbPort}`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.dbName)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })

      const listConllections = await this.db.listCollections().toArray()
      const ListCollectionsName = listConllections.map((collectionItem) => collectionItem.name)

      if (!ListCollectionsName.includes('users')) {
        await this.db.createCollection('users')
      }

      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
  async indexUsers() {
    const exists = await this.users.indexExists([
      'fullname_1_gender_1_university_1',
      'fullname_1',
      'gender_1',
      'university_1'
    ])

    if (!exists) {
      this.users.createIndex({ fullname: 1, gender: 1, university: 1 })
      this.users.createIndex({ fullname: 1 }, { unique: true })
      this.users.createIndex({ gender: 1 }, { unique: true })
      this.users.createIndex({ university: 1 }, { unique: true })
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }
}

const databaseService = new DatabaseService()
export default databaseService
