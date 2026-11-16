<template>
  <ion-card class="crypto-card">
    <ion-card-content>
      <ion-grid>
        <ion-row class="ion-align-items-center">

     
          <ion-col size="2">
            <div class="label">Rank</div>
            <div class="rank-value">{{ rank }}</div>
          </ion-col>

          <ion-col size="5">
            <div class="label">{{ name }}</div>
            <div class="coin-symbol">{{ symbol }}</div>
          </ion-col>

  
          <ion-col size="5">
            <div class="label">USD</div>
            <div class="price-value">{{ formattedPrice }}</div>
          </ion-col>

        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue';

const props = defineProps<{
  rank: string | number;
  name: string;
  symbol: string;
  price: string | null;
}>();

const formattedPrice = computed(() => {
  if (props.price === null || props.price === '') {
    return 'N/A';
  }

  const value = Number(props.price);

  if (!Number.isFinite(value)) {
    return 'N/A';
  }

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });
});
</script>

<style scoped>

 .crypto-card {
  margin: 0;
  width: 100%;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid #e5cc82;
  background: #fff2c9;
}
.crypto-card ion-grid {
  padding: 0;
}

.crypto-card ion-card-content {
  padding: 5px 8px;
}

.label {
  font-size: 10px;
  color: #333;
  margin-bottom: 3px;
}

.rank-value {
  font-size: 16px;
  color: #111;
}

.coin-symbol {
  font-size: 16px;
  font-weight: 500;
  color: #111;
}

.price-value {
  font-size: 14px;
  color: #111;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}
</style>
