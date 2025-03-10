<template>
  <div id="app">
    <HeaderComponent />
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// .main-content {
//   margin-top: 80px; // Add space for fixed header
//   padding: 20px;
// }
</style>
