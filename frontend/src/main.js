import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css'; // Garante que o CSS do Quasar está carregado

const app = createApp(App);

app.use(Quasar); // Aqui você registra o Quasar corretamente

app.mount('#app');
