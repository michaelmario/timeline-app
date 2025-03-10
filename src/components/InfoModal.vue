<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Header section -->
      <div class="modal-header">
        <div class="header-badge">{{ item?.category || 'Element' }}</div>
        <button class="close-button" @click="closeModal">×</button>
      </div>

      <!-- Title section -->
      <h1 class="modal-title">{{ item?.title }} ({{ item?.symbol }})</h1>

      <!-- Main content -->
      <div class="modal-body">
        <div class="element-image" v-if="item?.imageUrl">
          <img :src="item.imageUrl" :alt="item.title">
        </div>
        <p>{{ item?.description }}</p>
        <div class="element-details">
          <p><strong>Important Date:</strong> {{ item?.date }} BC</p>
          <p><strong>Affiliation:</strong> {{ item?.affiliation }}</p>
          <p><strong>Category:</strong> {{ item?.category }}</p>
        </div>
      </div>

      <!-- Footer section -->
      <div class="modal-footer">
        <span>{{ currentPage }} of {{ totalPages }} elements</span>
        <button class="nav-button" @click="navigate">
          {{ nextItem?.title }} ({{ nextItem?.number }}) ▶
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoModal',
  props: {
    show: Boolean,
    item: {
      type: Object,
      default: () => ({})
    },
    currentPage: Number,
    totalPages: Number,
    nextItem: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close', 'navigate'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
    navigate() {
      this.$emit('navigate', this.nextItem);
    }
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
  overflow: hidden;
  color: #333;
}

.modal-header {
  background: #c4147f;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-badge {
  background: #8b1159;
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 14px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
}

.modal-title {
  padding: 20px;
  margin: 0;
  font-size: 24px;
  color: #333;
}

.modal-body {
  padding: 0 20px 20px;
  line-height: 1.6;
  color: #666;

  a {
    color: #c4147f;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #eee;
  background: #f9f9f9;

  span {
    color: #666;
  }
}

.nav-button {
  background: #666;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #555;
  }
}

.element-image {
  margin: 20px 0;
  text-align: center;
  
  img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
  }
}

.element-details {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;

  p {
    margin: 8px 0;
  }
}
</style> 