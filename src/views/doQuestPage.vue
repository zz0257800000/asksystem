
<script>
import previewdoQuestPage from '../quest/previewDoQuestPage.vue';
export default {
    data() {
        return {
            questionnaireId: '',
            a: 0,
            questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
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
        const questionnaireId = this.$route.params.questionnaireId;
        this.loadQuestionnaireData(questionnaireId);
        this.change(questionnaireId);

    },
    methods: {
        loadQuestionnaireData(questionnaireId) {
            this.questionnaireData = this.findQuestionnaireDataById(questionnaireId);
            this.questionnaireId = questionnaireId;
        },
        findQuestionnaireDataById(questionnaireId) {
            return this.questArrLocal.find(quest => quest.id === questionnaireId);
        },

        change() {
            this.a = Number(this.questionnaireId);
        },

        goToPreviewPage() {
            this.page = 2
            this.doquestArr.userResponses = this.questArrLocal[this.a].questions.map(question => {
                if (question.questionType === 'radio') {
                    const selectedOption = question.options.find(option => option.answers && option.answers.length > 0);
                    return {
                        question: question.question,
                        answers: selectedOption ? selectedOption.text : '未選擇',
                    };
                } else if (question.questionType === 'checkbox') {
                    const selectedOptions = question.options.filter(option => option.answers && option.answers.length > 0);
                    return {
                        question: question.question,
                        answers: selectedOptions.length > 0 ? selectedOptions.map(option => option.text) : [],
                    };
                } else if (question.questionType === 'text') {
                    // 处理简答题
                    return {
                        question: question.question,
                        answers: question.userResponse || '未填寫',
                    };
                }
            });
        },
        backToQuestPage() {
            this.page = 1
        },
    },
    components: {
        previewdoQuestPage,
    }
};
</script>



<template>
    <div class="doQuestPageBody">
        <div class="doQuestHeader">
            <h2>問卷名稱:{{ questArrLocal[a].questionName }}</h2>
            <h6>開始時間:{{ questArrLocal[a].startTime }}~結束時間:{{ questArrLocal[a].endTime }}</h6>
            <h4>問題描述:{{ questArrLocal[a].description }}</h4>
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
                <div v-for="(question, questionIndex) in questArrLocal[a].questions" :key="questionIndex">
                    <label>問題 {{ questionIndex + 1 }}: {{ question.question }}</label>
                    <div v-if="question.questionType === 'radio'">
                        <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                            <input type="radio" :name="'q_' + questionIndex" :value="option.text" v-model="option.answers">
                            <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option.text }}</label>
                        </div>
                    </div>

                    <div v-else-if="question.questionType === 'checkbox'">
                        <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                            <input type="checkbox" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option.text"
                                v-model="option.answers">
                            <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option.text }}</label>
                        </div>
                    </div>

                    <div v-else-if="question.questionType === 'text'">
                        <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                            <label for="'q_' + questionIndex + '_o_' + optionIndex">{{ option.text }}</label>
                            <input type="text" :id="'q_' + questionIndex + '_o_' + optionIndex" v-model="option.answers">
                        </div>
                    </div>

                </div>
                <button v-on:click="goToPreviewPage()">預覽填寫結果</button>
            </div>
        </div>
        <div class="showPreviewPage" v-if="this.page == 2">
            <previewdoQuestPage :checkinfo="doquestArr" />
            <button type="button" @click="backToQuestPage()">返回修改</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.doQuestPageBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;

    .doQuestHeader {
        width: 900px;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #fff;
    }

    .fixedQuest {
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

    .fluidQuest {
        width: 900px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        background-color: #fff;
    }

    label {
        font-weight: bold;
    }

    input[type="radio"] {
        margin-right: 10px;
    }
}
</style>

