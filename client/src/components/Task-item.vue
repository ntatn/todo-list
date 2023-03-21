<template>
    <li>
        <button @click="$emit('complete')" v-bind:class="className"><i class="far fa-circle"></i> {{ task.title }}</button>
        <button @click="$emit('remove')"><i class="far fa-trash-alt"></i></button>
    </li>
</template>


<script>
export default {
    name: 'task-item',
    props: ['task'],
    computed: {
        className: function() {
            let classes = ['toggle'];
            if(this.task.completed) {
                classes.push('toggle-completed');
            }
            return classes;
        }
    }
}


</script>