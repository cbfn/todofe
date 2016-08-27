<template>
  <div class="todo">
    <h1>Task list with Vue.js! ;-)</h1>
    <input type="text" v-model="todo.attributes.title" class="form-control" placeholder="Remember me to..." style="width: 258px">
    <select v-model="todo.attributes.order" class="form-control" style="width: 100px">
      <option value="0" selected>Priority</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button v-on:click="addTodo" class="form-control">Submit</button>
    <ul class="list-group" v-if="todos.length > 0">
      <li v-for="todo in todos | orderBy 'attributes.order'" track-by="$index" class="list-group-item">
        <todo-item :todolist="todo"></todo-item>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import { API_BASE_URL } from '../../config/index.js';

export default {
  data() {
    return {
      todo: { attributes: { title: '', completed: '', order: 0 } },
      todos: [],
    };
  },
  components: {
    TodoItem,
  },
  ready() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      this.$http.get(`${API_BASE_URL}/api/v1/todos`).then((response) => {
        this.$set('todos', response.data.data);
      }, (error) => {
        console.log(error);
      });
    },
    addTodo() {
      this.$http.post(`${API_BASE_URL}/api/v1/todos`, this.todo.attributes).then(() => {
        this.todos.push(this.todo);
        this.todo = { attributes: { title: '', completed: '', order: 0 } };
        this.fetchTodos();
      }, (error) => {
        console.log(error);
      });
    },
    removeTodo(todo) {
      this.$http.delete(`${API_BASE_URL}/api/v1/todos/${todo.id}`).then(() => {
        this.todos.$remove(todo);
      }, (error) => {
        console.log(error);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1 {
  color: #42b983;
}
.form-control {
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  color: #444;
  font-size: 14px;
}
.list-group {
  display: table;
  padding: 0;
  list-style: none;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 10px;
  width: 458px;
  .list-group-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    color: #999;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      .list-group-actions {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .list-group-actions {
    transition: all .5s ease-in-out;
    float:right;
    visibility: hidden;
    opacity: 0;
    a{
      font-weight: 700;
      font-size: 12px;
    }
  }
}
</style>
