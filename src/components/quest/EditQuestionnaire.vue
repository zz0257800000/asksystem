
  
<script>
export default {
    data() {
        return {
            searchAllList: {
                questionnaire: [],
                questionList: [],

            },
            qtitle: '',
            description: '',
            startDate: '',
            endDate: '',
            questArr: [],
            questionTypes: ['radio', 'checkbox', 'text'],
            published: false,
            minStartDate: '', // Add minStartDate if it's your data
            questionList: [],  // 確保有 questionList 這個屬性


        };
    },
    methods: {
        fetchData() {
            const questionnaireIdToFind = this.$route.params.wantId;
            fetch(`http://localhost:8080/api/quiz/searchParam?id=${questionnaireIdToFind}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Data updated successfully:', data);

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

                        // 用问题数组初始化 questArr
                        // 检查 questionList 是否为数组
                        if (Array.isArray(quizData.questionList)) {
                            // 将获取到的问题数据设置到 questArr
                            this.questArr = quizData.questionList.map((question) => ({
                                ...question,
                                options: question.optionsType === 'text' ? [] : question.options.split(';').map(text => ({ selected: false, text })),
                            }));
                            console.log(this.questArr)


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
                text: '',
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
        }, postUpdateDataToDbAndPublished() {
            this.questArr.forEach((quest, questionIndex) => {
                const optionTextArray = quest.options.map(option => option.text);
                this.questArr[questionIndex].optionText = optionTextArray.join(';');
            });

            console.log("Updated questArr Data:", this.questArr); // 確認更新後的 questArr 資料



            // 初始化 questArr
            this.questArr = [];
            const quizData = response.data; // 这里假设后端返回的数据包含问卷的所有信息
            // 将问卷数据填充到编辑相关的变量中
            this.editingQuizId = parsedQuizId;
            // 填充其他问卷数据...
            console.log("quizData: ", quizData);
            console.log("quizId: ", this.editingQuizId);
            // 使用 for 迴圈處理每個問題
            for (let i = 0; i < quizData.questionList.length; i++) {
                const questItem = quizData.questionList[i];
                const optionsArray = questItem.option ? questItem.option.split(';') : [];

                // 使用 map 初始化 optionsArray
                const options = optionsArray.map(optionText => ({
                    selected: false, // 或者根據需要初始化為 true
                    text: optionText,
                }));

                // 在 questArr 中添加新問題
                const newQuestion = {
                    quId: i + 1,
                    questionnaireId: this.$route.params.updateQuestPageId,
                    optionsType: questItem.questionTypes,
                    qTitle: questItem.questionText,
                    options: options,
                };

                // 添加新問題到 questArr
                this.questArr.push(newQuestion);

            }

            // 將 questArr 資料複製到 questionList
            this.questionList = this.questArr.map((quest, index) => ({
                quId: index + 1,
                questionnaireId: quest.questionnaireId,
                optionsType: quest.optionsType,
                qTitle: quest.qTitle,
                options: [...quest.options], // 複製 options 陣列
            }));


            console.log(this.questArr.map(quest => quest.options));

            console.log("Final questionList Data:", this.questionList);
            var newQuestionnaire = {
                questionnaire: {
                    questionnaireId: this.$route.params.updateQuestPageId,
                    title: this.title,
                    description: this.description,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    published: 1,
                },
                questionList: this.questionList,
            };
            console.log(newQuestionnaire)
            

            fetch('http://localhost:8080/api/quiz/api/quiz/create', {
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
            alert("更新問卷成功")
        }, togglePublishedStatus() {
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
                <h1>更改問卷</h1>
                <button @click="togglePublishedStatus" :style="{ 'background-color': published ? 'red' : 'green' }">
                    {{ published ? '關閉問卷' : '開啟問卷' }}
                </button>
                <div>
                    <label for="">问卷名称</label>
                    <input style="width: 90%;" type="text" v-model="this.title">

                </div>
            </div>
            <div>
                <label for="">描述內容</label>
                <input style="width: 90%;" type="text" v-model="description">
            </div>
            <div>
                <label for="">问卷开始时间</label>
                <input type="date" v-model="startDate" :min="minStartDate">
                <label for="">问卷结束时间</label>
                <input type="date" v-model="endDate" :min="minStartDate">
            </div>
            <div>
                <button @click="createNewQuest()">新增问题</button>
                <button @click="postUpdateDataToDbAndPublished()" style="background-color: red;">Update to DB</button>
            </div>
        </div>

        <div>
            <div class="editQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
                <label>第{{ questionIndex + 1 }}题</label>
                <select v-model="quest.optionsType">
                    <option v-for="(type, index) in questionTypes" :key="index" :value="type">
                        {{ type === 'radio' ? '单选' : type === 'checkbox' ? '多选' : '简答' }}
                    </option>
                </select>

                <input type="text" v-model="quest.qTitle" placeholder="输入问题">

                <button @click="createNewOptions(questionIndex)">新增选项</button>

                <div v-for="(option, optionIndex) in quest.options" :key="optionIndex">
                    <input v-if="quest.optionsType === 'radio'" type="radio" :name="'radioGroup_' + questionIndex"
                        v-model="option.selected" />
                    <input v-if="quest.optionsType === 'checkbox'" type="checkbox" v-model="option.selected" />

                    <input type="text" placeholder="輸入選項" v-model="option.text" />

                    <button style="background-color: red;"
                        @click="deleteNewOptions(questionIndex, optionIndex)">刪除選項</button>
                </div>



                <button style="margin-left: 43px; background-color: red;" @click="deleteNewQuest(questionIndex)">
                    删除问题
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
  