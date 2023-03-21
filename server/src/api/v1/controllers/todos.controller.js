import todo from "../models/todo.js"

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await todo.find()
        res.status(200).json({
            message: null,
            elements: {tasks},
            status: 'success',
            expose: {
               
            }

        })
    }catch (err) {
        res.status(500).json({
            message: err.message,
            elements: null,
            status: 'error',
            expose: {

            }
        })
    }
}

const createTask = async (req, res, next) => {
    try {
        const newTask = await todo.create(req.body)
        res.status(201).json({
            message: 'Task has been added',
            elements: {newTask},
            status: 'success',
            expose: {

            }
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            elements: null,
            status: 'error',
            expose: {

            }
        })
    }
}

const updateTask = async (req, res, next) => {
    try {
        await todo.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(201).json({
            message: 'Updated successfully',
            elements: {todo},
            status: 'success',
            expose: {

            }
        })
    } catch (err) {
        res.status(401).json({
            message: err.message,
            elements: null,
            status: 'error',
            expose: {

            }
        })
    }
}

const deleteTask = async (req, res, next) => {
    try {
        await todo.findByIdAndDelete(req.params.id)
        res.status(201).json({
            message: 'Todos deleted successfully',
            elements: null,
            status: 'success',
            expose: {

            }

        })
    }catch (err) {
        res.status(404).json({
            message: err.message,
            elements: null,
            status: 'error',
            expose: {

            }
        })

    }
}

const deleteAllTasks = async (req, res, next) => {
    try {
        await todo.deleteMany()
        res.status(201).json({
            message: 'All task deleted successfully',
            elements: null,
            status: 'success',
            expose: {

            }

        })
    }catch (err) {
        res.status(500).json({
            message: err.message,
            elements: null,
            status: 'error',
            expose: {

            }
        })

    }
}

export { getAllTasks, createTask, updateTask, deleteTask, deleteAllTasks}