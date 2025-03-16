<template>
  <footer class="footer">
    <span>&copy; Honkai Star Rail</span>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style scoped>
.footer {
  background-color: #1a2238; 
  color: white;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}
</style>