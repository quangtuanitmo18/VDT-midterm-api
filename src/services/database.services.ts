import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/schemas/User.schema'

import { envConfig } from '~/constants/config'

const uri = `mongodb://${envConfig.dbUsername}:${envConfig.dbPassword}@${envConfig.dbHost}:${envConfig.dbPort}`

class DatabaseService {
  private client!: MongoClient
  private db!: Db

  async connect(uri: string, dbName: string) {
    try {
      if (uri && dbName) {
        this.client = new MongoClient(uri)
        this.db = this.client.db(dbName)

        await this.db.command({ ping: 1 })

        const listConllections = await this.db.listCollections().toArray()
        const ListCollectionsName = listConllections.map((collectionItem) => collectionItem.name)

        if (!ListCollectionsName.includes('users')) {
          await this.db.createCollection('users')
        }

        console.log('Pinged your deployment. You successfully connected to MongoDB!')
      }
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
  async disconnect() {
    await this.client.close()
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
      this.users.createIndex({ fullname: 1 })
      this.users.createIndex({ gender: 1 })
      this.users.createIndex({ university: 1 })
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }
}

const databaseService = new DatabaseService()
databaseService.connect(uri, envConfig.dbName).then(() => {
  databaseService.indexUsers()
})
export default databaseService
