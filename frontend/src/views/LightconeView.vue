<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-black-lighten-2 mb-8">รายชื่อ Lightcone</h1>
      <v-row justify="center" align="center" class="mb-4">
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedPath"
            :items="['', 'Destruction', 'Preservation', 'Nihility', 'The Hunt', 'Harmony', 'Erudition', 'Abundance']"
            label="เลือกเส้นทาง"
            color="blue-lighten-2"
            variant="outlined"
            clearable
            @update:model-value="onPathChange" 
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" class="text-right">
          <v-btn
            color="blue-lighten-2"
            dark
            @click="createNewLightcone"
          >
            เพิ่ม Lightcone
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="lightcones.length > 0" class="lightcones" align="center" justify="center">
        <v-col
          v-for="lightcone in lightcones"
          :key="lightcone.LC_id"
          cols="12" sm="6" md="4" lg="3"
          class="d-flex justify-center"
        >
          <v-card
            color="grey-darken-3"
            class="lightcone-card pa-4 elevation-8 rounded-lg"
            max-width="300"
            @click="showLightconeDetail(lightcone.LC_id)"
          >
            <v-img
              :src="lightcone.LC_images || 'https://via.placeholder.com/300'"
              :alt="lightcone.LC_name || 'Lightcone'"
              aspect-ratio="1.5"
              class="rounded-lg mb-4 lightcone-image"
              max-height="200"
            ></v-img>
            <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2">
              {{ lightcone.LC_name || 'ไม่มีชื่อ' }}
            </v-card-title>
            <v-card-subtitle class="text-grey-lighten-2">
              <p>Path: {{ lightcone.LC_path || '-' }}</p>
              <p>Effect: {{ lightcone.LC_Effect || '-' }}</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                color="blue-lighten-2"
                dark
                @click.stop="editLightcone(lightcone.LC_id)"
              >
                แก้ไข
              </v-btn>
              <v-btn
                color="red"
                dark
                @click.stop="deleteLightcone(lightcone.LC_id)"
                class="ml-2"
              >
                ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else-if="!isLoading" class="justify-center">
        <v-col cols="12" class="text-center">
          <p class="text-h6 text-grey-lighten-2">ไม่มี Lightcone ในระบบ</p>
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
      <v-row v-if="lightcones.length > 0" class="justify-center mt-4">
        <v-col cols="12" class="text-center">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            color="blue-lighten-2"
            @update:model-value="fetchLightcones"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LightconeView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      lightcones: [],
      selectedPath: '', // เริ่มต้นเป็นค่าว่างเพื่อแสดงข้อมูลทั้งหมด
      currentPage: 1,
      limit: 12, // จำนวน Lightcone ต่อหน้า
      totalPages: 1,
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchLightcones();
  },
  methods: {
    async fetchLightcones() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:8800/api/v1/lightcones', {
          params: {
            LC_path: this.selectedPath || undefined, // ส่ง undefined ถ้าไม่มีเส้นทางเลือก
            page: this.currentPage,
            limit: this.limit,
          },
        });
        console.log('Fetching with LC_path:', this.selectedPath); // ดีบั๊ก
        console.log('API Response:', response.data); // ดีบั๊ก
        this.lightcones = response.data.lightcones || [];
        this.totalPages = response.data.totalPages || 1;
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Lightcone:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Lightcone ได้ กรุณาลองใหม่';
        this.lightcones = [];
      } finally {
        this.isLoading = false;
      }
    },
    onPathChange() {
      // รีเซ็ตหน้าเมื่อเปลี่ยนเส้นทาง และเรียก fetchLightcones
      this.currentPage = 1;
      this.fetchLightcones();
    },
    showLightconeDetail(lightconeId) {
      this.router.push(`/lightcone/${lightconeId}`);
    },
    editLightcone(lightconeId) {
      this.router.push(`/lightcone/${lightconeId}/edit`);
    },
    createNewLightcone() {
      this.router.push('/lightcone/create');
    },
    async deleteLightcone(lightconeId) {
      if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Lightcone นี้?')) {
        try {
          await axios.delete(`http://localhost:8800/api/v1/lightcone/${lightconeId}`);
          this.fetchLightcones(); // อัพเดทรายการหลังจากลบ
          alert('ลบ Lightcone สำเร็จ!');
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการลบ Lightcone:', error);
          alert('ไม่สามารถลบ Lightcone ได้ กรุณาลองใหม่');
        }
      }
    },
  },
};
</script>

<style scoped>
.lightcone-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer; /* ชี้เคอร์เซอร์เป็นมือเมื่อ hover */
}

.lightcone-card:hover {
  transform: scale(1.05); /* ขยายเมื่อ hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* เพิ่มเงาเมื่อ hover */
}

.lightcone-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}

.lightcones {
  gap: 20px; /* ระยะห่างระหว่างการ์ด */
}
</style>