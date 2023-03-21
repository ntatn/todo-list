import {Schema, model} from "mongoose"

const todoSchema = new Schema({
    title: {
        type: 'string',
        required: true,
        minLength: 5
    },
    completed: {
        type: 'boolean',
        required: true
    }

})

export default model("toDo", todoSchema)