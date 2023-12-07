<script>
export default {
  data() {
    return {
      searchAllList: {
        questionnaire: [],
        questionList: [],
      },
      title: '',
      startDate: '',
      endDate: '',
      questArr: [],
      description: '',
      published: true, // Initialize published as false
      questionTypes: ['radio', 'checkbox', 'text'],
      questionnaire:{
                title:'',
                description:'',
                published:false,
                startDate:'',
                endDate:'',
            },
            questionList:[
                {
                quid:1,
                qTitle:'',
                optionType:'',
                necessary:false,
                options:''
                },
            ]
    };
  },
  computed: {
    minStartDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const formattedToday = today.toISOString().split('T')[0];
      return formattedToday;
    },
  },
  methods: {
    createNewQuest() {
      if (this.questArr.length >= 10) {
        alert('最多只能添加十个问题。');
        return;
      }
      const newQuestion = {
        quid: this.questArr.length + 1,  // 使用题目的索引作为 quid

        questionType: 'radio', // 設置默認的問題類型
        question: '',
        options: [],
      };
      this.questArr.push(newQuestion);
    },

    createNewOptions(questionIndex) {
      if (this.questArr[questionIndex].options.length >= 4) {
        alert('每个问题最多只能添加四个选项。');
        return;
      } 
      const newOption = {
        text: '',
        selected: false,
      };
      this.questArr[questionIndex].options.push(newOption);
    },

    deleteNewQuest(questionIndex) {
      if (this.questArr.length > 1) {
        this.questArr.splice(questionIndex, 1);
      } else {
        alert('至少需要保留一个问题。');
      }
    },

    deleteNewOptions(questionIndex, optionIndex) {
      this.questArr[questionIndex].options.splice(optionIndex, 1);
    },

    postToDB() {
      if (!this.title || !this.startDate || !this.endDate) {
        alert('请填写所有必填项');
        return;
      }// 檢查時間
      const startDateTime = new Date(this.startTime);
            const endDateTime = new Date(this.endTime);

            if (endDateTime <= startDateTime) {
                alert('結束時間不能早於或等於開始時間。');
                return;
            }

      // 清空questionList
      this.searchAllList.questionList = [];

      // 将questArr转换为questionList格式
      this.questArr.forEach((quest, id) => {
        const questionData = {
          // quid: this.questArr.length + 1,  // 使用题目的索引作为 quid
          quId: id+1,  // 使用题目的索引作为 quid
          qTitle: quest.question,
          optionsType: quest.questionType,
          necessary: false,
          options: quest.options.map((option) => option.text).join(';'),
        };
        // 添加到数组
        this.searchAllList.questionList.push(questionData);
      });

      const newQuestionnaire = {
        questionnaire: {
          title: this.title,
          description: this.description,
          published: this.published,
          startDate: this.startDate,
          endDate: this.endDate,
        },
        questionList: this.searchAllList.questionList,
      };
      console.log(this.searchAllList.questionList)

      fetch('http://localhost:8080/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestionnaire),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // 处理返回的数据，更新组件状态等
        })
        .catch((error) => console.error('Error:', error));

      alert('新增问卷成功');
      this.$router.push('/questHome');
    },

    togglePublishedStatus() {
      this.published = !this.published;
    },
  },
};
</script>

<template>
  <div class="createQuestPageBody">
    <div class="createQuestHeader">
      <div>
        <h1>新しいアンケートを作成</h1>
        <button @click="togglePublishedStatus" :style="{ 'background-color': published ? 'red' : 'green' }">
          {{ published ? 'アンケートを閉じる' : 'アンケートを開く' }}
        </button>
        <div>
          <label for="">アンケートの名前</label>
          <input style="width: 79%;" type="text" v-model="title">
        </div>
      </div>
      <div>
        <label for="">説明</label>
        <input style="width: 90%;" type="text" v-model="description">
      </div>
      <div>
        <label for="">アンケート開始日</label>
        <input type="date" v-model="startDate" :min="minStartDate">
        <label for="">アンケート終了日</label>
        <input type="date" v-model="endDate" :min="minStartDate">
      </div>
      <div>
        <button @click="createNewQuest()">質問を追加</button>
        <button v-on:click="postToDbNotPublishedYet()">一時的に公開しない</button>
        <button @click="postToDB()" style="background-color: rgb(128, 179, 255);">アンケートを公開</button>
      </div>
    </div>

    <div>
      <!-- 各質問をquestArr内で繰り返す -->
      <div class="createQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
        <!-- 質問タイプのドロップダウン -->
        <label>第{{ questionIndex + 1 }}問</label>
        <select v-model="quest.questionType">
          <option v-for="(type, index) in questionTypes" :key="index" :value="type">
            {{ type === 'radio' ? '単一選択' : type === 'checkbox' ? '複数選択' : '記述' }}
          </option>
        </select>

        <!-- 質問の入力 -->
        <input type="text" v-model="quest.question" placeholder="質問を入力">

        <!-- オプションを追加するボタン -->
        <button @click="createNewOptions(questionIndex)">オプションを追加</button>

        <!-- オプションを表示する -->
        <div class="NewOptions" v-for="(option, optionIndex) in quest.options" :key="optionIndex">
          <input v-if="quest.questionType === 'radio'" type="radio" name="radioGroup" v-model="quest.options[optionIndex].selected">
          <input v-if="quest.questionType === 'checkbox'" type="checkbox" v-model="quest.options[optionIndex].selected">
          <input type="text" placeholder="オプションを入力" v-model="quest.options[optionIndex].text">
          <button style="background-color: rgb(145, 145, 145);" @click="deleteNewOptions(questionIndex, optionIndex)">オプションを削除</button>
        </div>
        <br>
        <!-- 質問を削除するボタン -->
        <button style="margin-left: 43px; background-color: rgb(77, 77, 77);" @click="deleteNewQuest(questionIndex)">質問を削除</button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.createQuestPageBody {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  padding: 20px;
  min-height: 90vh;

  .createQuestHeader {
    width: 900px;
    color: #ecf0f1;
    height: auto;
    border: 1px solid #34495e;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    background-color: #2c3e50;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      width: 100%;
      margin: 10px 0;
    }

    label {
      font-weight: bold;
      margin-right: 5px;
      color: #ecf0f1;
    }

    input[type="text"],
    input[type="date"] {
      width: 30%;
      padding: 10px;
      border: 1px solid #34495e;
      border-radius: 5px;
      margin-bottom: 10px;
      margin-right: 5px;
      color: #34495e;
      background-color: #ecf0f1;
    }

    input[type="date"] {
      height: auto;
    }

    button {
      background-color: #3498db;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
      transition: background-color 0.3s;
    }

    button+button {
      margin-left: 10px;
    }

    button:hover {
      background-color: #2980b9;
    }
  }

  .createQuest {
    margin-top: 15px;
    width: 900px;
    border: 1px solid #34495e;
    border-radius: 10px;
    padding: 20px;
    background-color: #2c3e50;

    label {
      font-weight: bold;
      color: #ecf0f1;
    }

    input[type="text"] {
      margin-top: 15px;
      margin-bottom: 15px;
      width: 80%;
      padding: 10px;
      border: 1px solid #34495e;
      border-radius: 5px;
      margin-right: 15px;
      color: #34495e;
      background-color: #ecf0f1;
    }

    input[type="radio"] {
      margin-right: 29px;
    }

    button {
      background-color: #3498db;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #2980b9;
    }
  }
}
</style>
