<template>
  <span v-if="isEditing">
    <input type="text" v-on:keyup.enter="updateTodo(todolist)" v-model="newTitle" class="form-control" value="{{ todolist.attributes.title }}" placeholder="Remember me to..." style="width: 258px">
  </span>
  <span v-on:click="editTodo" v-else>{{ todolist.attributes.title }}</span>
  <span class="list-group-actions">
    <a href="javascript:void(0);" v-on:click="updateTodo(todolist)" v-if="isEditing">save</a>
    <a href="javascript:void(0);" v-on:click="editTodo" v-else><i class="fa fa-pencil fa-lg"></i></a>
    <a href="javascript:void(0);" v-on:click="cancel" v-if="isEditing">cancel</a>
    <a href="javascript:void(0);" v-on:click="this.$parent.removeTodo(todolist)" title="Remove {{todolist.attributes.title}}?" v-else><i class="fa fa-trash fa-lg"></i></a>
  </span>
</template>

<script>
import { API_BASE_URL } from '../../config/index.js';

export default {
  props: ['todolist'],
  data() {
    return {
      isEditing: false,
      newTitle: '',
    };
  },
  methods: {
    editTodo() {
      this.$set('isEditing', true);
    },
    cancel() {
      this.$set('isEditing', false);
    },
    updateTodo(todo) {
      const newTodo = {
        title: this.newTitle,
        order: todo.order,
      };
      this.$http.put(`${API_BASE_URL}/api/v1/todos/${todo.id}`, newTodo).then(() => {
        this.$set('isEditing', false);
        this.$parent.fetchTodos();
      }, (error) => {
        console.log(error);
      });
    },
  },
};
</script>
