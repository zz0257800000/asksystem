<script>
export default {

  data() {
    return {
      searchAllList: {
        questionnaire: [],
        questionList: [],
      },

      page: 1,
      doquestArr: [], //現在更改為陣列
      hi: '', 
      userAnswerList: [
        
      ],
      userAnswers: [], // 保存用户答案数据
      writeNum: '',

    };
  },  
 

  mounted() {

    this.getQuizInfo();
    this.userAnswerInfo();
    console.log(this.$route);
  const writeNumber = this.$route.params.userlistId;
  this.writeNum = writeNumber;


  },
  methods: {
    getQuizInfo() {
    
      const questionnaireIdToFind = this.$route.params.quizId;
      this.questionnaireId = questionnaireIdToFind;
      const writeNumber = this.$route.params.userlistId;
      this.writeNum = writeNumber;
      this.checkinfo = {};
      if (this.searchAllList.questionList) {

        for (const question of this.searchAllList.questionList) {
          if (question.questionType === 'text') {
            // 处理文本类型问题
            this.checkinfo[question.questionId] = ''; // 或者初始化为其他默认值
          } else if (question.optionsType === 'radio' || question.optionsType === 'checkbox') {
            // 处理单选或多选类型问题
            for (let i = 0; i < question.options.split(';').length; i++) {
              const key = question.questionId + '_' + i;
              this.checkinfo[key] = false; // 初始化为 false，表示未选中
            }
          }
        }
        // ...其他代码
      }
      
      console.log("本頁頁碼 " + questionnaireIdToFind);
      fetch(`http://localhost:8080/api/quiz/searchParam?id=${questionnaireIdToFind}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const quizData = data.quizVoList.find(quiz => quiz.questionnaire.id === parseInt(questionnaireIdToFind));
          if (quizData) {
            this.searchAllList.questionnaire = quizData.questionnaire;
            this.searchAllList.questionList = quizData.questionList;
          } else {
            console.error('Quiz data not found for questionnaire ID: ', questionnaireIdToFind);
          }
        })
        .catch((error) => console.error('Error:', error));
    },
    userAnswerInfo() {
      const questionnaireIdToFind = this.$route.params.quizId;
      const writeNumber = this.$route.params.userlistId;
      this.writeNum = writeNumber;
      fetch(`http://localhost:8080/api/quiz/user/showAnswer?quizId=${questionnaireIdToFind}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.userAnswers = data.filter(answer => answer.ulId === parseInt(writeNumber));

          
        })
        .catch((error) => console.error('Error:', error));
    },  
     showDetailPage() {
      // 使用编程式导航返回/showDetailPage页面
      this.$router.push(`/showDetailPage/${this.questionnaireId}`);
    },
   
  


  },
};
</script>

<template>
  <div class="doQuestPageBody">
    <div class="doQuestHeader" v-if="searchAllList.questionnaire">
      <h3>填寫人編號:{{this.writeNum}}</h3>
      <span>{{ searchAllList.questionnaire.startDate }}~~{{ searchAllList.questionnaire.endDate }}</span>
      <h6>問卷名稱:{{ searchAllList.questionnaire.title }}</h6>
      <h6>問卷描述:{{ searchAllList.questionnaire.description }}</h6>   

    </div>
    <div class="backToFix" v-if="page === 1">
 
      <div class="fluidQuest">
        <div v-for="(question, index) in searchAllList.questionList" :key="index">
          <label>問題 {{ index + 1 }}: {{ question.qTitle }}</label>


          <div v-if="question.optionsType === 'radio'">
            
            <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
              <input type="radio" disabled="disabled" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                v-model="userAnswers[index].ans" name="A"  />
              <label :for="'q_' + index + '_o_' + optionIndex">{{  option }}</label>
              {{ userAnswers[index].ans === '非常安全' && optionIndex === 0 ? '✔' : '' }} 
                     </div>
          </div>

          <!-- 多选部分 -->
          <div v-else-if="question.optionsType === 'checkbox'">
            <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">

              <input type="checkbox"  disabled="disabled" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                v-model="userAnswers[index].ansArray" />
              <label :for="'q_' + index + '_o_' + optionIndex">{{ option  }}</label>
              <span v-if="userAnswers[index].ans && userAnswers[index].ans.includes(option)"> ✔</span>
            </div>
          </div>

          <div v-else-if="question.optionsType === 'text'" class="input-wrapper">
            <input type="text" disabled="disabled"  v-model="userAnswers[index].ans">

          </div>
        </div>

      </div>
      
      <button @click="showDetailPage()" class="submit-button">返回統計情報</button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.submit-button {
  bottom: 20px;
  /* 距离底部 20px */
  right: 20px;
  /* 距离右侧 20px */
  background-color: #06404e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  position: relative;
  left: 47%;
  bottom: 10%;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: rgb(69, 160, 160);
  }
}

.doQuestPageBody {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  color: #fff;
  min-height: 95vh;
}

.doQuestHeader {
  width: 78vw;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #2c2c2c;
}

.fixedQuest {
  width: 78vw;
  height: auto;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #2c2c2c;
}

.fixedQuest div {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.fixedQuest label {
  width: 130px;
  font-weight: bold;
  color: #fff;
}

.fixedQuest input {
  flex: 1;
}

.fluidQuest {
  width: 78vw;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  background-color: #2c2c2c;
}

.fluidQuest label {
  font-weight: bold;
  color: #fff;
  margin: 10px 0;

}

.fluidQuest input[type="radio"] {
  margin-right: 10px;
}

.fluidQuest button {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.fluidQuest button:hover {
  background-color: #2980b9;
}

.input-wrapper input[type="text"] {
  width: 550px;
  /* 你想要的宽度 */
  height: 100px;
  padding: 10px;
  /* 可选的内边距 */
  /* 其他样式... */
  white-space: pre-wrap;
  resize: vertical;
  /* 或者使用 horizontal，根据需要调整 */
  max-height: 200px;
  /* 设置输入框的最大高度，根据需要调整 */

}</style>
