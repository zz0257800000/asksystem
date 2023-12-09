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
      checkinfo: {}, // 确保初始化为空对象
      ABC: [], // 你的初始化数据
      selectedRadio: null, // 用于存储单选题目的选择


    };
  },
  created() {
    if (this.searchAllList.questionList) {
      this.checkinfo = {};
      for (const question of this.searchAllList.questionList) {
        if (question.questionType === 'text') {
          this.$set(this.checkinfo, question.questionId, '');
        } else if (question.optionsType === 'radio' || question.optionsType === 'checkbox') {
          for (let i = 0; i < question.options.split(';').length; i++) {
            const key = question.questionId + '_' + i;
            this.$set(this.checkinfo, key, ''); // 初始化为空字符串
          }
        }
      }
    }
  },
  mounted() {

    this.getQuizInfo();

  },
  methods: {
    getQuizInfo() {
      const questionnaireIdToFind = this.$route.params.wantId;
      this.questionnaireId = questionnaireIdToFind;

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
    // 在 processSelectedOptions 方法中
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

        // 如果是文本类型问题，将答案直接添加到 ans 中
        ans += answers.join(';') + ';'; // 以分號結尾
      }

      // 去除最後一個分號
      if (ans.endsWith(';')) {
        ans = ans.slice(0, -1);
      }

      console.log(`Answer: ${ans}`);
      this. str = ans;
    },
    // 新增一个方法用于检查是否为文本类型问题
    isTextQuestion(questionId) {
      const question = this.searchAllList.questionList.find(item => item.questionId == questionId);
      return question && question.questionType === 'text';
    },

    async confirmAnswers() {
      try {

        if (!this.doquestArr.name || !this.doquestArr.phoneNumder || !this.doquestArr.email) {
          // 提示用户输入姓名、电话号码和电子邮件
          // 你可以使用适当的 UI 库或弹出框库来显示提示信息
          alert("需要全部輸入");

          return;
        }      // 提示用户输入姓名、电话号码和电子邮件
        this.processSelectedOptions();
        let str = "";
        this.ABC.forEach(e => {
          str = str + e + "";
        })
        const userResponse = {
          userList: [
            {
              quizId: this.questionnaireId,
              phoneNumber: this.doquestArr.phoneNumder,
              name: this.doquestArr.name,
              email: this.doquestArr.email,
              ans: str
            }
          ]
        };

        console.log('userResponse:', userResponse); // 添加这行
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
          alert("填寫問卷成功");

          // this.$router.push('/frontQuestPage');

          console.log('Answers submitted successfully');
        } else {
          // Handle error
          alert("電話名字信箱填寫過");

          console.error('Failed to submit answers');
        }
      } catch (error) {
        // Handle network or other errors
        console.log(JSON.stringify(userResponse));

        console.error('Error submitting answers:', error);
      }
    },

    Checkbox(ONE) {
  // 获取前一个值
  const lastValue = this.ABC[this.ABC.length - 1];

  // 判断是否需要添加 '!'
  const newValue = lastValue ? `!${ONE}` : ONE;

  // 添加新的值
  this.ABC.push(newValue + '');
},

Radio(ZER0) {

  // 如果数组不为空，在前一个值后面添加 ';'
  if (this.ABC.length > 0) {
    this.ABC[this.ABC.length - 1] += ';';
  }

 // 如果 ZER0 未定义或为空字符串，就返回 'null'
  const radioValue = ZER0 !== undefined && ZER0 !== '' ? ZER0 : 'null';

  // 清空 ZER0 的值
  ZER0 = '';

  // 添加新数据到数组
  this.ABC.push(radioValue);
},
Text(questionId) {
  const textValue = this.checkinfo[questionId];
  // 將文本框的值添加到 this.ABC 數組中，如果 textValue 為空，就返回 'null'
  this.ABC.push(textValue !== '' ? textValue : 'null' + ';');
},


  },
};
</script>

<template>
  <div class="doQuestPageBody">
    <div class="doQuestHeader" v-if="searchAllList.questionnaire">
      <span>{{ searchAllList.questionnaire.startDate }}~~{{ searchAllList.questionnaire.endDate }}</span>
      <h6>問卷名稱:{{ searchAllList.questionnaire.title }}</h6>
      <h6>問卷描述:{{ searchAllList.questionnaire.description }}</h6>   {{ JSON.stringify(this.ABC) }}

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
              <input type="radio" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option"
                v-model="checkinfo[question.questionId + '_radio_' + optionIndex]" name="A" @click="Radio(option)" />
              <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
            </div>
          </div>

          <!-- 多选部分 -->
          <div v-else-if="question.optionsType === 'checkbox'">
            <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
              <input type="checkbox" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option"
                v-model="checkinfo[question.questionId + '_o_' + optionIndex]" @click="Checkbox(option)" />
              <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
            </div>
          </div>

          <div v-else-if="question.optionsType === 'text'" class="input-wrapper">
            <input v-model="checkinfo[question.questionId]" type="text" @blur="Text(question.questionId)" />
          </div>
        </div>

      </div>
      <button @click="confirmAnswers" class="submit-button">確認送出</button>

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
