<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-black-lighten-2 mb-8">
        รายชื่อตัวละคร
      </h1>
      <v-row justify="center" align="center" class="mb-4">
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedPath"
            :items="[
              '',
              'Erudition',
              'Nihility',
              'Preservation',
              'Abundance',
              'The Hunt',
              'Destruction',
              'Harmony',
            ]"
            label="เลือกเส้นทาง"
            color="blue-lighten-2"
            variant="outlined"
            clearable
            @update:model-value="fetchCharacters"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" class="text-right">
          <v-btn
            v-if="isLoggedIn"
            color="blue-lighten-2"
            dark
            @click="createNewCharacter"
          >
            เพิ่มตัวละคร
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        v-if="characters.length > 0"
        class="characters"
        align="center"
        justify="center"
      >
        <v-col
          v-for="character in characters"
          :key="character.C_id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex justify-center"
        >
          <v-card
            color="grey-darken-3"
            class="character-card pa-4 elevation-8 rounded-lg"
            max-width="350"
            @click="showCharacterBuild(character.C_id)"
          >
            <v-img
              :src="character.C_images || 'https://via.placeholder.com/300'"
              :alt="character.C_name || 'ตัวละคร'"
              aspect-ratio="1.5"
              class="rounded-lg mb-4 character-image"
              max-height="250"
            ></v-img>
            <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2">
              {{ character.C_name || "ไม่มีชื่อ" }}
            </v-card-title>
            <v-card-subtitle class="text-grey-lighten-2">
              <p>Path: {{ character.C_path || "-" }}</p>
              <p>Element: {{ character.C_element || "-" }}</p>
              <p>Role: {{ character.C_role || "-" }}</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn
                v-if="isLoggedIn"
                color="blue-lighten-2"
                dark
                @click.stop="editCharacter(character.C_id)"
              >
                แก้ไข
              </v-btn>
              <v-btn
                v-if="isLoggedIn"
                color="red"
                dark
                @click.stop="deleteCharacter(character.C_id)"
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
          <p class="text-h6 text-grey-lighten-2">ไม่มีตัวละครในระบบ</p>
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
      <v-row v-if="characters.length > 0" class="justify-center mt-4">
        <v-col cols="12" class="text-center">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            color="blue-lighten-2"
            @update:model-value="fetchCharacters"
          ></v-pagination>
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
          <v-btn v-else color="grey" dark @click="logout"> ออกจากระบบ </v-btn>
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
              :rules="[(v) => !!v || 'กรุณากรอก Username']"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              color="blue-lighten-2"
              variant="outlined"
              type="password"
              :rules="[(v) => !!v || 'กรุณากรอก Password']"
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
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "CharacterView",
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      characters: [], // เริ่มต้นเป็น array ว่างแทน null
      selectedPath: "", // เริ่มต้นเป็นค่าว่างเพื่อแสดงข้อมูลทั้งหมด
      currentPage: 1,
      limit: 12, // จำนวนตัวละครต่อหน้า
      totalPages: 1,
      isLoading: false,
      error: null,
      isLoggedIn: false, // ตัวแปรสำหรับสถานะการล็อคอิน เริ่มต้นเป็น false
      loginDialog: false, // ตัวแปรสำหรับเปิด/ปิด Dialog ล็อคอิน
      username: "", // เก็บ Username ที่ผู้ใช้กรอก
      password: "", // เก็บ Password ที่ผู้ใช้กรอก
    };
  },
  mounted() {
    this.fetchCharacters();
  },
  methods: {
    async fetchCharacters() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "http://localhost:8800/api/v1/characters",
          {
            params: {
              C_path: this.selectedPath || undefined, // ใช้ undefined ถ้า selectedPath เป็น ''
              page: this.currentPage,
              limit: this.limit,
            },
          }
        );
        this.characters = response.data.characters || []; // ใช้ array ว่างถ้าไม่มีข้อมูล
        this.totalPages = response.data.totalPages || 1;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลตัวละคร:", error);
        this.error = "ไม่สามารถดึงข้อมูลตัวละครได้ กรุณาลองใหม่";
        this.characters = []; // ตั้งค่าเป็น array ว่างแทน null
      } finally {
        this.isLoading = false;
      }
    },
    showCharacterBuild(characterId) {
      this.router.push(`/character/${characterId}/build`);
    },
    editCharacter(characterId) {
      this.router.push(`/character/${characterId}/edit`);
    },
    async deleteCharacter(characterId) {
      if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบตัวละครนี้?")) {
        try {
          await axios.delete(
            `http://localhost:8800/api/v1/character/${characterId}`
          );
          this.fetchCharacters(); // อัพเดทรายการหลังจากลบ
          alert("ลบตัวละครสำเร็จ!");
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบตัวละคร:", error);
          alert("ไม่สามารถลบตัวละครได้ กรุณาลองใหม่");
        }
      }
    },
    createNewCharacter() {
      this.router.push("/character/create");
    },
    showLoginDialog() {
      this.loginDialog = true; // เปิด Dialog ล็อคอิน
    },
    login() {
      // กำหนด Username และ Password ตายตัวในโค้ด
      const hardcodedUsername = "admin";
      const hardcodedPassword = "123456";

      // ตรวจสอบ Username และ Password ที่ผู้ใช้กรอก
      if (
        this.username === hardcodedUsername &&
        this.password === hardcodedPassword
      ) {
        this.isLoggedIn = true;
        this.loginDialog = false; // ปิด Dialog หลังล็อคอินสำเร็จ
        alert("ล็อคอินสำเร็จ!");
      } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่");
      }

      // รีเซ็ตค่า Username และ Password หลังตรวจสอบ
      this.username = "";
      this.password = "";
    },
    logout() {
      this.isLoggedIn = false; // อัพเดทสถานะเป็นไม่ล็อคอิน
      alert("ออกจากระบบสำเร็จ!");
    },
  },
};
</script>

<style scoped>
.character-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer; /* ชี้เคอร์เซอร์เป็นมือเมื่อ hover */
}

.character-card:hover {
  transform: scale(1.05); /* ขยายเมื่อ hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* เพิ่มเงาเมื่อ hover */
}

.character-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}

.characters {
  gap: 30px; /* เพิ่มระยะห่างระหว่างการ์ดเป็น 30px (จาก 20px) */
}
</style>