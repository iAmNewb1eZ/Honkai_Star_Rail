<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8">แก้ไข Lightcone</h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6">
        <v-card-text>
          <v-form @submit.prevent="updateLightcone" ref="editForm">
            <v-text-field
              v-model="lightcone.LC_name"
              label="ชื่อ Lightcone"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="lightcone.LC_path"
              :items="['Destruction', 'Preservation', 'Nihility', 'The Hunt', 'Harmony', 'Erudition', 'Abundance']"
              label="เส้นทาง"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-select>

            <v-textarea
              v-model="lightcone.LC_Effect"
              label="ผลพิเศษ"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-textarea>

            <v-text-field
              v-model="lightcone.LC_images"
              label="URL หรือ Path ของภาพ"
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="lightcone.LC_rarelity"
              :items="['FIVE', 'FOUR']"
              label="ความหายาก"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-select>

            <v-btn
              color="blue-lighten-2"
              dark
              type="submit"
              :loading="isLoading"
              class="mt-4"
            >
              อัพเดท Lightcone
            </v-btn>

            <v-btn
              color="grey"
              dark
              @click="cancelEdit"
              class="mt-4 ml-4"
            >
              ยกเลิก
            </v-btn>

            <v-alert v-if="success" type="success" class="mt-4">อัพเดท Lightcone สำเร็จ!</v-alert>
            <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'LightconeEditView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  data() {
    return {
      lightcone: {
        LC_id: '',
        LC_name: '',
        LC_path: '',
        LC_Effect: '',
        LC_images: '',
        LC_rarelity: '',
      },
      isLoading: false,
      success: false,
      error: null,
    };
  },
  mounted() {
    this.fetchLightcone();
  },
  methods: {
    async fetchLightcone() {
      const lightconeId = this.route.params.id;
      try {
        const response = await axios.get(`http://localhost:8800/api/v1/lightcone/${lightconeId}`);
        this.lightcone = response.data;
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Lightcone:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Lightcone ได้ กรุณาลองใหม่';
      }
    },
    async updateLightcone() {
      this.isLoading = true;
      this.success = false;
      this.error = null;
      try {
        await axios.put(`http://localhost:8800/api/v1/lightcone/${this.route.params.id}`, this.lightcone);
        this.success = true;
        setTimeout(() => this.router.push('/lightcones'), 2000); // กลับไปหน้า Lightcone หลัง 2 วินาที
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัพเดท Lightcone:', error);
        this.error = 'ไม่สามารถอัพเดท Lightcone ได้ กรุณาลองใหม่';
      } finally {
        this.isLoading = false;
      }
    },
    cancelEdit() {
      this.router.push('/lightcones');
    },
  },
};
</script>

<style scoped>
/* ไม่ต้องเพิ่มสไตล์เพิ่มเติม */
</style>