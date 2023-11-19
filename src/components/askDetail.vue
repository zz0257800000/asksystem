<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      showDia: false,
            
      showDialog: false,
      username: "",
      password: "",
      loginFailed: false,
      selectedQuests: [], // 存储选中的问卷的索引数组

      questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
            questionName: '',
            description: '',
            startTime: '',
            endTime: '',
            questArr: [],
            selectedQuestionType: "radio",
            questionTypes: ["radio", "checkbox", "text"],
    }
  },
  methods: {
    ShowDialog() {
      this.showDialog = true;
    },

    closeDialog() {
      this.showDialog = false;
    },
    ShowWriteDai() {
            this.showDia = true;
        },

        CloseWriteDai() {
            this.showDia = false;
        },
        
        ChangePage() {
            this.page = 2
        },
        BackPage() {
            this.page = 1
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
    login() {
      const enteredUsername = this.enteredUsername;
      const enteredPassword = this.enteredPassword;


      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const user = registeredUsers.find((user) => user.username === enteredUsername && user.password === enteredPassword);
      // 检查输入是否为空



      if (user) {
        alert("登录成功");

        return this.$router.push({ name: 'Vfor' });




      } else {
        alert("登录失败，请检查用户名和密码");

        this.loginFailed = true;
        this.enteredUsername = "";
        this.enteredPassword = "";

        setTimeout(() => {
          this.loginFailed = false;
        }, 2000);
        return;

      }
    }, deleteSelectedQuests() {
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
            </tr>
          </thead>
          <tbody>
        <tr v-for="(quest, index) in questArrLocal" :key="index">
          <td>
            <input type="checkbox" v-model="selectedQuests" :value="index">
          </td>
          <td>{{ index + 1 }}</td>
          <td>  <router-link :to="'/askAllPage/doQuestPage/' + index">{{ quest.questionName }}</router-link></td>
          <td>狀態</td>
          <td>{{ quest.startTime }}</td>
          <td>{{ quest.endTime }}</td>
          <td>觀看統計</td>
        </tr>
      </tbody>
        </table>
      </div>


      <div class="login-box" v-if="showDialog">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input type="text" v-model="enteredUsername" required="" :disabled="loginFailed">
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" v-model="enteredPassword" required="" :disabled="loginFailed">
            <label>Password</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <button @click="login" :disabled="loginFailed">
              <RouterLink to="/Vfor">Submit</RouterLink>
            </button>
            <button style="user-select: none;" class="tyty" @click="closeDialog">X</button>

          </a>
        </form>
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

        <input type="text" placeholder="請輸入問卷名稱" class="askheadtitle" v-model="this.questionName">

    </div>
    <br>
    <div class="dialog1first">

        <h3>開始時間 :</h3>
        <input type="date" name="bday" v-model="this.startTime" />
        <h3> / </h3>
        <h3>結束時間 :</h3>
        <input type="date" name="bday" v-model="this.endTime" />
        
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
        <input v-if="quest.questionType === 'checkbox'" type="checkbox"
            v-model="quest.options[optionIndex].selected">
            <input type="text" placeholder="輸入選項" v-model="quest.options[optionIndex].text">
        <button style="background-color: rgb(175, 175, 175);" @click="deleteNewOptions(questionIndex, optionIndex)">刪除選項</button>
    </div>

    <button style="margin-left: 43px; background-color: rgb(175, 175, 175);"
        v-on:click="deleteNewQuest(questionIndex)">刪除問題</button>
</div>
    <br>

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
.searchButton{
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

    .login-box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      padding: 40px;
      transform: translate(-50%, -50%);
      background: rgb(0, 0, 0);
      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(151, 151, 151, 0.6);
      border-radius: 10px;
    }

    .login-box h2 {
      margin: 0 0 30px;
      padding: 0;
      color: #fff;
      text-align: center;
    }

    .login-box .user-box {
      position: relative;
    }

    .login-box .user-box input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;
    }

    .login-box .user-box label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      pointer-events: none;
      transition: .5s;
    }

    .login-box .user-box input:focus~label,
    .login-box .user-box input:valid~label {
      top: -20px;
      left: 0;
      color: #03e9f4;
      font-size: 12px;
    }

    .login-box form a {
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      color: #03e9f4;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      transition: .5s;
      margin-top: 40px;
      letter-spacing: 4px
    }

    .login-box a:hover {
      background: #03e9f4;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 50px #03e9f4,
        0 0 100px #03e9f4;
    }

    .login-box a span {
      position: absolute;
      display: block;
    }

    .login-box a span:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #03e9f4);
      animation: btn-anim1 1s linear infinite;
    }

    @keyframes btn-anim1 {
      0% {
        left: -100%;
      }

      50%,
      100% {
        left: 100%;
      }
    }

    .login-box a span:nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #03e9f4);
      animation: btn-anim2 1s linear infinite;
      animation-delay: .25s
    }

    @keyframes btn-anim2 {
      0% {
        top: -100%;
      }

      50%,
      100% {
        top: 100%;
      }
    }

    .login-box a span:nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, #03e9f4);
      animation: btn-anim3 1s linear infinite;
      animation-delay: .5s
    }

    @keyframes btn-anim3 {
      0% {
        right: -100%;
      }

      50%,
      100% {
        right: 100%;
      }
    }

    .login-box a span:nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, #03e9f4);
      animation: btn-anim4 1s linear infinite;
      animation-delay: .75s
    }

    @keyframes btn-anim4 {
      0% {
        bottom: -100%;
      }

      50%,
      100% {
        bottom: 100%;
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