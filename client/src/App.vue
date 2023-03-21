<template>
  <div id="app">
    <task v-bind:tasks="tasks"></task>
  </div>
</template>

<script>
import Task from "./components/Task";
import axios from 'axios';
export default {
  name: "App",
  components: {
    Task,
  },
  data() {
    return {
      tasks: [],
    };
  },

  created: function () {
    axios.get("http://localhost:3000/api/v1/tasks")
      .then(response => {
        this.tasks = response.data.elements.tasks;
        
      })
      .catch(e => {
        console.log(e.message)
      })
  }

};
</script>