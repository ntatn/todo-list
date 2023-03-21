import express from "express"
import { getAllTasks, createTask, updateTask, deleteTask,deleteAllTasks } from "../controllers/todos.controller.js"
const router = express.Router()

router.get('/', getAllTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.delete('/', deleteAllTasks)

export default router