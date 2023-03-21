<template>
  <div class="container">
    <div class="task">
      <!-- title -->
      <div class="title">
        <h1>To Do List</h1>
      </div>
      <!-- form -->
      <div class="form">
        <input type="text" placeholder="New Task" v-model="newTask" @keyup.enter="addTask" />
        <button @click="addTask"><i class="fas fa-plus"></i></button>
      </div>
      <!-- task lists -->
      <div class="taskItems" v-if="tasks">
        <ul>
          <task-item v-bind:task="task" v-for="(task, index) in tasks" :key="task.id"
            @remove="removeTask(index, task._id)" @complete="completedTask(task, task._id)"></task-item>
        </ul>
      </div>
      <!-- buttons -->
      <div class="clearBtns">
        <button @click="clearCompleted">Clear completed</button>
        <button @click="clearAll">Clear all</button>
      </div>
      <!-- pending task -->
      <div class="pendingTasks">
        <span>Pending Tasks: {{ inComplete }} </span>
      </div>
    </div>
  </div>
</template>
  
<script>
import TaskItem from './Task-item';
import axios from 'axios';
export default {
  name: "task-todo",
  props: ['tasks'],
  components: {
    TaskItem
  },
  data: function () {
    return {
      newTask: '',
    }
  },
  computed: {
    inComplete: function () {
      return this.tasks.filter(this.inProgress).length;
    }
  },
  methods: {
    addTask: function () {
      if (this.newTask) {
        this.$props.tasks.push({
          title: this.newTask,
          completed: false
        })
        axios.post(`http://localhost:3000/api/v1/tasks`, {
          title: this.newTask,
          completed: false
        })
          .catch(e => {
            console.log(e.message)
          })
        this.newTask = '';
      }
    },
    inProgress: function (task) {

      return !this.isCompleted(task);

    },
    isCompleted: function (task) {

      return task.completed;
    },
    clearCompleted: function () {
      const taskComplete = this.tasks.filter(function (task) {
        return task.completed
      })
      for (const task of taskComplete) {
        axios.delete(`http://localhost:3000/api/v1/tasks/${task._id}`)
          .catch(error => {
            console.log(error.message)
          })
      }
      this.$props.tasks = this.tasks.filter(this.inProgress);

    },
    clearAll: function () {
      this.$props.tasks = [];
      axios.delete("http://localhost:3000/api/v1/tasks")
        .catch(error => {
          console.log(error.message)
        })
    },
    removeTask: function (index, id) {
      axios.delete(`http://localhost:3000/api/v1/tasks/${id}`)
        .catch(error => {
          console.log(error.message)
        })
      this.$props.tasks.splice(index, 1);
    },
    completedTask: function (task, id) {
      axios.put(`http://localhost:3000/api/v1/tasks/${id}`, {
        completed: !task.completed
      })
        .catch(error => {
          console.log(error.message)
        })
      task.completed = !task.completed;
    }
  }
};
</script>