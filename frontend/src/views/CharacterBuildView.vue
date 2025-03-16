<template>
  <v-app>
    <v-container class="py-12">
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8" v-if="character">
        สร้าง Build สำหรับ {{ character.C_name || 'ตัวละคร' }}
      </h1>
      <h1 class="text-h3 font-weight-bold text-blue-lighten-2 mb-8" v-else>
        สร้าง Build สำหรับ ตัวละคร
      </h1>
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6" v-if="character">
        <v-card-text>
          <v-img
            :src="character.C_images || 'https://via.placeholder.com/300'"
            :alt="character.C_name || 'ตัวละคร'"
            aspect-ratio="1.5"
            class="rounded-lg mb-4 character-image"
            max-height="300"
          ></v-img>
          <h2 class="text-h5 font-weight-bold text-blue-lighten-2 mb-2">{{ character.C_name || 'ไม่มีชื่อ' }}</h2>
          <p><strong>Path:</strong> {{ character.C_path || '-' }}</p>
          <p><strong>Element:</strong> {{ character.C_element || '-' }}</p>
          <p><strong>Role:</strong> {{ character.C_role || '-' }}</p>

          <v-divider class="my-4"></v-divider>

          <v-text-field
            v-model="buildName"
            label="ชื่อ Build"
            color="blue-lighten-2"
            variant="outlined"
            required
            class="mb-4"
            :rules="[v => !!v || 'กรุณากรอกชื่อ Build']"
          ></v-text-field>

          <h3 class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">เลือก Lightcone</h3>
          <v-select
            v-model="selectedLightcone"
            :items="filteredLightcones"
            item-title="LC_name"
            item-value="LC_id"
            label="เลือก Lightcone"
            color="blue-lighten-2"
            variant="outlined"
            clearable
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือก Lightcone']"
          ></v-select>

          <h3 class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">เลือก Relic Set</h3>
          <v-select
            v-model="selectedRelicSet"
            :items="relicSets"
            item-title="R_name"
            item-value="R_id"
            label="เลือก Relic Set"
            color="blue-lighten-2"
            variant="outlined"
            clearable
            class="mb-4"
            :rules="[v => !!v || 'กรุณาเลือก Relic Set']"
          ></v-select>

          <v-btn
            color="blue-lighten-2"
            dark
            @click="saveBuild"
            :disabled="!buildName || !selectedLightcone || !selectedRelicSet"
            class="mt-4"
          >
            บันทึก Build
          </v-btn>

          <v-btn
            color="grey"
            dark
            @click="goBack"
            class="mt-4 ml-4"
          >
            กลับ
          </v-btn>

          <v-btn
            color="blue-lighten-2"
            dark
            @click="showAllBuilds"
            class="mt-4 ml-4"
          >
            ดู Build ทั้งหมด
          </v-btn>

          <v-alert v-if="success" type="success" class="mt-4">บันทึก Build สำเร็จ!</v-alert>
          <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
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
  name: 'CharacterBuildView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  data() {
    return {
      character: null,
      lightcones: [],
      relicSets: [],
      buildName: '',
      selectedLightcone: null,
      selectedRelicSet: null,
      isLoading: false,
      success: false,
      error: null,
    };
  },
  computed: {
    filteredLightcones() {
      if (!this.character || !this.character.C_path) return [];
      return this.lightcones.filter(lightcone => lightcone.LC_path === this.character.C_path);
    },
  },
  mounted() {
    this.fetchCharacter();
    this.fetchLightcones();
    this.fetchRelicSets();
  },
  methods: {
    async fetchCharacter() {
      const characterId = this.route.params.id;
      console.log(`Fetching character with ID: ${characterId}`);
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:8800/api/v1/character/${characterId}`);
        this.character = response.data;
        console.log('Character found:', this.character);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลตัวละคร:', error);
        this.error = 'ไม่สามารถดึงข้อมูลตัวละครได้ กรุณาลองใหม่';
        this.character = null;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchLightcones() {
      try {
        console.log('Fetching all Lightcones...');
        const response = await axios.get('http://localhost:8800/api/v1/lightcones'); // ดึงข้อมูลทั้งหมดจาก DB
        console.log('Lightcones received:', response.data.lightcones);
        this.lightcones = response.data.lightcones || [];
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Lightcone:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Lightcone ได้ กรุณาลองใหม่';
      }
    },
    async fetchRelicSets() {
      try {
        const response = await axios.get('http://localhost:8800/api/v1/relics'); // ดึงข้อมูลทั้งหมดจาก DB
        this.relicSets = response.data.relicSets || [];
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Relic Sets:', error);
        this.error = 'ไม่สามารถดึงข้อมูล Relic Sets ได้ กรุณาลองใหม่';
      }
    },
    async saveBuild() {
      this.isLoading = true;
      this.success = false;
      this.error = null;
      try {
        if (!this.character || !this.buildName || !this.selectedLightcone || !this.selectedRelicSet) {
          throw new Error('กรุณากรอกชื่อ Build และเลือก Lightcone กับ Relic Set');
        }
        const buildData = {
          RC_name: this.buildName,
          C_id: this.character.C_id,
          LC_id: this.selectedLightcone,
          R_id: this.selectedRelicSet,
          PO_id: null,
          uid: null,
        };
        console.log('Saving Build:', buildData);
        await axios.post(`http://localhost:8800/api/v1/recommendation`, buildData);
        this.success = true;
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึก Build:', error);
        this.error = error.message || 'ไม่สามารถบันทึก Build ได้ กรุณาลองใหม่';
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.router.push('/characters');
    },
    showAllBuilds() {
      this.router.push('/builds');
    },
  },
};
</script>

<style scoped>
.character-image {
  object-fit: cover; /* ป้องกันภาพยืดหรือบิดเบี้ยว */
}
</style>