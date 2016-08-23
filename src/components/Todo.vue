<template>
  <div class="todo">
    <h1>Task list with Vue.js! ;-)</h1>
    <input type="text" v-model="todo.title" class="form-control" placeholder="Remember me to..." style="width: 258px">
    <select v-model="todo.order" class="form-control" style="width: 100px">
      <option value="" selected>Priority</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button v-on:click="addTodo" class="form-control">Submit</button>
    <ul class="list-group" v-if="todos.length > 0">
      <li v-for="todo in todos" track-by="$index" class="list-group-item">
        {{ todo.title }}
        <span class="list-group-actions">
          <!-- <a href="javascript:void(0);" v-on:click="editTodo(todo.id)">edit</a> -->
          <a href="javascript:void(0);" v-on:click="removeTodo(todo)" title="Remove {{todo.id}}">remove</a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: { title: '', completed: '', order: '' },
      todos: [],
    };
  },
  ready() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      this.$http.get('/api/v1/todos').then((response) => {
        // success callback
        this.$set('todos', response.data.todos);
      }, (response) => {
        // error callback
        console.log(response);
      });
    },
    addTodo() {
      this.$http.post('/api/v1/todos', this.todo).then(() => {
        // success callback
        this.todos.push(this.todo);
        this.todo = { title: '', completed: '', order: '' };
        this.fetchTodos();
      }, (response) => {
        // error callback
        console.log(response);
      });
    },
    editTodo(index) {
      console.log(index);
      // Edit index
    },
    removeTodo(todo) {
      this.$http.delete(`/api/v1/todos/${todo.id}`).then(() => {
        this.todos.$remove(todo);
      }, (response) => {
        console.log(response);
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
