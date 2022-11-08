<template>

  <div class="vueCont">

    <div class="todoApp">
      <h1>todos</h1>
      <div class="text-end">
        <button class="btn btn-primary button-81" @click="undo()" v-show="canUndo">Undo</button>
      </div>
      <form id="form">
        <input
            type="text"
            id="input"
            class="input"
            placeholder="Enter your todo"
            autocomplete="off"
            v-model="title"
        />
        <ul class="todos" id="todos">
          <li
              v-for="(todo,ix) in todoArr"
              :key="ix"
              :class="{ completed: todo.complete }">
            <span @click="clickTodo(todo)" style="display: inline-block">
              {{ todo.title }}
            </span>
            <button
                class="button-delete"
                type="button"
                @click="removeTodo(ix)">
              X
            </button>
          </li>
        </ul>
      </form>
      <small>
        Left click to toggle complete.<br/>
      </small>
    </div>
  </div>
</template>

<script>

import {AddCommand, CommandHandler, CompleteCommand, Historico, RemoveCommand} from "@/modelo";

const handler = new CommandHandler()
let todoData = Historico.restoreData()

export default {
  name: "TodosApp",
  data() {
    return {
      todoArr: [],
      title: '',
      canUndo: false,
    };
  },
  methods: {
    clickTodo(todo) {
      handler.add(new CompleteCommand(todo))
      console.log('click')
      this.updateState()
    },
    updateState() {
      this.canUndo = handler.canUndo()
      Historico.saveTodos(todoData)
      Historico.notify(handler.infoList())
    },
    addTodo() {
      console.log('add')
      if (!this.title)
        return;
      handler.add(new AddCommand(this.todoArr, this.title))
      this.title = ''
      this.updateState()
    },
    undo() {
      console.log('undo')
      handler.undo();
      this.updateState()
    },
    removeTodo(index) {
      handler.add(new RemoveCommand(this.todoArr, index))
      this.updateState()
    },
  },
  mounted() {
    $('#form').submit(e => {
      this.addTodo();
      return false;
    });

    this.todoArr = todoData.lista
  },
}
</script>

<style scoped>
.vueCont {
  width: 100%;
  color: #444;
  font-family: "Poppins", sans-serif;
  margin: 0;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoApp {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  color: rgb(131, 172, 226);
  font-size: 9rem;
  text-align: center;
  opacity: 0.4;
  margin: 10px 0 10px 0;
}

form {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 400px;
}

.input {
  border: none;
  color: #444;
  font-size: 2rem;
  padding: 1rem 2rem;
  display: block;
  width: 84%;
}

.input::placeholder {
  color: #d5d5d5;
}

.todos {
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style-type: none;
  height: auto;
  max-height: 300px;
  overflow-y: scroll;
  width: 100%;
}

.todos::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgb(245, 245, 245, 0);
}

.todos::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0, 0, 0, 0);
}

.todos::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(36, 63, 99);
}

.todos li {
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  position: relative;
}

.button-delete {
  background-color: rgba(0, 0, 0, 0);
  color: #b5b5b5;
  position: absolute;
  border: 0;
  left: 90%;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.todos li.completed span {
  color: #b6b6b6;
  text-decoration: line-through;
}

small {
  color: #b5b5b5;
  margin-top: 3rem;
  text-align: center;
}

@media only screen and (min-width: 1920px) {
  .contViewApp {
    top: 100px;
  }
}
</style>