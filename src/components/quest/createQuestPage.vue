<script>
export default {
    data() {
        return {
            searchAllList: {
                questionnaire: [],
                questionList: [{
                optionsType: ["radio", "checkbox", "text"],
                qTitle: '',
                options: ["",""],
            }]
            },
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            questArr: [],
            optionsType: ["radio", "checkbox", "text"],
           

        }
    }, computed: {
        // 計算屬性，用於設置最小日期
        minStartDate() {
            const today = new Date();
            // 將日期加一天，以確保能夠選擇今天以後的日期
            today.setDate(today.getDate() + 1);
            // 將日期轉換為 "yyyy-mm-dd" 格式
            const formattedToday = today.toISOString().split('T')[0];
            return formattedToday;
        },
    },
    methods: {
        createNewQuest() {
            if (this.questArr.length >= 10) {
                alert("最多只能添加十个问题。");
                return;
            }
            const newQuestion = {
                questionType: '',
                qTitle: '',
                optionsType: '',
                options: [],
                questionText: '',
                optionText: ''
            };
            this.questArr.push(newQuestion);
            this.questionList.push(newQuestion);

        },

        createNewOptions(questionIndex) {
            if (this.questArr[questionIndex].options.length >= 4) {
                alert("每个问题最多只能添加四个选项。");
                return;
            }
            const newOption = {
                text: ''
            };
            this.questArr[questionIndex].options.push(newOption);
        },
        deleteNewQuest(questionIndex) {
            if (this.questArr.length > 1) {
                this.questArr.splice(questionIndex, 1);
            } else {
                alert("至少需要保留一个问题。");
            }
        },
        deleteNewOptions(questionIndex, optionIndex) {
            this.questArr[questionIndex].options.splice(optionIndex, 1);
        },
        postToDB() {
            // 檢查必填項目
            if (!this.title || !this.startDate || !this.endDate) {
                alert("請填寫所有必填項目");
                return; // 不進行 POST 請求和跳轉
            }
            const newQuestionnaire = {
                questionnaire: {
                    title: this.title,
                    startDate: this.startDate,
                    endDate: this.endDate,
                },
                questionList: this.questionList,
            };


            fetch('http://localhost:8080/api/quiz/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestionnaire)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();

                })
                .then(data => {
                    console.log(data);
                    this.searchAllList.questionnaire = data.quizVoList.map(item => item.questionnaire);
                    this.searchAllList.questionList = data.quizVoList.map(item => item.questionList);
                    console.log(this.searchAllList.questionList);
                })
                .catch(error => console.error('Error:', error));
            alert("新增問卷成功")
            this.$router.push('/questHome');


        }
    }
}
</script>

<template>
    ///問題arr:{{questArr}}
    <div class="createQuestPageBody">
        <div class="createQuestHeader">
            <div>
                <h1>新增問卷</h1>
                <label for="">問卷名稱</label>
                <input style="width: 90%;" type="text" name="" id="" v-model="this.title">
            </div>

            <div>
                <label for="">問卷開始時間</label>
                <input type="date" name="" id="" v-model="this.startDate" :min="minStartDate">
                <label for="">問卷結束時間</label>
                <input type="date" name="" id="" v-model="this.endDate" :min="minStartDate">
            </div>
            <div>
                <button v-on:click="createNewQuest()">新增問題</button>
                <button v-on:click="postToDB()" style="background-color: red;">Post to DB</button>
            </div>
        </div>

        <div class="createQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
            <label>第{{ questionIndex + 1 }}题</label>
            <select v-model="quest.optionsType">
                <option v-for="(type, index) in optionsType" :key="index" :value="type">
                    {{ type === 'radio' ? '单选' : type === 'checkbox' ? '复选' : '简答' }}
                </option>
            </select>
            <input type="text" v-model="quest.qTitle" placeholder="输入题目">
            <button @click="createNewOptions(questionIndex)">新增选项</button>

            <div class="NewOptions" v-for="(option, optionIndex) in quest.options" :key="optionIndex">
                <input v-if="quest.optionsType === 'radio'" type="radio" name="radioGroup" v-model="option.selected">
                <input v-if="quest.optionsType === 'checkbox'" type="checkbox" v-model="option.selected">
                <input type="text" placeholder="输入选项" v-model="option.text">
                <button style="background-color: red;" @click="deleteNewOptions(questionIndex, optionIndex)">删除选项</button>
            </div>

            <button style="margin-left: 43px; background-color: rgb(70, 70, 70);" @click="deleteNewQuest(questionIndex)">删除问题</button>
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
