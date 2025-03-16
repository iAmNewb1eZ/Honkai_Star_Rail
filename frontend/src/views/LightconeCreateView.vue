<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8">เพิ่ม Lightcone ใหม่</h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6">
        <v-card-text>
          <v-form @submit.prevent="createLightcone" ref="createForm">
            <v-text-field
              v-model="newLightcone.LC_id"
              label="ID Lightcone (เช่น LC001)"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="newLightcone.LC_name"
              label="ชื่อ Lightcone"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="newLightcone.LC_path"
              :items="['Destruction', 'Preservation', 'Nihility', 'The Hunt', 'Harmony', 'Erudition', 'Abundance']"
              label="เส้นทาง"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-select>

            <v-textarea
              v-model="newLightcone.LC_Effect"
              label="ผลพิเศษ"
              color="blue-lighten-2"
              variant="outlined"
              required
              class="mb-4"
            ></v-textarea>

            <v-text-field
              v-model="newLightcone.LC_images"
              label="URL หรือ Path ของภาพ (เช่น images/lightcone.jpg)"
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="newLightcone.LC_rarelity"
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
              สร้าง Lightcone
            </v-btn>

            <v-btn
              color="grey"
              dark
              @click="cancelCreate"
              class="mt-4 ml-4"
            >
              ยกเลิก
            </v-btn>

            <v-alert v-if="success" type="success" class="mt-4">สร้าง Lightcone สำเร็จ!</v-alert>
            <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LightconeCreateView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      newLightcone: {
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
  methods: {
    async createLightcone() {
      this.isLoading = true;
      this.success = false;
      this.error = null;
      try {
        await axios.post('http://localhost:8800/api/v1/lightcone', this.newLightcone);
        this.success = true;
        setTimeout(() => this.router.push('/lightcones'), 2000); // กลับไปหน้า Lightcone หลัง 2 วินาที
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสร้าง Lightcone:', error);
        this.error = 'ไม่สามารถสร้าง Lightcone ได้ กรุณาลองใหม่';
      } finally {
        this.isLoading = false;
      }
    },
    cancelCreate() {
      this.router.push('/lightcones');
    },
  },
};
</script>

<style scoped>
/* ไม่ต้องเพิ่มสไตล์เพิ่มเติม */
</style>