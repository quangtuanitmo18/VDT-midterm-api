import request from 'supertest'
import app, { httpServer } from '../src/index'
import databaseService from '../src/services/database.services'
import { envConfig } from '../src/constants/config'

beforeAll(async () => {
  const uri = `mongodb://${envConfig.dbUsername}:${envConfig.dbPassword}@${envConfig.dbHostTest}:${envConfig.dbPort}`
  await databaseService.connect(uri,envConfig.dbNameTest)
})
afterAll(async () => {
  await databaseService.disconnect()
}, 10000)

afterAll((done) => {
  httpServer.close(() => {
    console.log('HTTP server closed')
    done()
  })
})

let userid = describe('POST /users/create', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/users/create')
      .send({
        fullname: 'John Doe',
        gender: 'male',
        university: 'MIT'
      })
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty('_id')
        expect(res.body.data).toHaveProperty('fullname')
        expect(res.body.data).toHaveProperty('gender')
        expect(res.body.data).toHaveProperty('university')
        userid = res.body.data._id
        done()
      })
  })
})

describe('GET /users/list', () => {
  it('should return an array of users', (done) => {
    request(app)
      .get('/users/list')
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body.data).toBeInstanceOf(Array)
        if (res.body.data.length > 0) {
          expect(res.body.data[0]).toHaveProperty('_id')
          expect(res.body.data[0]).toHaveProperty('fullname')
          expect(res.body.data[0]).toHaveProperty('gender')
          expect(res.body.data[0]).toHaveProperty('university')
        }
        done()
      })
  })
})

describe('GET /users/:id', () => {
  it('should return a user', (done) => {
    request(app)
      .get(`/users/${userid}`)
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty('_id')
        expect(res.body.data).toHaveProperty('fullname')
        expect(res.body.data).toHaveProperty('gender')
        expect(res.body.data).toHaveProperty('university')
        done()
      })
  })
})

describe('PUT /users/update/:id', () => {
  it('should update a user', (done) => {
    request(app)
      .put(`/users/update/${userid}`)
      .send({
        fullname: 'Jane Doe',
        gender: 'female',
        university: 'Stanford'
      })
      .end((err, res) => {
        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty('_id')
        expect(res.body.data).toHaveProperty('fullname')
        expect(res.body.data).toHaveProperty('gender')
        expect(res.body.data).toHaveProperty('university')
        done()
      })
  })
})

describe('DELETE /users/delete/:id', () => {
  it('should delete a user', (done) => {
    request(app)
      .delete(`/users/delete/${userid}`)
      .end((err, res) => {
        expect(res.status).toBe(200)
        done()
      })
  })
})
