<script>
export default {
    data() {
        return {
            a: 0,
            questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
            doquestArr: {
                userName: '',
                userPhone: '',
                userEmail: '',
                userAge: '',
            },
            // userResponses: [],
        };
    },
    props: ["checkinfo"],

    mounted() {
        const questionnaireId = this.$route.params.questionnaireId;
        this.loadQuestionnaireData(questionnaireId);
        this.chage(questionnaireId);
    },
    methods: {
        loadQuestionnaireData(questionnaireId) {
            this.questionnaireData = this.findQuestionnaireDataById(questionnaireId);
            this.questionnaireId = questionnaireId;
        },
        findQuestionnaireDataById(questionnaireId) {
            return this.questArrLocal.find((quest) => quest.id === questionnaireId);
        },
        chage(a, questionnaireId) {
            return (this.a = Number(this.questionnaireId));
        },

        doneQuestPage() {
            const userResponse = {
                userName: this.checkinfo.userName,
                userPhone: this.checkinfo.userPhone,
                userEmail: this.checkinfo.userEmail,
                userAge: this.checkinfo.userAge,
                userAnswer: this.checkinfo.userResponses
            };
                this.questArrLocal[this.a].userResponse.push(userResponse);
                localStorage.setItem("questArrLocal", JSON.stringify(this.questArrLocal));
                alert("已填寫問卷");
                return this.$router.push({ name: 'askDetail' });

        },
    },
};
</script>

<template>
    <div class="personalDetail">
        <h1>本次填寫問卷確認頁面</h1>
        <p>姓名 :{{ checkinfo.userName }}</p>
        <p>手機 :{{ checkinfo.userPhone }}</p>
        <p>Email :{{ checkinfo.userEmail }}</p>
        <p>年齡 :{{ checkinfo.userAge }}</p>

    </div>
    <div class="previewArea">
        <div v-for="(response, index) in checkinfo.userResponses" :key="index">
                <p>{{ response.question }}: {{ response.answers}}</p> 
            </div>
        <button v-on:click="doneQuestPage()">確認送出</button>
    </div>

</template>

<style lang="scss" scoped>
.personalDetail {
    width: 900px;
        border: 1px solid #000000;
        border-radius: 10px;
        padding: 20px;
       
        background-color: rgb(255, 255, 255);
        font-size: 18pt;
        font-weight: bold;

    display: flex;
    flex-direction: column; /* 將子元素的排列方向設置為垂直（從上到下） */
    align-items: flex-start; /* 將子元素在水平方向上對齊到左邊 */

    div {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    label {
        width: 100px;
        font-weight: bold;
    }

    input {
        flex: 1;
    }
}

.previewArea {
    width: 900px;
    border: 1px solid #000000;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    background-color: #ffffff;
    display: flex;
    align-items: flex-start; /* 將子元素在垂直方向上對齊到上方 */
    flex-direction: column;            
    font-weight: bold;
    font-size: 20pt;

}
</style>
