<template>
  <q-card class="search-hotel q-pa-md q-mx-auto" style="width: 90%">
    <h1 class="title-main text-h4 blue-grey-10">Reservar Hotel</h1>

    <q-form @submit.prevent="alterarBusca">
      <h2 class="title-destination text-subtitle1 blue-grey-9">
        Destino
        <span class="text-red">*</span>
      </h2>

      <q-input
        class="input-customized"
        bg-color="white"
        bordered
        v-model="destino"
        hide-bottom-space
        hide-hint
        label=""
        filled
        clearable
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />
      <div class="button-busca">
        <q-btn
          :label="destino ? 'Alterar busca' : 'Buscar'"
          type="submit"
          color="brand"
          class="q-mt-md"
        />
      </div>
    </q-form>

    <!-- LISTA DE CARDS -->
    <TheWelcome
      :dataCity="cidadeEncontrada"
      :dataHotel="hoteisEncontrados"
      :destination="destino"
    />
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import hoteisData from "../data/hoteis.json";
import cidadesData from "../data/place.json";
import TheWelcome from "./listHotel.vue";

const { dataCity, dataHotel, destination } = defineProps({
  dataCity: Object,
  dataHotel: Array,
  destination: String,
});

const destino = ref("");

const cidadeEncontrada = ref(null);
const hoteisEncontrados = ref([]);

class Cidade {
  constructor(name, state, placeId) {
    this.name = name;
    this.state = state;
    this.placeId = placeId;
  }
}

class Hotel {
  constructor({
    id,
    favorite,
    name,
    description,
    stars,
    thumb,
    amenities,
    hasBreakFast,
    hasRefundableRoom,
    hasAgreement,
    nonRefundable,
    address,
    images,
    deals,
    roomsQuantity,
    price,
  }) {
    this.id = id;
    this.favorite = favorite;
    this.name = name;
    this.description = description;
    this.stars = stars;
    this.thumb = thumb;
    this.amenities = amenities;
    this.hasBreakFast = hasBreakFast;
    this.hasRefundableRoom = hasRefundableRoom;
    this.hasAgreement = hasAgreement;
    this.nonRefundable = nonRefundable;
    this.address = address;
    this.images = images;
    this.deals = deals;
    this.roomsQuantity = roomsQuantity;
    this.price = price;
  }
}

const cidades = cidadesData.map(
  (cidade) => new Cidade(cidade.name, cidade.state, cidade.placeId)
);

const hoteis = hoteisData.map((h) => ({
  placeId: h.placeId,
  hotels: h.hotels.map((hotel) => new Hotel(hotel)),
}));

const buscarHoteis = () => {
  const cidadeDigitada = destino.value.split(",")[0].trim();
  cidadeEncontrada.value = cidades.find(
    (cidade) => cidade.name.toLowerCase() === cidadeDigitada.toLowerCase()
  );

  if (cidadeEncontrada.value) {
    const placeId = cidadeEncontrada.value.placeId;
    const dadosHoteis = hoteis.find((h) => h.placeId === placeId);
    hoteisEncontrados.value = dadosHoteis ? dadosHoteis.hotels : [];
  } else {
    hoteisEncontrados.value = [];
  }
};

const alterarBusca = () => {
  buscarHoteis();
};
</script>

<style scoped>
.q-card {
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

::v-deep(.input-customized .q-field__control) {
  border: 2px solid #e0e0e0 !important;
  border-radius: 8px;
  background-color: white !important;
}
::v-deep(.q-field__native) {
  padding: 0 !important;
}
.button-busca {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  border-radius: 50px;
}
.button-busca .q-btn {
  width: 150px;
  border-radius: 50px;
}
.bg-brand {
  background: rgba(3, 138, 255) !important;
}
</style>
