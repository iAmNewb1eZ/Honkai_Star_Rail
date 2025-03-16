<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="https://shorturl.at/Fu1mI" alt="Star Rail Space Logo" class="logo">
      <router-link to="/" class="site-title">Star Rail Space</router-link>
    </div>
    <div class="navbar-menu">
      <router-link to="/characters" class="nav-item">Characters</router-link>
      <router-link to="/lightcones" class="nav-item">Lightcones</router-link>
      <router-link to="/builds" class="nav-item">Build Lists</router-link>
      <router-link to="/evaluation" class="nav-item">ประเมิน</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
};
</script>

<style scoped>
.navbar {
  background-color: #1a2238; 
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: white;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}

.site-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.site-title:hover,
.site-title.router-link-active {
  color: #87CEEB; /* สีฟ้าอ่อนเมื่อ hover หรือ active */
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  transition: color 0.3s;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #87CEEB; /* สีฟ้าอ่อนเมื่อ hover หรือ active */
}

.language {
  cursor: pointer;
  padding: 5px 10px;
}

.language:hover {
  color: #87CEEB;
}
</style>