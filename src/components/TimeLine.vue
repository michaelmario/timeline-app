<template>
  <div>
  <div class="timeline-container">
    <div class="content-area">
      <!-- Large centered year display 
      <div class="center-year">Septembre {{ selectedYear }} naissait le M M M </div>
      -->
      <!-- Current element info
      <div class="current-element" v-if="selectedItem">
        <h2>{{ selectedItem.title }}</h2>
        <p>{{ selectedItem.description }}</p>
        <small>Image: {{ selectedItem.imageSource }}</small>
      </div> -->

      <!-- Horizontal scrollable cards container -->
      <div class="cards-container" @wheel.prevent="handleWheel">
        <div class="cards-wrapper">
          <div v-for="(item, index) in timelineItems" 
               :key="item.id" 
               class="timeline-card"
               :class="{ visible: visibleCards.has(index) }"
               @click="openModal(item)">
            <div class="card-content">
              <img :src="item.imageUrl" :alt="item.title" class="card-image">
              <div class="card-details">
                <h3>{{ item.title }}</h3>
                <p class="description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline section -->
   
    <InfoModal 
      :show="showModal"
      :item="selectedItem"
      :current-page="currentPage"
      :total-pages="timelineItems.length"
      :next-item="getNextItem"
      @close="closeModal"
      @navigate="handleNavigation"
    />
  
  <div class="container">
      <div class="content">
          <div class="timeline-section">
      <!--Year markers -->
      <div class="year-markers">
        <div v-for="year in years" 
             :key="year" 
             class="year-marker"
             :style="{ left: calculatePosition(year) + '%' }">
          {{ year }} BC
        </div>
      </div>

      <!-- Category filter -->
      <div class="category-filter">
        <button class="filter-btn show-all">Show All</button>
        <button class="filter-btn actinide">Actinide</button>
        <button class="filter-btn alkali">Alkali Metal</button>
        <button class="filter-btn alkaline">Alkaline Earth Metal</button>
        <button class="filter-btn halogen">Halogen</button>
        <button class="filter-btn lanthanide">Lanthanide</button>
        <button class="filter-btn metalloid">Metalloid</button>
        <button class="filter-btn noble">Noble gas</button>
        <button class="filter-btn nonmetal">Nonmetal</button>
        <button class="filter-btn post-transition">Post-Transition Metal</button>
        <button class="filter-btn transition">Transition Metal</button>
      </div> 
    </div>  
    
</div>
      </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
// import timelineData from '../data/newTimeLineData.json';
import InfoModal from './InfoModal.vue';
// Import the image

