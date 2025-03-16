<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-black-lighten-2 mb-8">รายการ Build ทั้งหมด</h1>
      <v-row v-if="recommendations.length > 0" class="builds" align="center" justify="center">
        <v-col
          v-for="recommendation in recommendations"
          :key="recommendation.RC_id"
          cols="12" sm="6" md="4" lg="3"
          class="d-flex justify-center"
        >
          <v-card
            color="grey-darken-3"
            class="build-card pa-4 elevation-8 rounded-lg"
            max-width="300"
            @click="showBuildDetail(recommendation.RC_id)"
          >
            <v-img
              :src="recommendation.character?.C_images || 'https://via.placeholder.com/300'"
              :alt="recommendation.character?.C_name || 'ตัวละคร'"
              aspect-ratio="1.5"
              class="rounded-lg mb-4 character-image"
              max-height="200"
            ></v-img>
            <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2">
              {{ recommendation.RC_name || 'Build ไม่มีชื่อ' }}
            </v-card-title>
            <v-card-subtitle class="text-grey-lighten-2">
              <p><strong>ตัวละคร:</strong> {{ recommendation.character?.C_name || '-' }}</p>
              <p><strong>Lightcone:</strong> {{ recommendation.lightcone?.LC_name || '-' }}</p>
              <p><strong>Relic Set:</strong> {{ recommendation.relic_set?.R_name || '-' }}</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                color="blue-lighten-2"
                dark
                @click.stop="showBuildDetail(recommendation.RC_id)"
              >
                ดูรายละเอียด
              </v-btn>
              <v-btn
                v-if="isLoggedIn" 
                color="red"
                dark
                @click.stop="deleteBuild(recommendation.RC_id)"
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
          <p class="text-h6 text-grey-lighten-2">ไม่มี Build ในระบบ</p>
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
      <v-row justify="end" class="mt-4">
        <v-col cols="auto">
          <v-btn
            v-if="!isLoggedIn" 
            color="blue-lighten-2"
            dark
            @click="showLoginDialog"
          >
            ล็อคอิน
          </v-btn>
          <v-btn
            v-else 
            color="grey"
            dark
            @click="logout"
          >
            ออกจากระบบ
          </v-btn>
        </v-col>
      </v-row>

      <!-- Dialog สำหรับล็อคอิน -->
      <v-dialog v-model="loginDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">ล็อคอิน</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="username"
              label="Username"
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
              :rules="[v => !!v || 'กรุณากรอก Username']"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              color="blue-lighten-2"
              variant="outlined"
              type="password"
              :rules="[v => !!v || 'กรุณากรอก Password']"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="grey" dark @click="loginDialog = false">ยกเลิก</v-btn>
            <v-btn color="blue-lighten-2" dark @click="login">ล็อคอิน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'BuildListView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      recommendations: [],
      isLoading: false,
      error: null,
      isLoggedIn: false, // ตัวแปรสำหรับสถานะการล็อคอิน เริ่มต้นเป็น false
      loginDialog: false, // ตัวแปรสำหรับเปิด/ปิด Dialog ล็อคอิน
      username: '', // เก็บ Username ที่ผู้ใช้กรอก
      password: '', // เก็บ Password ที่ผู้ใช้กรอก
    };
  },
  mounted() {
    this.fetchRecommendations();
  },
  methods: {
    async fetchRecommendations() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:8800/api/v1/recommendations');
        this.recommendations = response.data.recommendations || [];
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Build:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Build ได้ กรุณาลองใหม่';
        this.recommendations = [];
      } finally {
        this.isLoading = false;
      }
    },
    showBuildDetail(recommendationId) {
      this.router.push(`/build/${recommendationId}`);
    },
    async deleteBuild(recommendationId) {
      if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Build นี้?')) {
        try {
          await axios.delete(`http://localhost:8800/api/v1/recommendation/${recommendationId}`);
          this.fetchRecommendations(); // อัพเดทรายการหลังจากลบ
          alert('ลบ Build สำเร็จ!');
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการลบ Build:', error);
          alert('ไม่สามารถลบ Build ได้ กรุณาลองใหม่');
        }
      }
    },
    showLoginDialog() {
      this.loginDialog = true; // เปิด Dialog ล็อคอิน
    },
    login() {
      // กำหนด Username และ Password ตายตัวในโค้ด
      const hardcodedUsername = 'admin';
      const hardcodedPassword = '123456';

      // ตรวจสอบ Username และ Password ที่ผู้ใช้กรอก
      if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
        this.isLoggedIn = true;
        this.loginDialog = false; // ปิด Dialog หลังล็อคอินสำเร็จ
        alert('ล็อคอินสำเร็จ!');
      } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
      }

      // รีเซ็ตค่า Username และ Password หลังตรวจสอบ
      this.username = '';
      this.password = '';
    },
    logout() {
      this.isLoggedIn = false; // อัพเดทสถานะเป็นไม่ล็อคอิน
      alert('ออกจากระบบสำเร็จ!');
    },
  },
};
</script>

<style scoped>
.build-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.build-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.character-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}

.builds {
  gap: 20px; /* ระยะห่างระหว่างการ์ด */
}
</style>