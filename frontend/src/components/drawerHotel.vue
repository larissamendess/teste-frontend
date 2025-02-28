<template>
  <q-layout>
    <div
      v-if="showDrawer"
      class="drawer-backdrop"
      @click="showDrawer = false"
    ></div>
    <q-drawer
      :width="800"
      :model-value="showDrawer"
      side="right"
      overlay
      elevated
      @update:model-value="$emit('update:showDrawer', $event)"
    >
      <q-card class="q-pa-md full-height relative">
        <q-card-section>
          <div v-if="hotel">
            <span class="nota-avaliacao text-weight-bold q-mr-xs">{{
              hotel.stars
            }}</span>
            <q-icon
              v-for="n in Number(hotel.stars)"
              :key="n"
              name="star"
              color="yellow"
            />
            <h3 class="name-hotel q-mb-none q-mt-none q-mb-sm">
              {{ hotel.name }}
            </h3>
            <p class="address-hotel text-grey-8">
              {{ hotel.address.fullAddress }}
            </p>
            <q-carousel
              v-if="hotel"
              v-model="slides[hotel.id]"
              swipeable
              animated
              control-color="white"
              navigation
              padding
              arrows
              class="hotel-carousel"
            >
              <q-carousel-slide
                v-for="(img, index) in hotel.images"
                :key="index"
                :name="index"
                :img-src="img"
              />
            </q-carousel>

            <p class="title-facilidades text-h6">Facilidades do Hotel</p>
            <div class="facilidades-hotel flex column">
              <div class="amenities-hotel q-mb-sm q-ml-sm q-pb-sm">
                <ul class="flex q-pl-none q-mb-none row justify-around">
                  <li
                    v-for="(amenity, index) in hotel.amenities"
                    :key="index"
                    style="list-style-type: none"
                    class="q-mr-sm"
                  >
                    <q-icon
                      :name="getIcon(amenity.key)"
                      size="16px"
                      class="q-mr-xs text-grey-8"
                    />
                    {{ amenity.label }}
                  </li>
                </ul>
              </div>
              <q-btn
                v-if="hotel.amenities?.length > 3"
                class="btn-more text-weight-bold"
                :label="
                  mostrarTodas
                    ? 'Mostrar menos'
                    : 'Mostrar todas as facilidades'
                "
                style="color: rgba(3, 138, 255)"
                @click="mostrarTodas = !mostrarTodas"
              />
              <p v-else-if="!hotel.amenities || hotel.amenities.length === 0">
                Não há facilidades nessa hospedagem.
              </p>
            </div>
          </div>

          <div v-if="hotel && hotel?.description" class="description q-pa-md">
            <p class="text-h6">Conheça um pouco mais</p>

            <span class="description-hotel text-grey-7 text-h9">{{
              hotel.description
            }}</span>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            class="btn-close"
            label="x"
            style="color: rgba(3, 138, 255)"
            @click="$emit('update:showDrawer', false)"
          />
        </q-card-actions>
      </q-card>
    </q-drawer>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from "vue";

const { hotel } = defineProps({
  showDrawer: Boolean,
  hotel: Object,
});

const slides = ref({});
const mostrarTodas = ref(false);

defineEmits(["update:showDrawer"]);
watchEffect(() => {
  if (hotel && hotel.id) {
    if (!(hotel.id in slides.value)) {
      slides.value[hotel.id] = 0;
    }
  }
});

const getIcon = (key) => {
  const iconMap = {
    WI_FI: "wifi",
    POOL: "pool",
    PETS: "pets",
    PUB: "local_bar",
    RESTAURANT: "restaurant",
    ROOM_SERVICE: "room_service",
    BREAKFAST: "free_breakfast",
  };

  return iconMap[key] || "help";
};
</script>

<style scoped>
.q-card {
  height: auto !important;
  overflow: hidden !important;
}
.q-card__actions {
  position: absolute;
  top: 0;
  right: 0;
}
.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
.facilidades-hotel,
.title-facilidades {
  border-bottom: 2px solid #61616161;
  padding-bottom: 30px;
  margin-top: 20px;
}
.facilidades-hotel .q-btn {
  width: 80%;
  margin: 0 auto;
}
.btn-more {
  border: 1px solid rgba(3, 138, 255);
  border-radius: 40px;
}
.q-carousel__control {
  overflow: hidden !important;
}
</style>
