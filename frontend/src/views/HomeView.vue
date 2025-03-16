<template>
  <v-app>
    <main class="py-12">
      <v-container>
        <h2 class="text-h3 font-weight-semibold text-black-lighten-2 mb-4 d-flex align-center">
          <span>🔥 Top-rated 🔥 </span>
        </h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6 hover:scale-105 transition" flat>
              <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">The Herta Nuke!!!!</v-card-title>
              <v-img src="images/The Herta.gif" alt="Feature 1" aspect-ratio="1.5" class="rounded-lg mb-4"></v-img>
              <v-card-text class="text-grey-lighten-2">Clank Clank Clank Clank</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6 hover:scale-105 transition" flat>
              <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">ลบล้าง = ลบให้หาย</v-card-title>
              <v-img src="images/Acheron.gif" alt="Feature 2" aspect-ratio="1.5" class="rounded-lg mb-4"></v-img>
              <v-card-text class="text-grey-lighten-2">Nami da ame...</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6 hover:scale-105 transition" flat>
              <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">I will set the seas ablaze!!!</v-card-title>
              <v-img src="images/firefly.gif" alt="Feature 3" aspect-ratio="1.5" class="rounded-lg mb-4"></v-img>
              <v-card-text class="text-grey-lighten-2">OO Gundam ทำการกำจัดเป้าหมาย</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <h4 class="text-h3 font-weight-semibold text-black-lighten-2 mt-12 mb-4 d-flex align-center">
         <span>✨ What's New✨</span>
        </h4>
        <v-row>
          <v-col cols="12" md="4">
            <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6 hover:scale-105 transition" flat>
              <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">Until my sin is Cleanse</v-card-title>
              <v-img src="images/blade.gif" alt="Feature 4" aspect-ratio="1.5" class="rounded-lg mb-4"></v-img>
              <v-card-text class="text-grey-lighten-2">He wants to die, but he can't, thanks to my Luocha.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6 hover:scale-105 transition" flat>
              <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">You act, I counter.</v-card-title>
              <v-img src="images/yunli.gif" alt="Feature 5" aspect-ratio="1.5" class="rounded-lg mb-4"></v-img>
              <v-card-text class="text-grey-lighten-2">Counter and Counter and Counter again.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6 hover:scale-105 transition" flat>
              <v-card-title class="text-h6 font-weight-bold text-blue-lighten-2 mb-4">Disappear among the sea of buttercry</v-card-title>
              <v-img src="images/seele.gif" alt="Feature 6" aspect-ratio="1.5" class="rounded-lg mb-4"></v-img>
              <v-card-text class="text-grey-lighten-2">Skill + Ultimate Strike Enamy HP remain 1%</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </main>

    <footer class="bg-grey-darken-4 text-center py-4 mt-12">
      <p class="text-grey-lighten-2">© Honkai:Star Rail</p>
    </footer>
  </v-app>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
/* กำหนดพื้นหลังให้ <body> หรือ <v-app> */
body, .v-app {
  background-color: #1a2238; /* สีน้ำเงินเข้มเหมือนในภาพ */
  color: #ffffff;
  margin: 0;
  padding: 0;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.transition {
  transition: transform 0.3s ease;
}

.text-center {
  text-align: center;
}

.v-card {
  transition: transform 0.3s ease;
}
</style>