<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      showDia: false,
      startDate:'',
      endDate:'',
      showDialog: false,
      selectedQuests: [], // 存储选中的问卷的索引数组
      questArr: [],
      selectedQuestionType: "radio",
      questionTypes: ["radio", "checkbox", "text"],
      today: ''      // 存放今天的日期
    }
  },mounted() {
    this.setToday(); // 设置今天的日期作为最小日期
  },
  methods: {
    setToday() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;  // 月份是从 0 开始的，所以加 1
      const day = today.getDate();
      this.today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      this.startDate = this.today; // 设置初始值为今天
    },
    editQuestionnaire(index) {
      // 導航到一個頁面，用戶可以在該頁面上編輯問卷內容
      this.$router.push(`/editQuestionnairePage/${index}`);
    },
  
    ShowWriteDai() {
      this.showDia = true;
    },

    CloseWriteDai() {
      this.showDia = false;
    },
    createNewQuest() {
      if (this.questArr.length < 10) {
        const newQuestion = {
          questionType: 'radio',
          question: [],
          options: [],
        };
        this.questArr.push(newQuestion);
      } else {
        alert("問卷中的問題數量不能超過10個。");
      }
    },
    createNewOptions(questionIndex) {
      const maxOptions = 4;
      if (this.questArr[questionIndex].options.length < maxOptions) {
        const newOption = {
          text: '',
        };
        this.questArr[questionIndex].options.push(newOption);
      } else {
        alert("每個問題的選項數量不能超過4個。");
      }
    },

    deleteNewQuest(questionIndex) {

      if (this.questArr.length > 1) {
        this.questArr.splice(questionIndex, 1);
      } else {
        alert("至少需要保留一個問題。");
      }
    },
    deleteNewOptions(questionIndex, optionIndex) {
      this.questArr[questionIndex].options.splice(optionIndex, 1);
    },
    saveNewQuestPages() {
      const newQuestionnaire = {
        questionName: this.questionName,
        description: this.description,
        startTime: this.startTime,
        endTime: this.endTime,
        questions: this.questArr,
        userResponse: []   //新增儲存回答區域
      };
      this.questArrLocal.push(newQuestionnaire);
      localStorage.setItem("questArrLocal", JSON.stringify(this.questArrLocal));
      alert("已經成功儲存問卷");
      this.showDia = false;
      this.questionName = "";
      this.description = "";
      this.startTime = "";
      this.endTime = "";
      this.questArr = [];  // 如果需要重置问题数组的内容，你可以根据实际情况添加或删除此行

    },
     deleteSelectedQuests() {
      // 根据选中的索引删除相应的问卷
      this.selectedQuests.sort((a, b) => b - a); // 降序排列以免索引错位

      this.selectedQuests.forEach(index => {
        this.questArrLocal.splice(index, 1);
      });
      localStorage.setItem("questArrLocal", JSON.stringify(this.questArrLocal));
      // 清空选中状态
      this.selectedQuests = [];
    },
    // 其他方法...
    postToDB() {
      const newQuestionnaire = {
        questionnaire: {
          title:this.title,
          published:this.published,
          description:this.description,
          startDate:this.startDate,
          endDate:this.endDate,
        },
        questionList: [{
          quId:this.quId,
          qnId:this.qnId,
          qTitle:this.qTitle,
          optionsType:this.optionsType,
          necessary:this.necessary,
          options:this.options
        }
        ],
    
      };
      const requestBody = JSON.stringify(newQuestionnaire);
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
        })
        .catch(error => console.error('Error:', error));
    }

  },
  components: {
    RouterLink
  }
}


