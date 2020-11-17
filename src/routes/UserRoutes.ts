import express from 'express'
import { CreateUser, getUserById, getUsers } from '../controllers'

const router = express.Router()

router.get('/allUsers', getUsers)
router.get('/:id', getUserById)
router.post('/signup', CreateUser)

export { router as UserRoute}