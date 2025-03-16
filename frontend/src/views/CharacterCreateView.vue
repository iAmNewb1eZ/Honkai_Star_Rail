<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8">สร้างตัวละครใหม่</h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6">
        <v-card-text>
          <v-text-field
            v-model="newCharacter.C_name"
            label="ชื่อตัวละคร"
            color="blue-lighten-2"
            variant="outlined"
            required
            class="mb-4"
            :rules="[v => !!v || 'กรุณากรอกชื่อตัวละคร']"
          ></v-text-field>

          <v-select
            v-model="newCharacter.C_path"
            :items="['Erudition', 'Nihility', 'Preservation', 'Abundance', 'The Hunt', 'Destruction', 'Harmony']"
            label="เส้นทาง"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือกเส้นทาง']"
          ></v-select>

          <v-select
            v-model="newCharacter.C_element"
            :items="['Physical', 'Fire', 'Ice', 'Lightning', 'Wind', 'Quantum', 'Imaginary']"
            label="ธาตุ"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือกธาตุ']"
          ></v-select>

          <v-select
            v-model="newCharacter.C_role"
            :items="['Main DPS', 'Sub DPS', 'Support', 'Healer', 'Tank']"
            label="บทบาท"
            color="blue-lighten-2"
            variant="outlined"
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือกบทบาท']"
          ></v-select>

          <v-text-field
            v-model="newCharacter.C_images"
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
            @click="createCharacter"
            :disabled="!isFormValid"
            class="mt-4"
          >
            สร้างตัวละคร
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
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'CharacterCreateView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      newCharacter: {
        C_name: '',
        C_path: '',
        C_element: '',
        C_role: '',
        C_images: '',
      },
      isLoading: false,
      error: null,
      isLoggedIn: false, // ใช้สถานะล็อคอินจาก CharacterView (สมมติว่าใช้ props หรือ state management ในอนาคต)
    };
  },
  computed: {
    isFormValid() {
      return !!this.newCharacter.C_name && !!this.newCharacter.C_path && !!this.newCharacter.C_element && !!this.newCharacter.C_role && !!this.newCharacter.C_images;
    },
  },
  mounted() {
    // สมมติว่า isLoggedIn ถูกส่งผ่าน props หรือ state management (เช่น Vuex/Pinia)
    // ในตัวอย่างนี้ ฉันจะใช้ค่าเริ่มต้นจาก localStorage หรือสมมติค่า
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  },
  methods: {
    async createCharacter() {
      if (!this.isLoggedIn) {
        alert('กรุณาล็อคอินก่อนสร้างตัวละคร');
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        await axios.post('http://localhost:8800/api/v1/character', this.newCharacter);
        alert('สร้างตัวละครสำเร็จ!');
        this.goBack();
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสร้างตัวละคร:', error);
        this.error = 'ไม่สามารถสร้างตัวละครได้ กรุณาลองใหม่';
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