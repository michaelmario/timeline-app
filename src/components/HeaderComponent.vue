<template>
  <header class="header">
    <div class="header-content">
      <div class="placeholder"></div>
      <h1 class="title">Timeline du M M M</h1>
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    toggleMenu() {
      // TODO: Implement menu toggle functionality
      console.log('Toggle menu clicked');
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  background-color: #9a019a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.placeholder {
  width: 40px; // Same width as hamburger button
}

.title {
  margin: 0;
  font-size: 1.5rem;
  color: #ffffff;
}

.hamburger {
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    transition: all 0.3s ease;
  }

  &:hover span {
    background-color: #42b983;
  }
}
@media screen and (max-width: 768px) {
  .header-content{
    max-width: 277px;
    margin: 0 auto;
}
}
</style> 