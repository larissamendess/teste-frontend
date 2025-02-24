<script setup>
import { ref } from 'vue';

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const destino = ref("Belo Horizonte, MG");

const alterarBusca = () => {
  console.log("Busca alterada para:", destino.value);
};
</script>

<template>
  <q-card class="q-pa-md q-mx-auto" style="width: 90%;">
    <q-form @submit.prevent="alterarBusca">
      <q-input 
        v-model="destino" 
        label="Destino" 
        filled 
        clearable
        :rules="[val => !!val || 'Campo obrigatório']"
      />
      <q-btn 
        label="Alterar busca" 
        type="submit" 
        color="primary" 
        class="q-mt-md full-width"
      />
    </q-form>
  </q-card>
</template>

<style scoped>
.q-card {
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
