
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Cuaca Jakarta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Prakiraan Temperatur
          </ion-card-title>
          <ion-card-subtitle>
            Jakarta, Indonesia · WIB
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Data suhu per jam dari Open-Meteo API.
          <p v-if="lastUpdated" class="updated">
            Diperbarui: {{ lastUpdated }}
          </p>

          <ion-button
            expand="block"
            @click="fetchWeather"
            :disabled="loading"
          >
            Muat Ulang Data
          </ion-button>
        </ion-card-content>
      </ion-card>

      <div v-if="loading" class="status">
        <ion-spinner name="crescent" />
        <p>Mengambil data cuaca...</p>
      </div>

      <ion-card v-else-if="errorMessage">
        <ion-card-content>
          <ion-text color="danger">
            {{ errorMessage }}
          </ion-text>
          <p>Periksa koneksi internet, lalu coba lagi.</p>
          <ion-button @click="fetchWeather">
            Coba Lagi
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-list v-else>
        <ion-item>
          <ion-label>
            <strong>Waktu Pengukuran</strong>
          </ion-label>
          <ion-note slot="end">
            <strong>Suhu (°C)</strong>
          </ion-note>
        </ion-item>

        <ion-item v-for="item in weatherData" :key="item.time">
          <ion-label>
            {{ formatTime(item.time) }}
          </ion-label>
          <ion-note slot="end" color="dark">
            {{ item.temperature.toFixed(1) }} °C
          </ion-note>
        </ion-item>
      </ion-list>
      <ion-card
  v-if="!loading && !errorMessage && weatherData.length === 0"
>
  <ion-card-content>
    Tidak ada data temperatur yang tersedia.
  </ion-card-content>
</ion-card>

      <p v-if="!loading && !errorMessage && weatherData.length"
         class="footer-note">
        Menampilkan {{ weatherData.length }} data temperatur per jam.
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  IonText,
} from '@ionic/vue';

import {
  getWeather,
  type WeatherItem,
} from '@/services/weatherService';

const weatherData = ref<WeatherItem[]>([]);
const loading = ref(false);
const errorMessage = ref('');
const lastUpdated = ref('');

async function fetchWeather(): Promise<void> {
  loading.value = true;
  errorMessage.value = '';

  try {
    weatherData.value = await getWeather();

    lastUpdated.value = new Date().toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    });
  } catch (error: unknown) {
    console.error('Gagal mengambil data cuaca:', error);

    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan yang tidak diketahui.';
  } finally {
    loading.value = false;
  }
}

function formatTime(time: string): string {
  const date = new Date(time);

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
}

onMounted(() => {
  void fetchWeather();
});
</script>

<style scoped>
.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
}

.updated {
  margin-top: 12px;
  font-size: 12px;
  color: var(--ion-color-medium);
}

.footer-note {
  margin: 16px 8px;
  font-size: 12px;
  color: var(--ion-color-medium);
  text-align: center;
}
</style>
