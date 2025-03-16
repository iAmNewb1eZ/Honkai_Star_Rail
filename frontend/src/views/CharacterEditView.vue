<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8">แก้ไขตัวละคร</h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6" v-if="character">
        <v-card-text>
          <v-text-field
            v-model="character.C_name"
            label="ชื่อตัวละคร"
            color="blue-lighten-2"
            variant="outlined"
            required
            class="mb-4"
            :rules="[v => !!v || 'กรุณากรอกชื่อตัวละคร']"
          ></v-text-field>

          <v-select
            v-model="character.C_path"
            :items="['Erudition', 'Nihility', 'Preservation', 'Abundance', 'The Hunt', 'Destruction', 'Harmony']"
            label="เส้นทาง"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือกเส้นทาง']"
          ></v-select>

          <v-select
            v-model="character.C_element"
            :items="['Physical', 'Fire', 'Ice', 'Lightning', 'Wind', 'Quantum', 'Imaginary']"
            label="ธาตุ"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือกธาตุ']"
          ></v-select>

          <v-select
            v-model="character.C_role"
            :items="['Main DPS', 'Sub DPS', 'Support', 'Healer', 'Tank']"
            label="บทบาท"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือกบทบาท']"
          ></v-select>

          <v-text-field
            v-model="character.C_images"
            label="URL รูปภาพ"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณากรอก URL รูปภาพ']"
          ></v-text-field>

          <v-btn
            v-if="isLoggedIn" 
            color="blue-lighten-2"
            dark
            @click="saveChanges"
            :disabled="!isFormValid"
            class="mt-4"
          >
            บันทึกการเปลี่ยนแปลง
          </v-btn>

          <v-btn
            color="grey"
            dark
            @click="goBack"
            class="mt-4 ml-4"
          >
            กลับ
          </v-btn>
        </v-card-text>
      </v-card>
      <v-row v-else-if="!isLoading" class="justify-center">
        <v-col cols="12" class="text-center">
          <p class="text-h6 text-grey-lighten-2">ไม่พบตัวละครนี้ในระบบ</p>
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
  name: 'CharacterEditView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  data() {
    return {
      character: null,
      isLoading: false,
      error: null,
      isLoggedIn: false, // ใช้สถานะล็อคอินจาก CharacterView (สมมติว่าใช้ props หรือ state management ในอนาคต)
    };
  },
  computed: {
    isFormValid() {
      return !!this.character?.C_name && !!this.character?.C_path && !!this.character?.C_element && !!this.character?.C_role && !!this.character?.C_images;
    },
  },
  mounted() {
    this.fetchCharacter();
    // สมมติว่า isLoggedIn ถูกส่งผ่าน props หรือ state management (เช่น Vuex/Pinia)
    // ในตัวอย่างนี้ ฉันจะใช้ค่าเริ่มต้นจาก localStorage หรือสมมติค่า
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  },
  methods: {
    async fetchCharacter() {
      const characterId = this.route.params.id;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:8800/api/v1/character/${characterId}`);
        this.character = response.data;
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลตัวละคร:', error);
        this.error = 'ไม่สามารถดึงข้อมูลตัวละครได้ กรุณาลองใหม่';
        this.character = null;
      } finally {
        this.isLoading = false;
      }
    },
    async saveChanges() {
      if (!this.isLoggedIn) {
        alert('กรุณาล็อคอินก่อนบันทึกการเปลี่ยนแปลง');
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        await axios.patch(`http://localhost:8800/api/v1/character/${this.character.C_id}`, this.character);
        alert('บันทึกการเปลี่ยนแปลงสำเร็จ!');
        this.goBack();
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึกการเปลี่ยนแปลง:', error);
        this.error = 'ไม่สามารถบันทึกการเปลี่ยนแปลงได้ กรุณาลองใหม่';
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.router.push('/characters');
    },
  },
};
</script>

<style scoped>
.character-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}
</style>