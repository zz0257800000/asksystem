<script>
export default {
  data() {
    return {
      editedQuestionnaire: {
        // 初始化或使用默認值，這將是您編輯的問卷數據
        questionName: '',
        // 其他問卷相關的屬性
      },
    };
  },
  created() {
    // 在頁面創建時，使用$route.params.index檢索問卷數據
    const index = this.$route.params.index;
    if (index >= 0 && index < this.questArrLocal.length) {
      // 使用索引檢索相應的問卷數據
      this.editedQuestionnaire = { ...this.questArrLocal[index] };
    } else {
      // 處理索引無效的情況
      console.error('Invalid questionnaire index');
      // 可以進行一些導航或錯誤處理
    }
  },
  methods: {
    saveChanges() {
      // 在這裡處理保存更改的邏輯，您可以將更改應用到questArrLocal中的相應問卷數據
      // 然後可以導航回上一頁或執行其他操作
      console.log('Saving changes:', this.editedQuestionnaire);
    },
  },
};
</script>
<template>
    <div class="edit-questionnaire">
      <h2>Edit Questionnaire</h2>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="questionName">Question Name:</label>
          <input type="text" id="questionName" v-model="editedQuestionnaire.questionName" />
        </div>
  
        <!-- 其他問卷相關的輸入框和編輯元素 -->
  
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
<style lang="scss" scoped>
.edit-questionnaire {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
