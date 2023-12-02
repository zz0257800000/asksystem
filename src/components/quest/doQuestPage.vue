<script>
export default {
  
  data() {
    return {
      searchAllList: {
        questionnaire: [],
        questionList: [],
      },
    
      userResponses: [],
      page: 1,
      questArr: [], // 你的初始化数据
      doquestArr: [], //現在更改為陣列
    };
  },
  created() {
    this.questArr = []; // 你的初始化数据
    // ... 其他初始化逻辑
},
  mounted() {
    this.getQuizInfo();
  },
  methods: {
    getQuizInfo() {
      const questionnaireIdToFind = this.$route.params.wantId;
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
    processSelectedOptions() {
            const selectedOptions = [];

            for (const key in this.checkinfo) {
                if (this.checkinfo[key]) {
                    const [questionId, index] = key.split('_');
                    const optionText = this.searchAllList.questionList.find(item => item.questionId == questionId)?.optionText;

                    selectedOptions.push({
                        questionId,
                        optionIndex: parseInt(index),
                        optionValue: this.checkinfo[key],
                        optionTextSplit: optionText ? optionText.split(';') : []
                    });
                }
            }

            const sortedOptions = {};

            // 將選項按照 questionId 分類
            for (const option of selectedOptions) {
                if (!sortedOptions[option.questionId]) {
                    sortedOptions[option.questionId] = [];
                }
                sortedOptions[option.questionId].push(option);
            }

            let ans = ""; // 用來儲存所有答案

            // 將分類後的選項按要求處理並整合到 ans 中
            for (const questionId in sortedOptions) {
                if (["name", "phoneNumber", "email"].includes(questionId)) {
                    continue; // 排除基本資料
                }

                const options = sortedOptions[questionId];

                options.sort((a, b) => a.optionIndex - b.optionIndex);

                const answers = options.map(option => {
                    if (isNaN(option.optionIndex)) {
                        return option.optionValue;
                    } else {
                        return option.optionTextSplit[option.optionIndex];
                    }
                });

                ans += answers.join(';') + ';'; // 以分號結尾
            }

            // 去除最後一個分號
            if (ans.endsWith(';')) {
                ans = ans.slice(0, -1);
            }

            console.log(`Answer: ${ans}`);
            this.hi = ans;
            console.log(this.hi);
        },

    async confirmAnswers() {
    try {
      this.processSelectedOptions();
            const userResponse = {
              userList: {
                    //加入變數在此!!
                    questionnaireId: this.$route.params.wantId,
                    phoneNumber: this.phoneNumber,
                    name: this.name,
                    email: this.email,
                    age: this.age,
                    ans: this.hi
                },
            };
      const response = await fetch('http://localhost:8080/api/quiz/usercreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userResponse)
      });

      // Handle the response as needed
      if (response.ok) {
        // Handle success
        console.log('Answers submitted successfully');
      } else {
        // Handle error
        console.error('Failed to submit answers');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting answers:', error);
    }
  },
   
  },
};
</script>

<template>
  <div class="doQuestPageBody">
    <div class="doQuestHeader" v-if="searchAllList.questionnaire">
      <span>{{ searchAllList.questionnaire.startDate }}~~{{ searchAllList.questionnaire.endDate }}</span>
      <h6>問卷名稱:{{ searchAllList.questionnaire.title }}</h6>
      <h6>問卷描述:{{ searchAllList.questionnaire.description }}</h6>
    </div>
    <div class="backToFix" v-if="page === 1">
      <div class="fixedQuest">
        <div>
      <label for="name">Name</label>
      <input v-model="doquestArr.name" type="text" id="name">
    </div>
    <div>
      <label for="phoneNumder">PhoneNumber</label>
      <input v-model="doquestArr.phoneNumder" type="text" id="phoneNumder">
    </div>
    <div>
      <label for="email">Email</label>
      <input v-model="doquestArr.email" type="text" id="email">
    </div>
 
    
      </div>
      <div class="fluidQuest">
        <div v-for="(question, questionIndex) in searchAllList.questionList" :key="questionIndex">
          <label>問題 {{ questionIndex + 1 }}: {{ question.qTitle }}</label>


          <div v-if="question.optionsType === 'radio'">
  <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
    <input
      type="radio"
      :id="'q_' + questionIndex + '_o_' + optionIndex"
      :value="option"
      v-model="question.userResponse"
    />
    <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
  </div>
</div>

<!-- 多选部分 -->
<div v-else-if="question.optionsType === 'checkbox'">
  <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
    <input
      type="checkbox"
      :id="'q_' + questionIndex + '_o_' + optionIndex"
      :value="option"
      v-model="question.userResponse"
    />
    <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
  </div>
</div> </div> </div>
      <button @click="confirmAnswers">確認送出</button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.doQuestPageBody {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  color: #fff;
  min-height: 95vh;
}

.doQuestHeader {
  width: 900px;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #2c2c2c;
}

.fixedQuest {
  width: 900px;
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
  margin: 10px 0;
}

.fixedQuest label {
  width: 100px;
  font-weight: bold;
  color: #fff;
}

.fixedQuest input {
  flex: 1;
}

.fluidQuest {
  width: 900px;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  background-color: #2c2c2c;
}

.fluidQuest label {
  font-weight: bold;
  color: #fff;
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
</style>
