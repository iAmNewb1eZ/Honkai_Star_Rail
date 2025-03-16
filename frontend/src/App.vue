<template>
  <v-app>
    <TheNavbar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script setup>
import { provide } from 'vue';
import axios from 'axios';
import TheNavbar from './components/TheNavbar.vue';
import TheFooter from './components/TheFooter.vue'; // นำเข้า TheFooter

// ใช้ provide เพื่อทำให้ axios สามารถใช้งานในทุก component
provide('axios', axios.create({
  baseURL: 'http://localhost:8800/api/v1',  
}));
</script>