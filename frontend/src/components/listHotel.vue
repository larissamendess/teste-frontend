<template>
  <q-layout>
    <q-page-container>
      <div class="filtros q-mb-md flex justify-end">
        <!-- FILTRO RECOMENDADOS E MELHOR AVALIADOS -->
        <q-btn-dropdown
          flat
          dense
          color="primary"
          no-caps
          dropdown-icon="arrow_drop_down"
        >
          <template v-slot:label>
            <span class="text-grey-7">Organizar por</span>
            <span class="text-primary text-weight-bold"
              >&nbsp;{{ filtroSelecionadoLabel }}</span
            >
          </template>

          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="filtroSelecionado = 'recomendados'"
            >
              <q-item-section>Mais Recomendados</q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="filtroSelecionado = 'maiorAvaliacao'"
            >
              <q-item-section>Melhor Avaliados</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <!-- CARDS DA LISTA DE HOTEIS -->
      <div class="card-hotel" v-if="dataHotel.length">
        <q-card
          v-for="hotel in hoteisFiltrados"
          :key="hotel.id"
          class="row q-pa-md q-mb-md hotel-card"
        >
          <div class="carrosel-hotel col-md-4 col-12">
            <q-carousel
              v-model="slides[hotel.id]"
              swipeable
              animated
              control-color="white"
              navigation
              padding
              arrows
              class="hotel-carousel overflow-hidden"
            >
              <q-carousel-slide
                v-for="(img, index) in hotel.images"
                :key="index"
                :name="index"
                :img-src="img"
              />
            </q-carousel>
          </div>

          <div class="infos-hotel col-md-5 col-12 q-pl-md">
            <p class="name-hotel q-mt-none text-h5">{{ hotel.name }}</p>
            <p class="endereco-hotel text-grey-7">
              {{ hotel.address.fullAddress }}
            </p>

            <div class="icons-hotel row items-center q-mb-sm">
              <span class="nota-avaliacao q-mr-xs text-grey-7">{{
                hotel.stars
              }}</span>
              <q-icon
                v-for="n in Number(hotel.stars)"
                :key="n"
                name="star"
                color="yellow"
                class=""
              />
              <span class="text-grey-7 q-ml-sm"> | </span>

              <div class="amenities-hotel q-mb-sm q-ml-sm q-pb-sm">
                <ul class="flex q-pl-none q-mb-none">
                  <li
                    v-for="(amenity, index) in hotel.amenities"
                    :key="index"
                    style="list-style-type: none"
                  >
                    <q-icon
                      :name="getIcon(amenity.key)"
                      size="16px"
                      class="q-mr-xs text-grey-8"
                    />
                  </li>
                </ul>
              </div>
            </div>

            <q-badge
              v-if="hotel.hasRefundableRoom"
              class="tag-hotel"
              color="grey q-pa-sm"
              text-color="white"
              label="Reembolsável"
            />
          </div>

          <div class="value-hotel col-md-3 col-12 text-right">
            <div class="infos-value-hotel flex column items-start q-pl-md">
              <p class="text-grey-7 text-caption q-mb-none">A partir de:</p>
              <p class="text-h5 text-grey-9">
                {{ formatPrice(hotel.price) }}
              </p>
              <div>
                <p class="text-grey-7 text-caption flex q-mb-none">
                  {{ formatPrice(hotel.price) }}/noite
                </p>
                <p class="text-grey-7 text-caption">Impostos inclusos</p>
              </div>
            </div>
            <div class="botao flex">
              <q-btn
                class="botao-selecionar full-width"
                label="Selecionar"
                color="brand"
                @click="abrirDrawer(hotel)"
              />
            </div>
          </div>
        </q-card>
      </div>
      <p v-if="dataHotel.length === 0 && dataCity">
        Nenhum hotel encontrado para esta cidade.
      </p>
      <p v-else-if="dataHotel.length === 0 && destination">
        Cidade não encontrada.
      </p>
      <p v-else-if="hoteisExibidos" class="text-center q-mt-md text-grey-7">
        Todos os hotéis foram carregados.
      </p>
    </q-page-container>

    <!-- DRAWER COM INFORMACOES HOTEL -->
    <DrawerHotel v-model:showDrawer="showDrawer" :hotel="hotelSelecionado" />
  </q-layout>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from "vue";
import DrawerHotel from "./drawerHotel.vue";

const { dataHotel } = defineProps({
  dataCity: Object,
  dataHotel: Array,
  destination: String,
});

const slides = ref({});
const quantidadeExibida = ref(10);
const showDrawer = ref(false);
const hotelSelecionado = ref(null);
const filtroSelecionado = ref("recomendados");

const formatPrice = (price) => {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const abrirDrawer = (hotel) => {
  hotelSelecionado.value = hotel;
  showDrawer.value = true;
};
const carregarMaisHoteis = () => {
  quantidadeExibida.value += 10;
};

const getIcon = (key) => {
  const iconMap = {
    WI_FI: "wifi",
    POOL: "pool",
    PETS: "pets",
    PUB: "local_bar",
    RESTAURANT: "restaurant",
    ROOM_SERVICE: "room_service",
    MEETING_ROOM: "meeting_room",
    BREAKFAST: "free_breakfast",
    LAUNDRY: "local_laundry_service",
    PARKING: "local_parking",
    FITNESS_CENTER: "fitness_center",
    AIR_CONDITIONING: "ac_unit",
    STEAM_ROOM: "spa",
  };

  return iconMap[key] || "help";
};

const filtroSelecionadoLabel = computed(() => {
  return filtroSelecionado.value === "recomendados"
    ? "Recomendados"
    : "Melhor Avaliados";
});

const hoteisFiltrados = computed(() => {
  const listaOrdenada = [...dataHotel].sort((a, b) => {
    if (filtroSelecionado.value === "recomendados") {
      return a.price !== b.price ? a.price - b.price : b.stars - a.stars;
    }
    return b.stars - a.stars;
  });

  return listaOrdenada.slice(0, quantidadeExibida.value);
});

watchEffect(() => {
  if (dataHotel) {
    dataHotel.forEach((hotel) => {
      if (!(hotel.id in slides.value)) {
        slides.value[hotel.id] = 0;
      }
    });
  }
});

onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollTop = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop >= documentHeight - 100) {
      carregarMaisHoteis();
    }
  });
});

const hoteisExibidos = computed(() => {
  return (
    Array.isArray(dataHotel) &&
    dataHotel.length > 0 &&
    quantidadeExibida.value >= dataHotel.length
  );
});
</script>

<style scoped>
.hotel-card {
  display: flex;
  border-radius: 8px;
}

.hotel-carousel {
  border-radius: 8px;
  height: 300px;
}

.botao-selecionar {
  border-radius: 100px;
  width: 50% !important;
}

.name-hotel {
  max-width: 300px;
}

.bg-brand {
  background: rgba(3, 138, 255) !important;
}

.value-hotel {
  border-left: 1px solid #61616161 !important;
  padding-left: 10px;
}

.q-carousel,
.q-carousel__slides,
.q-carousel__slide {
  overflow: hidden !important;
}
</style>
