<script>
export default {
  methods: {
    startAdventure() {
      alert('未来へ飛び立とう！ 🚀');
      // ここに冒険のための追加の機能を追加できます。
    },
  },
};
</script>

<template>
  <div class="sci-fi-page">
    <div class="header">
      <h1>未来へようこそ</h1>
      <p>未知を探索しよう</p>
    </div>
    <div class="content">
      <p>
        宇宙を旅して、宇宙の秘密を解き明かしましょう。最先端のテクノロジーと未来志向のデザインが、想像を絶する場所へと導きます。
      </p>
      <button @click="startAdventure" class="cool-button">冒険を始める</button>
    </div>
    <div class="footer">
      <p>&copy; 2023 宇宙探検家</p>
    </div>
  </div>
</template>



<style scoped>
.sci-fi-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background: linear-gradient(45deg, #001a33, rgb(87, 87, 87));
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-top: 50px;
}

.header h1 {
  font-size: 3rem;
}

.header p {
  font-size: 1.5rem;
}

.content {
  text-align: center;
  padding: 20px;
}

.content p {
  font-size: 1.2rem;
  line-height: 1.5;
}

.cool-button {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: transform 0.3s ease-in-out;
}

.cool-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.footer {
  text-align: center;
  margin-bottom: 20px;
}
</style>