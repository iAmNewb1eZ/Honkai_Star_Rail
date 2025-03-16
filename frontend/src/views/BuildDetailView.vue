<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8">รายละเอียด Build</h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6" v-if="recommendation">
        <v-card-text>
          <h2 class="text-h5 font-weight-bold text-blue-lighten-2 mb-2">{{ recommendation.RC_name || 'Build ไม่มีชื่อ' }}</h2>
          <v-img
            :src="recommendation.character?.C_images || 'https://via.placeholder.com/300'"
            :alt="recommendation.character?.C_name || 'ตัวละคร'"
            aspect-ratio="1.5"
            class="rounded-lg mb-4 character-image"
            max-height="300"
          ></v-img>
          <p><strong>ตัวละคร:</strong> {{ recommendation.character?.C_name || '-' }}</p>
          <p><strong>Path:</strong> {{ recommendation.character?.C_path || '-' }}</p>
          <p><strong>Element:</strong> {{ recommendation.character?.C_element || '-' }}</p>
          <p><strong>Role:</strong> {{ recommendation.character?.C_role || '-' }}</p>

          <v-divider class="my-4"></v-divider>

          <v-img
            :src="recommendation.lightcone?.LC_images || 'https://via.placeholder.com/300'"
            :alt="recommendation.lightcone?.LC_name || 'Lightcone'"
            aspect-ratio="1.5"
            class="rounded-lg mb-4 lightcone-image"
            max-height="200"
          ></v-img>
          <p><strong>Lightcone:</strong> {{ recommendation.lightcone?.LC_name || '-' }}</p>
          <p><strong>Effect Lightcone:</strong> {{ recommendation.lightcone?.LC_Effect || '-' }}</p>

          <v-divider class="my-4"></v-divider>

          <p><strong>Relic Set:</strong> {{ recommendation.relic_set?.R_name || '-' }}</p>
          <p><strong>Effect Relic (2 ชิ้น):</strong> {{ recommendation.relic_set?.R_Effect_2 || '-' }}</p>
          <p><strong>Effect Relic (4 ชิ้น):</strong> {{ recommendation.relic_set?.R_Effect_4 || '-' }}</p>

          <v-btn
            color="grey"
            dark
            @click="goBack"
            class="mt-4"
          >
            กลับ
          </v-btn>
          <v-btn
            color="red"
            dark
            @click="deleteBuild"
            class="mt-4 ml-4"
          >
            ลบ
          </v-btn>
        </v-card-text>
      </v-card>
      <v-row v-else-if="!isLoading" class="justify-center">
        <v-col cols="12" class="text-center">
          <p class="text-h6 text-grey-lighten-2">ไม่พบ Build นี้ในระบบ</p>
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
  name: 'BuildDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  data() {
    return {
      recommendation: null,
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchRecommendation();
  },
  methods: {
    async fetchRecommendation() {
      const recommendationId = this.route.params.id;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:8800/api/v1/recommendation/${recommendationId}`);
        this.recommendation = response.data;
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Build:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Build ได้ กรุณาลองใหม่';
        this.recommendation = null;
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.router.push('/builds');
    },
    async deleteBuild() {
      if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Build นี้?')) {
        try {
          await axios.delete(`http://localhost:8800/api/v1/recommendation/${this.route.params.id}`);
          alert('ลบ Build สำเร็จ!');
          this.router.push('/builds'); // กลับไปหน้า BuildList หลังลบ
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการลบ Build:', error);
          alert('ไม่สามารถลบ Build ได้ กรุณาลองใหม่');
        }
      }
    },
  },
};
</script>

<style scoped>
.character-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}

.lightcone-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}
</style>