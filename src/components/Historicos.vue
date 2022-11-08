<template>

  <h3 class="text-center">Command queue</h3>

  <div style="max-height: 500px; overflow: auto">
    <table class="table table-condensed">
      <tbody>
      <tr v-for="(l, ix) in lista" :key="ix">
        <td>{{ l }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {Historico} from "@/modelo";

export default {
  name: "Historicos",
  data() {
    return {
      lista: {}
    }
  },
  created() {
    let self = this;
    Historico.updateEvent = function (comandos) {
      self.lista = comandos
      self.$forceUpdate()
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>