<script>
export default {
    data() {
        return {
           
            doquestArr: {
                userName: '',
                userPhone: '',
                userEmail: '',
                userAge: '',
            },
        
        };
    },
    props: ["checkinfo"],

    mounted() {
      
    },
    methods: {
    

        doneQuestPage() {
            const userResponse = {
                userName: this.checkinfo.userName,
                userPhone: this.checkinfo.userPhone,
                userEmail: this.checkinfo.userEmail,
                userAge: this.checkinfo.userAge,
                userAnswer: this.checkinfo.userResponses
            };
                // this.questArrLocal[this.a].userResponse.push(userResponse);
                // localStorage.setItem("questArrLocal", JSON.stringify(this.questArrLocal));
                alert("已填寫問卷");
        },
    },
};
</script>

<template>
    <div class="personalDetail">
        <h1>本次填寫問卷確認頁面</h1>
        <p>姓名{{ checkinfo.userName }}</p>
        <p>手機{{ checkinfo.userPhone }}</p>
        <p>Email{{ checkinfo.userEmail }}</p>
        <p>年齡{{ checkinfo.userAge }}</p>

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
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
    background-color: #fff;

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
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
}
</style>
