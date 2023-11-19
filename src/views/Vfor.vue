<script>
import askDetail from "./../components/askDetail.vue"

export default {
    data() {
        return {
            showDia: false,
            selectedOption: "",
            options: ["選擇題",],
            questionForms: [],
            textarea: "",

         


            questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
            questionName: '',
            description: '',
            startTime: '',
            endTime: '',
            questArr: [],
            selectedQuestionType: "radio",
            questionTypes: ["radio", "checkbox", "text"],


            page: 1,
             
        }
    },
    methods: {
        logout() {
            // 清除用户认证状态（这里示例清除本地存储中的令牌）
            localStorage.removeItem("userToken");

            // 导航到登出页面或首页
            this.$router.push("/askDetail"); // 或者使用首页路径
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

        },
        
      

      
    
 
  },
  

    
    components: {
        askDetail,
  
    }
}




</script>
<template>
    <askDetail />

    <div class="icon">
     
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
</template>
<style lang="scss" scoped>
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

        .dialog1content {
            border: 1px solid rgb(0, 0, 0);
            height: 30vh;

            .asktitle {
                display: flex;

            }

            .askcont {
                display: flex;
                border: 1px solid rgb(0, 0, 0);
                height: 25vh;

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

.icon {
    position: relative;
    bottom: 85%;
    left: 80%;
    width: 10vw;
    border: 0px solid black;
    justify-content: space-around;
    display: flex;
    font-size: 18pt;
}

</style>