</script>
<template>
  <img src="../views/askAllPage/askHome.vue" alt="">
  <div class="askUserPage">
    <div class="askHeader">
      <h1><b>問卷調查局</b></h1>
      <div>
        <RouterLink class="btn" to="/signUp">註冊</RouterLink>
        <button class="btn" v-on:click="ShowDialog">登入</button>
      </div>
    </div>
    <div class="askMainPage">
      <div class="search">
        <input class="searchText" type="text" placeholder="請輸入搜尋內容……">
        <i class="fa-solid fa-magnifying-glass  "></i>
      </div>
      <br>
      <div class="daysearch">
        <h1>開始</h1>
        <h1>/</h1>
        <h1>結束</h1>
        <input type="date" name="bday" />
        <input type="date" name="bday" />
        <button class="searchButton ">搜尋</button>
        <button @click="deleteSelectedQuests"> <i class="fa-solid fa-trash fs-2"></i></button>
        <button @:click="ShowWriteDai"> <i class="fa-solid fa-plus fs-2 "></i></button>
      </div>
      <div class="showList">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>＃</th>
              <th>問卷</th>
              <th>狀態</th>
              <th>開始時間</th>
              <th>結束時間</th>
              <th>觀看統計</th>
              <th>更改</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quest, index) in questArrLocal" :key="index">
              <td>
                <input type="checkbox" v-model="selectedQuests" :value="index" class="checkboxsize">
              </td>
              <td>{{ index + 1 }}</td>
              <td> <router-link :to="'/askAllPage/doQuestPage/' + index">{{ quest.questionName }}</router-link></td>
              <td>狀態</td>
              <td>{{ quest.startTime }}</td>
              <td>{{ quest.endTime }}</td>
              <td>觀看統計</td>
              <td><i class="fa-solid fa-pencil" @click="editQuestionnaire(index)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="ShowWriteDai" v-if="showDia">

      <div class="dialog1">
        <div class="tyty">
          <button @:click="CloseWriteDai">X</button>
        </div>
        <h1>新增問卷</h1>
        <br>
        <div class="dispalyset">
          <h3>問卷名稱 :</h3>

          <input type="text" placeholder="請輸入問卷名稱" class="askheadtitle" v-model="this.title">

        </div>
        <br>
        <div class="dialog1first">

          <h3>開始時間 :</h3>
          <input type="date" name="bday" v-model="this.startDate" :min="today" />
          <h3> / </h3>
          <h3>結束時間 :</h3>
          <input type="date" name="bday" v-model="this.endDate" :min="today" />

          <button v-on:click="createNewQuest()">新增問題</button>

          <div class="dialog1firstbutton">

          </div>

        </div>
        <div class="createQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
          <!-- 第一個Vfor做出每一個題目 -->
          <label>第{{ questionIndex + 1 }}題</label>
          <select v-model="quest.questionType">
            <option v-for="(type, index) in questionTypes" :key="index" :value="type">{{ type === 'radio' ? '單選' : type
              === 'checkbox' ? '複選' : '簡答' }}</option>
          </select>
          <input type="text" v-model="quest.question" placeholder="輸入題目">
          <button @click="createNewOptions(questionIndex)">新增選項</button>

          <!-- selected是在input標籤在選擇radio或checkbox時，才會新增selected屬性在該選項上面 
    單選為on 複選為true-->
          <div class="NewOptions" v-for="(option, optionIndex) in quest.options" :key="optionIndex">
            <input v-if="quest.questionType === 'radio'" type="radio" name="radioGroup"
              v-model="quest.options[optionIndex].selected">
            <input v-if="quest.questionType === 'checkbox'" type="checkbox" v-model="quest.options[optionIndex].selected">
            <input type="text" placeholder="輸入選項" v-model="quest.options[optionIndex].text">
            <button style="background-color: rgb(175, 175, 175);"
              @click="deleteNewOptions(questionIndex, optionIndex)">刪除選項</button>
          </div>

          <button style="margin-left: 43px; background-color: rgb(175, 175, 175);"
            v-on:click="deleteNewQuest(questionIndex)">刪除問題</button>
        </div>
        <br>

        <button v-on:click="postToDB()">Post to DB</button>

        <button class="continuebutton" v-on:click="saveNewQuestPages()">儲存本次問卷</button>

        <br>
        <hr>

      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
.btn {
  font-size: 16pt;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 5vw;
  background-color: rgb(223, 223, 223);
}

.icon {
  font-size: 28pt;

}


.askUserPage {
  background-color: rgb(126, 126, 126);
  border: 0px solid rgb(214, 255, 68);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .askHeader {
    justify-content: space-around;
    align-items: center;
    display: flex;
    font-size: 16pt;
    padding: 5px;


  }

  .askMainPage {
    display: flex;
    border: 0px solid rgb(203, 255, 59);
    height: 80vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;


    .search {
      width: 40vw;
      display: flex;
      justify-content: space-around;
      height: 5vh;
      border: 0px solid rgb(0, 0, 0);
      align-items: center;
      font-size: 28pt;

      .searchText {
        width: 50vw;
        font-size: 18pt;
      }

    }





    .daysearch {
      width: 50vw;

      display: flex;
      justify-content: space-around;
      border: 0px solid rgb(0, 0, 0);

      .searchButton {
        width: 7vw;

      }
    }

    .showList {
      margin-top: 15px;
      width: 80vw;
      height: 450px;
      max-height: 400px;
      /* 设置最大高度以防止表格过长 */
      border: 1px solid #ccc;
      /* 圆角边框 */
      overflow: auto;
      /* 添加滚动条，以防表格内容过长 */
      background-color: #e9e9e9;

      /* 设置白色背景 */
      .checkboxsize {
        width: 20px;
        /* 可以根據需要調整寬度 */
        height: 20px;
        /* 可以根據需要調整高度 */

      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        /* 移除表格间距 */
      }

      th,
      td {
        border: 1px solid #868686;
        padding: 10px;
        text-align: center;
      }

      th {
        background-color: #a0a0a0;
        /* 表头背景颜色 */
      }

      tr:nth-child(even) {
        background-color: #c7c7c7;
        /* 隔行背景颜色 */
      }
    }

   
  }

  .ShowWriteDai {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    z-index: 999;

    .dialog1 {
      width: 60vw;
      height: 80vh;
      background: white;
      color: #000000;
      text-align: left;
      padding: 50px 100px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      border: 1px solid rgb(0, 0, 0);
      overflow: auto;



      .dispalyset {
        display: flex;
        border: 0px solid rgb(0, 0, 0);
        width: 50vw;

        .askheadtitle {
          font-size: 18pt;
          width: 40vw;
        }

      }

      .dialog1first {
        display: flex;
        border: 0px solid rgb(0, 0, 0);

        .dialog1firstbutton {
          position: relative;
          left: 10vw;
        }

      }



      .tyty {
        position: relative;
        font-size: 25pt;
        left: 105%;
        bottom: 5%;
        border: 0px solid rgb(0, 0, 0);
        width: 3vw;

      }

      .createQuest {
        margin-top: 15px;
        width: 900px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        background-color: #fff;

        label {
          font-weight: bold;
        }

        input[type="text"] {
          margin-top: 15px;
          margin-bottom: 15px;
          width: 80%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 15px;
        }

        input[type="radio"] {
          margin-right: 29px;
        }

        button {
          background-color: #007BFF;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }

    .continuebutton {
      position: relative;
      left: 85%;
    }
  }


}</style>