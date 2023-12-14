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
      ansArr:[],
      ans:{
        quizId: "",
        ansNumber:0 ,
        optionsType:"" ,
        ans: "",
       
        che:[],
      
      },
    };
  },
  computed: {


  },

  mounted() {
    this.set_ansArr(); // 调用初始化方法

    this.getQuizInfo();

  },
  methods: {
    set_ansArr() {
  for (let i = 0; i < this.searchAllList.questionList.length; i++) {
    this.ansArr.push({
      quizId: "",
      ansNumber: 0,
      optionsType: "",
      ans: "",
     
      che: [],
     
    });
  }
  console.log(this.ansArr);
},
    getQuizInfo() {
      const questionnaireIdToFind = this.$route.params.wantId;
      this.questionnaireId = questionnaireIdToFind;

      this.doquestArr = {}; // 使用 doquestArr 替代 
      if (this.searchAllList.questionList) {

        for (const question of this.searchAllList.questionList) {
          if (question.questionType === 'text') {
            // 处理文本类型问题
            this.doquestArr[question.questionId] = ''; // 或者初始化为其他默认值
          } else if (question.optionsType === 'radio' || question.optionsType === 'checkbox') {
            // 处理单选或多选类型问题
            for (let i = 0; i < question.options.split(';').length; i++) {
              const key = question.questionId + '_' + i;
              this.doquestArr[key] = false; // 初始化为 false，表示未选中
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
            this.set_ansArr()
          } else {
            console.error('Quiz data not found for questionnaire ID: ', questionnaireIdToFind);
          }
        })
        .catch((error) => console.error('Error:', error));
    },


    async userCreate() {
      if (!this.doquestArr.name || !this.doquestArr.phoneNumber || !this.doquestArr.email) {
          // 提示用户输入姓名、电话号码和电子邮件
          // 你可以使用适当的 UI 库或弹出框库来显示提示信息
          alert("需要全部輸入");

          return;
        }  
  const userResponse = {
    
    user: {
      quizId: this.questionnaireId,
      name: this.doquestArr.name,
      phoneNumber: this.doquestArr.phoneNumber,
      email: this.doquestArr.email,
    },
    userAnswerList: this.ansArr.map((answer, index) => {
      return {
        quizId: this.questionnaireId,
        ansNumber: index + 1,
        optionsType: this.searchAllList.questionList[index].optionsType,
        ans: this.searchAllList.questionList[index].optionsType === 'checkbox'
    ? answer.che.join(';')  // 如果是 checkbox，将数组转换为分号分隔的字符串
    : answer.ans,
      };
    }),
  };
console.log(userResponse);

  try {
    const response = await fetch('http://localhost:8080/api/quiz/createUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userResponse),
    });

    // 處理響應
    if (response.ok) {
      alert("填寫問卷成功");
      console.log('Answers submitted successfully');
    } else {
      console.error('Failed to submit answers');
    }
  } catch (error) {
    // 處理網絡或其他錯誤
    console.error('Error submitting answers:', error);
  }
}


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
          <input v-model="doquestArr.phoneNumber" type="text" id="phoneNumder">
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="doquestArr.email" type="text" id="email">
        </div>


      </div>
      <div class="fluidQuest">
        <div v-for="(question, index) in searchAllList.questionList" :key="index">
          <label>問題 {{ index + 1 }}: {{ question.qTitle }}</label>


          <div v-if="question.optionsType == 'radio'">
  <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
    <input type="radio" :id="'q_' + index + '_o_' + optionIndex" :value="option"
      v-model="ansArr[index].ans"  />
    <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
  </div>
</div>

<div v-if="question.optionsType == 'checkbox'">
  <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
    <input type="checkbox" :id="'q_' + index + '_o_' + optionIndex" :value="option"
      v-model="ansArr[index].che" :name="index" />
    <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
  </div>
</div>

<div v-if="question.optionsType == 'text'" class="input-wrapper">
  <input type="text" v-model="ansArr[index].ans">
</div>
        </div>

      </div>
      <button @click="userCreate()" class="submit-button">確認送出</button>

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

}
</style>
