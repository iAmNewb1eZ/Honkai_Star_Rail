<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8">รายละเอียด Lightcone</h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6" v-if="lightcone">
        <v-card-text>
          <v-img
            :src="lightcone.LC_images || 'https://via.placeholder.com/300'"
            :alt="lightcone.LC_name || 'Lightcone'"
            aspect-ratio="1.5"
            class="rounded-lg mb-4 lightcone-image"
            max-height="300"
          ></v-img>
          <h2 class="text-h5 font-weight-bold text-blue-lighten-2 mb-2">{{ lightcone.LC_name || 'ไม่มีชื่อ' }}</h2>
          <p><strong>Path:</strong> {{ lightcone.LC_path || '-' }}</p>
          <p><strong>Effect:</strong> {{ lightcone.LC_Effect || '-' }}</p>
          <p><strong>Rarelity:</strong> {{ lightcone.LC_rarelity === 'FIVE' ? '5' : lightcone.LC_rarelity === 'FOUR' ? '4' : '-' }}</p>
          <v-btn
            color="grey"
            dark
            @click="goBack"
            class="mt-4"
          >
            กลับ
          </v-btn>
          <v-btn
            color="blue-lighten-2"
            dark
            @click="editLightcone"
            class="mt-4 ml-4"
          >
            แก้ไข
          </v-btn>
        </v-card-text>
      </v-card>
      <v-row v-else-if="!isLoading" class="justify-center">
        <v-col cols="12" class="text-center">
          <p class="text-h6 text-grey-lighten-2">ไม่พบ Lightcone นี้ในระบบ</p>
        </v-col>
      </v-row>
      <v-row v-if="isLoading" class="justify-center">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="blue-lighten-2"
            size="50"
          ></v-progress-circular>
          <p class="text-h6 text-grey-lighten-2 mt-2">กำลังโหลดข้อมูล...</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'LightconeDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  data() {
    return {
      lightcone: null,
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchLightcone();
  },
  methods: {
    async fetchLightcone() {
      const lightconeId = this.route.params.id;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:8800/api/v1/lightcone/${lightconeId}`);
        this.lightcone = response.data;
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Lightcone:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Lightcone ได้ กรุณาลองใหม่';
        this.lightcone = null;
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.router.push('/lightcones');
    },
    editLightcone() {
      this.router.push(`/lightcone/${this.route.params.id}/edit`);
    },
  },
};
</script>

<style scoped>
.lightcone-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}
</style>