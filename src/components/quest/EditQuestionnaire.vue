  
<script>
export default {
    data() {
        return {
            searchAllList: {
                questionnaire: [],
                questionList: [],
            },
            qTitle: '',
            description: '',
            startDate: '',
            endDate: '',
            questArr: [],
            questionDataList: [],  // 確保初始化
            questionTypes: ['radio', 'checkbox', 'text'],
            minStartDate: '', // Add minStartDate if it's your data
            AquestArr: [],
            abc: null,

            questionnaireId: null,
            published: '',
        };
    }, computed: {
        minStartDate() {
            const today = new Date();
            today.setDate(today.getDate() + 1);
            const formattedToday = today.toISOString().split('T')[0];
            return formattedToday;
        },
    },
    methods: {
        fetchData() {
            const questionnaireIdToFind = this.$route.params.wantId;
            this.questionnaireId = questionnaireIdToFind;
            fetch(`http://localhost:8080/api/quiz/searchParam?id=${questionnaireIdToFind}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log('Data updated successfully:', data);


                    const quizData = data.quizVoList.find(
                        (quiz) => quiz.questionnaire.id === parseInt(questionnaireIdToFind)
                    );
                    if (quizData) {
                        this.searchAllList.questionnaire = quizData.questionnaire;
                        this.title = quizData.questionnaire.title;
                        this.description = quizData.questionnaire.description;
                        this.startDate = quizData.questionnaire.startDate;
                        this.endDate = quizData.questionnaire.endDate;
                        this.questArr = quizData.questionList;
                        this.published = quizData.questionnaire.published; // Update published status


                        // 用问题数组初始化 questArr
                        // 检查 questionList 是否为数组
                        if (Array.isArray(quizData.questionList)) {
                            // 将获取到的问题数据设置到 questArr
                            this.questArr = quizData.questionList.map((question) => ({
                                ...question,
                                options: question.optionsType === 'text' ? [] : question.options.split(';').map(text => ({  text })),
                            }));
                            // console.log(questionnaireIdToFind);

                            console.log(quizData.questionnaire)
                            console.log(quizData.questionList)



                        } else {
                            console.error('questionList 不是数组。', quizData.questionList);
                        }
                    } else {
                        console.error('アンケートデータが見つかりませんでした。アンケートID: ', questionnaireIdToFind);
                    }
                })
                .catch((error) => console.error('エラー:', error));


        },

        createNewQuest() {
            if (this.questArr.length >= 10) {
                alert('最多只能添加十个问题。');
                return;
            }
            const newQuestion = {
                questionType: '', // 設置默認的問題類型
                question: '',
                options: [],
            };
            this.questArr.push(newQuestion);
        },


        createNewOptions(questionIndex) {
            if (!Array.isArray(this.questArr[questionIndex].options)) {
                this.questArr[questionIndex].options = [];
            }

            if (this.questArr[questionIndex].options.length >= 4) {
                alert('每个问题最多只能添加四个选项。');
                return;
            }
            const newOption = {
                text: `新选项${this.questArr[questionIndex].options.length + 1}`, // 设置新选项的文本
                selected: true,
            };

            this.questArr[questionIndex].options.push(newOption);
        },
        deleteNewOptions(questionIndex, optionIndex) {
            this.questArr[questionIndex].options.splice(optionIndex, 1);
        },
        deleteNewQuest(questionIndex) {
            if (this.questArr.length > 1) {
                this.questArr.splice(questionIndex, 1);
            } else {
                alert('至少需要保留一个问题。');
            }
        },
        togglePublishedStatus() {
            this.published = !this.published;
        },
        postUpdateDataToDbAndPublished() {
            if (!this.title || !this.startDate || !this.endDate) {
                alert('请填写所有必填项');
                return;
            }
            // 檢查時間
            const startDateTime = new Date(this.startDate);
            const endDateTime = new Date(this.endDate);

            if (endDateTime <= startDateTime) {
                alert('結束時間不能早於或等於開始時間。');
                return;
            }

''
            // 处理问题数组
           
            this.searchAllList.questionList = [];
            this.questionList = this.questArr; // 正確的數據屬性

             const AquestArr = this.questArr.map((quest) => {
            console.log(quest.options.map((option) => option.text).join(';'));
            return {
                quId: this.counter++, // 使用计数器，并递增
                qnId: this.questionnaireId,
                qTitle: quest.qTitle,
                optionsType: quest.optionsType,
                options: quest.options.map((option) => option.text).join(';'),
            };
        });



        
            const newQuestionnaire = {
                questionnaire: {
                    id: this.questionnaireId,
                    title: this.title,
                    description: this.description,
                    published: this.published,
                    startDate: this.startDate,
                    endDate: this.endDate,
                },

                questionList: this.questionList, // 使用正确的属性名称



            };
            newQuestionnaire.questionList.options = AquestArr.options;
            console.log(AquestArr);
            newQuestionnaire.questionList.forEach((element,index) => {
                element.options = AquestArr[index].options;
                console.log(element);

            });
            console.log('Current questArr:', this.questArr);
            console.log('Updated questionList:', this.questionList);
            this.abc = JSON.stringify(newQuestionnaire)

            this.AquestArr = newQuestionnaire
            // console.log(JSON.stringify(newQuestionnaire));
            console.log(newQuestionnaire);
            console.log(JSON.stringify(newQuestionnaire));

            fetch('http://localhost:8080/api/quiz/createOrUpdate', {
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

                    console.log(newQuestionnaire);

                })
                .catch(error => console.error('Error:', error));
            // this.$router.push('/questHome');

            alert("更新問卷成功")
        },


        togglePublishedStatusFromButton() {
            // Toggle the 'published' status
            this.published = !this.published;

        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>
<template>
    <div class="editQuestPageBody">
        <div class="editQuestHeader">
            <div>
                <h1>アンケートの変更</h1>
                <button @click="togglePublishedStatusFromButton"
                    :style="{ 'background-color': published ? 'red' : 'green' }">
                    {{ published ? 'アンケートを閉じる' : 'アンケートを開く' }}
                </button>
                <div>
                    <label for="">アンケート名</label>
                    <input style="width: 90%;" type="text" v-model="title">
                </div>
            </div>
            <div>
                <label for="">説明内容</label>
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
                <button @click="postUpdateDataToDbAndPublished()"
                    style="background-color: rgb(0, 170, 255);">アンケート更新</button>
            </div>
        </div>

        <div>
            <div class="editQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
                <label>{{ questionIndex + 1 }}番目の質問</label>
                <select v-model="quest.optionsType">
                    <option v-for="(type, index) in questionTypes" :key="index" :value="type">
                        {{ type === 'radio' ? '単一選択' : type === 'checkbox' ? '複数選択' : '記述' }}
                    </option>
                </select>

                <input type="text" v-model="quest.qTitle" placeholder="質問を入力">

                <button @click="createNewOptions(questionIndex)">選択肢を追加</button>

                <div v-for="(option, optionIndex) in quest.options" :key="optionIndex">
                    <input v-if="quest.optionsType === 'radio'" type="radio" :name="'radioGroup_' + questionIndex"
                        v-model="option.selected" />
                    <input v-if="quest.optionsType === 'checkbox'" type="checkbox" v-model="option.selected" />

                    <input type="text" placeholder="オプションを入力" v-model="option.text" />

                    <button style="background-color: rgb(68, 68, 68);"
                        @click="deleteNewOptions(questionIndex, optionIndex)">選択肢を削除</button>
                </div>
                <br>
                <button style="margin-left: 43px; background-color: rgb(4, 4, 4);" @click="deleteNewQuest(questionIndex)">
                    質問を削除
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.editQuestPageBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2c3e50;
    padding: 20px;
    min-height: 90vh;

    .editQuestHeader {
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

    .editQuest {
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
  