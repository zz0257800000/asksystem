<script>
import askDetail from "./../components/askDetail.vue"
export default{
    data(){
        return{
            showDia: false,
            selectedOption: "",
                options: ["選擇題",  ],
                questionForms: [],
                
                
          
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
        addContent() {
                   
                },
                addQuestionForm() {
                    if (this.questionForms.length < 10) {
                        this.questionForms.push({
                            question: "",
                            answer: ""
                        });
                    }
                },
                removeQuestionForm(index) {
                    this.questionForms.splice(index, 1);
                },
            
  },
  components:{
    askDetail
  }
    }


    

</script>
<template>
 
<askDetail/>

<div class="icon">
    <button @:click="ShowMainDai" > <i class="fa-solid fa-trash fs-2"></i></button>
<button @:click="ShowWriteDai" > <i class="fa-solid fa-plus fs-2 " ></i></button>
</div>
<div class="ShowWriteDai" v-if="showDia">
   
    <div class="dialog1">
        <div class="tyty">
         <button @:click="CloseWriteDai" >X</button>
        </div>
        <h1>新增問卷</h1>
        <br>
        <div class="dispalyset">
         <h3>問卷名稱 :</h3>
      
          <input type="text" placeholder="請輸入問卷名稱" class="asktexttitle">
   
       </div>
       <br>
        <div class="dialog1first">
       
        <h3>開始時間</h3>
        <input type="date" name="bday" />
            
        <h3>結束時間</h3>
        <input type="date" name="bday" />
        <div class="dialog1firstbutton">
            <button @click="removeQuestionForm(index)">删除</button>
        <button @click="addQuestionForm">新增問題</button>
        </div>
        
        </div>
        <div class="dialog1content" v-for="(form, index) in questionForms" :key="index">
            <div class="asktitle">
                <h3>問題{{ index + 1 }}</h3>            <input type="text" style="width: 500px;" placeholder="請輸入問題">
            <select id="select" v-model="selectedOption" @change="addContent">
                <option value="">請選擇</option>
                <option v-for="option in options" :value="option">{{ option }}</option>
            <option value="textarea">問答題</option>
        </select>
        </div>
        <div class="askcont">
            <div v-if="selectedOption">
            <div>
                <input type="radio"  id="radioOption1" name="radioGroup" value="Option 1">
                <input type="text" style="width: 500px;" placeholder="請輸入回答">
            </div>
            <div>
                <input type="radio" id="radioOption2" name="radioGroup" value="Option 2">
                <input type="text" style="width: 500px;" placeholder="請輸入回答">
            </div>
            <div>
                <input type="radio" id="radioOption2" name="radioGroup" value="Option 2">
                <input type="text" style="width: 500px;" placeholder="請輸入回答">
            </div>
            <div>
                <input type="radio" id="radioOption2" name="radioGroup" value="Option 2">
                <input type="text" style="width: 500px;" placeholder="請輸入回答">
            </div> 
        </div>
        </div>
        </div>
        <br>
       
        <button type="button" @click="ChangePage()" class="continuebutton">確認註冊資訊</button>

    </div>
 
</div>
</template>
<style lang="scss" scoped>
 
.ShowWriteDai{
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
            flex-direction: column;
            overflow: auto;
            .dispalyset{
                display: flex;
                border: 0px solid rgb(0, 0, 0);
                width: 50vw;
                .asktexttitle{
                    font-size: 18pt;
                    width: 40vw;
                }
               
            }

            .dialog1first{
                display: flex;
                border: 0px solid rgb(0, 0, 0);

                .dialog1firstbutton{
                    position: relative;
                    left: 10vw;
                }
             
            }
            .dialog1content{
                border: 0px solid rgb(0, 0, 0);
                height: 30vh;
                
                .asktitle{
                    display: flex;
                    
                }
                .askcont{
                    display: flex;
                    border: 1px solid rgb(0, 0, 0);
                    height: 25vh;

                }
            }
            .tyty{
                position: relative;
                font-size: 25pt;
                left: 105%;
                bottom: 5%;
            }
            
        }
        .continuebutton{
            position: relative;
            left: 85%;
        }
}
.icon{
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