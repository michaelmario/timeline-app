# timeline-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<template>
  <div class="timeline-container">
    <h2 class="timeline-title">Historical Timeline</h2>
    <div class="timeline">
      <div v-for="item in timelineItems" 
           :key="item.id" 
           class="timeline-item"
           @click="showDetails(item)">
        <div class="timeline-content">
          <h3>{{ item.title }}</h3>
          <p class="date">{{ item.date }}</p>
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'TimeLine',
  setup() {
    const timelineItems = ref([]);

    const fetchTimelineData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'timeline'));
        timelineItems.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    const showDetails = (item) => {
      console.log('Selected item:', item);
      // You can implement a modal or navigation here
    };

    onMounted(() => {
      fetchTimelineData();
    });

    return {
      timelineItems,
      showDetails
    };
  }
}
</script>

<style scoped lang="scss">
.timeline-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.timeline-title {
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
}

.timeline {
  position: relative;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #e0e0e0;
  }
}

.timeline-item {
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
  &.left {
    left: 0;
    padding-right: 40px;
  }

  &.right {
    left: 50%;
    padding-left: 40px;
  }

  .timeline-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .timeline-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    
    h3 {
      margin: 0 0 10px;
      color: #2c3e50;
    }

    .date {
      color: #666;
      font-size: 0.9em;
      margin-bottom: 10px;
    }

    .description {
      color: #444;
      line-height: 1.5;
    }
  }
}
.timeline-item::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}
.timeline-item.left::before {
  right: -8px;
}

.timeline-item.right::before {
  left: -8px;
}

// Responsive design
@media (max-width: 768px) {
  .timeline::before {
    left: 0;
  }

  .timeline-item {
    width: 100%;
    padding-left: 40px;

    &.left, &.right {
      left: 0;
      padding-right: 0;
    }

    &::before {
      left: -8px;
    }
  }
}

</style>