export default {
  name: 'TimeLine',
  components: { InfoModal },
  setup() {
    let timelineItems = ref([]);
    const selectedYear = ref(1969);
    const selectedItem = ref(null);
    const years = [1969, 1972, 1970, 1971, 1972, 1973, 1974, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000];
    const visibleCards = ref(new Set());
    const showModal = ref(false);
    const currentPage = ref(1);

    const handleWheel = (event) => {
      event.preventDefault();
      const container = event.currentTarget;
      const scrollAmount = event.deltaY > 0 ? 330 : -330; // Width + gap of one card
      
      // Smooth scroll to next/previous position
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    };

    const handleCardHover = (item) => {
      selectedItem.value = item;
      selectedYear.value = item.date;
    };

    const calculatePosition = (date) => {
      const maxDate = 1969;
      const minDate = 2000;
      const range = maxDate - minDate;
      return ((maxDate - date) / range) * 300;
    };

    // const fetchTimelineData = async () => {
    //   try {
    //     const response = await fetch('./data/timelineData.json');
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     console.log('Fetched data:', data.timelineItems);
    //     timelineItems.value = data.timelineItems;
    //     return timelineItems.value;
    //   } catch (error) {
    //     console.error('Error fetching timeline data:', error);
    //     return [];
    //   }
    // };

    const fetchNewTimelineData = async () => {
      try {
        const response = await fetch('./data/newTimeLineData.json'); // Ensure this path is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched new timeline data:', data.timelineItems);
        timelineItems.value = data.timelineItems; // Ensure this is set correctly
        console.log('Timeline Items:', timelineItems.value); // Log the items
        return timelineItems.value;
      } catch (error) {
        console.error('Error fetching new timeline data:', error);
        return [];
      }
    };

    const handleScroll = (event) => {
      const container = event.currentTarget;
      const cards = container.querySelectorAll('.timeline-card');
      const containerWidth = container.offsetWidth;
      const containerLeft = container.getBoundingClientRect().left;

      cards.forEach((card, index) => {
        const cardBounds = card.getBoundingClientRect();
        const cardLeft = cardBounds.left - containerLeft;
        const cardRight = cardLeft + cardBounds.width;
        
        // Adjust visibility threshold to show only two cards
        const threshold = containerWidth / 2;
        const isVisible = cardRight > 0 && cardLeft < containerWidth && 
                         Math.abs(cardLeft - threshold) < containerWidth / 2;
        
        if (isVisible) {
          visibleCards.value.add(index);
        } else {
          visibleCards.value.delete(index);
        }
      });
    };

    const openModal = (item) => {
      selectedItem.value = item;
      showModal.value = true;
      currentPage.value = timelineItems.value.indexOf(item) + 1;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const getNextItem = computed(() => {
      if (!selectedItem.value) return null;
      const currentIndex = timelineItems.value.findIndex(item => item.id === selectedItem.value.id);
      const nextIndex = (currentIndex + 1) % timelineItems.value.length;
      return timelineItems.value[nextIndex];
    });

    const handleNavigation = (nextItem) => {
      selectedItem.value = nextItem;
      currentPage.value = timelineItems.value.indexOf(nextItem) + 1;
    };

    onMounted(() => {
      // fetchTimelineData();
      fetchNewTimelineData();
      const container = document.querySelector('.cards-container');
      container.addEventListener('scroll', handleScroll);
    });

    return {
      timelineItems,
      years,
      selectedYear,
      selectedItem,
      calculatePosition,
      handleWheel,
      handleCardHover,
      visibleCards,
      showModal,
      currentPage,
      openModal,
      closeModal,
      getNextItem,
      handleNavigation
    };
  }
}
</script>

<style scoped lang="scss">
.timeline-container {
  width: 100%;
  height: 100vh;
  background: #4a1c40;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.content-area {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.center-year {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8em;
  color: rgba(255, 255, 255, 0.15);
  pointer-events: none;
  z-index: 1;
}

.current-element {
  position: absolute;
  top: 20px;
  left: 20px;
  max-width: 400px;
  z-index: 2;

  h2 {
    margin: 0 0 10px;
  }

  small {
    opacity: 0.7;
  }
}

.cards-container {
  // position: absolute;
  bottom: 140px; // Position above timeline section
  left: 0;
  right: 0;
  height:450px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 20px;
  width: 100%;
}

.cards-wrapper {
  display: flex;
  gap: 60px;
  height: 100%;
  padding: 0 calc(50% - 141px); // Center two cards
}

.timeline-card {
  cursor: pointer;
  width: 270px;
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(100px);
  transition: all 0.6s ease;
  position: relative;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .card-content {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }
  }

  .card-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .card-details {
    padding: 15px;

    h3 {
      margin: 0 0 8px;
    }

    .description {
      font-size: 0.9em;
      opacity: 0.9;
      margin: 0;
    }
  }
}

.timeline-section {
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.year-markers {
  height:10px;
  position: relative;
  padding: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.year-marker {
  position: absolute;
  transform: translateX(-50%);
  top: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -22px;
    width: 2px;
    height: 10px;
    background: rgba(255, 255, 255, 0.7);
  }
}

.category-filter {
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
}

.filter-btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9em;

  &:hover {
    filter: brightness(1.2);
  }

  &.show-all { background-color: #666; }
  &.actinide { background-color: #ff1493; }
  &.alkali { background-color: #4169e1; }
  &.alkaline { background-color: #9932cc; }
  &.halogen { background-color: #ffa500; }
  &.lanthanide { background-color: #32cd32; }
  &.metalloid { background-color: #dc143c; }
  &.noble { background-color: #00ced1; }
  &.nonmetal { background-color: #9acd32; }
  &.post-transition { background-color: #daa520; }
  &.transition { background-color: #ff69b4; }
}
@media screen and (min-width:768px){
  .cards-wrapper{
    margin-top:50px;
  }
  .cards-container{
    bottom:0px !important;
    // height:400px !important;
  }

}
@media(width:1280px){
  .cards-wrapper{
   padding-top:50px;
  }
  .year-markers{
    height:5px !important; 
  }
  // .cards-container{
  //  height:px !important;
  // }
  .timeline-section{
    margin-top:50px;
  
  }
}
</style>




