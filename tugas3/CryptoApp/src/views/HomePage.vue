<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="container">
        <ion-button
          class="refresh-button"
          @click="loadCrypto"
          :disabled="loading"
        >
          <ion-spinner
            v-if="loading && cryptocurrencies.length > 0"
            name="crescent"
          />
          <span v-else>Refresh</span>
        </ion-button>

        <div
          v-if="loading && cryptocurrencies.length === 0"
          class="loading-container"
        >
          <ion-spinner name="crescent" />
          <p>Mengambil data cryptocurrency...</p>
        </div>

        <ion-text color="danger" v-if="errorMessage">
          <p class="error-message">{{ errorMessage }}</p>
        </ion-text>

        <div
          v-if="!loading && cryptocurrencies.length === 0 && !errorMessage"
          class="empty-message"
        >
          Data cryptocurrency tidak tersedia.
        </div>

        <div v-if="cryptocurrencies.length > 0" class="crypto-list">

          <CryptoCard
            v-for="coin in cryptocurrencies"
            :key="coin.id"
            :rank="coin.rank"
            :name="coin.name"
            :symbol="coin.symbol"
            :price="coin.price_usd"
          />

        </div>

        <p class="footer-text" v-if="cryptocurrencies.length > 0">
          Data bersumber dari CoinLore API.
        </p>

      </div>

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

import {
  IonPage,
  IonContent,
  IonButton,
  IonSpinner,
  IonText
} from '@ionic/vue';

import CryptoCard from '../components/CryptoCard.vue';

import {
  getCryptoData,
  type Cryptocurrency
} from '../services/cryptoService';

const cryptocurrencies = ref<Cryptocurrency[]>([]);

const loading = ref(false);

const errorMessage = ref('');

async function loadCrypto() {

  loading.value = true;
  errorMessage.value = '';

  try {

    const data = await getCryptoData();
    console.log('Data cryptocurrency berhasil diambil:', data);

    cryptocurrencies.value = data;

  } catch (error) {

    console.error('Error:', error);

    errorMessage.value =
      'Gagal mengambil data. Periksa koneksi internet dan coba kembali.';

  } finally {

    loading.value = false;

  }
}

onMounted(() => {
  loadCrypto();
});

</script>

<style scoped>


.container {
  width: 100%;
  max-width: none;
  margin: 0;
  margin-top: 48px;
  padding: 0;
}
.refresh-button {
  display: block;
  width: fit-content;
  margin: 0 auto 12px;

  --background: #0757d5;
  --background-hover: #0647ad;
  --border-radius: 5px;

  font-size: 12px;
  text-transform: none;
}

.crypto-list {
  width: 100%;
  background: #fff2c9;
  border-top: 1px solid #e5cc82;
  border-bottom: 1px solid #e5cc82;
  border-left: none;
  border-right: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  color: #555;
}

.error-message {
  text-align: center;
  font-size: 13px;
}

.empty-message {
  text-align: center;
  padding: 25px 0;
  color: #666;
}

.footer-text {
  text-align: center;
  padding: 10px 0;
  color: #666;
  font-size: 11px;
}

</style>
