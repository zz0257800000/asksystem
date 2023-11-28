<script>
import previewdoQuestPage from '../quest/previewDoQuestPage.vue';

export default {
  props: {
    checkinfo: Object,
  },
  data() {
    return {
      searchAllList: {
        questionnaire: [], // Change to null to indicate no data loaded initially
        questionList: [],
      },
      doquestArr: {
        userName: '',
        userPhone: '',
        userEmail: '',
        userAge: '',
      },
      userResponses: [],
      

      page: 1,
    };
  },
  mounted() {
    this.getQuizInfo();
  },
  watch: {
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
        // Assuming the response data is an object with questionnaire and questionList properties
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
    goToPreviewPage() {
      this.page = 2;
    },
    backToQuestPage() {
      this.page = 1;
    },
  },
  components: {
    previewdoQuestPage,
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
      <div class="backToFix" v-if="this.page == 1">
            <div class="fixedQuest">
                <div>
                    <label for="">姓名</label>
                    <input type="text" v-model="doquestArr.userName">
                </div>
                <div>
                    <label for="">手機</label>
                    <input type="text" v-model="doquestArr.userPhone">
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="text" v-model="doquestArr.userEmail">
                </div>
                <div>
                    <label for="">年齡</label>
                    <input type="text" v-model="doquestArr.userAge">
                </div>
            </div>

            <div class="fluidQuest">
    <div v-for="(question, questionIndex) in searchAllList.questionList" :key="questionIndex">
        <label>問題 {{ questionIndex + 1 }}: {{ question.qTitle }}</label>

        <div v-if="question.optionsType === 'Qz'">
            <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
                <input type="radio" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option"
                    v-model="question.selectedOption">
                <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
            </div>
        </div>

        <div v-else-if="question.optionsType === 'Mz'">
            <div v-for="(option, optionIndex) in question.options.split(';')" :key="optionIndex">
                <input type="checkbox" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option"
                    v-model="question.selectedOptions">
                <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
            </div>
        </div>

        <div v-else-if="question.optionsType === 'Text'">
            <input type="text" v-model="question.userResponse">
        </div>
    </div>
    <button @click="goToPreviewPage">預覽填寫結果</button>
</div>
        </div>
        </div>



        <div class="showPreviewPage" v-if="this.page == 2">
            <previewdoQuestPage :checkinfo="doquestArr" />
            <button type="button" @click="backToQuestPage()">返回修改</button>
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

        div {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }

        label {
            width: 100px;
            font-weight: bold;
            color: #fff;
        }

        input {
            flex: 1;
        }
    }

    .fluidQuest {
        width: 900px;
        border: 1px solid #333;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        background-color: #2c2c2c;
    }

    label {
        font-weight: bold;
        color: #fff;
    }

    input[type="radio"] {
        margin-right: 10px;
    }

    button {
        background-color: #3498db;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 10px;
    }

    button:hover {
        background-color: #2980b9;
    }
}
</style>
