<template>

  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">

        <div class="cardCont">

          <TodosApp></TodosApp>
        </div>

      </div>
      <div class="col-sm-6">
        <div class="cardCont">
          <historicos></historicos>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodosApp from "@/components/TodosApp";
import Historicos from "@/components/Historicos";

export default {
  name: 'App',
  components: {
    Historicos,
    TodosApp
  }
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
