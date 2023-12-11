<script>

export default {
    data() {
        return {
            searchAllList: {
                questionnaire: [],
                questionList: [],
                userList: [],
            },
            page: 1,
            doquestArr: [], //現在更改為陣列
        };
    },
    mounted() {
        this.fetchUserList();
    },


    methods: {


        async fetchUserList() {
            const questionnaireIdToFind = this.$route.params.showDetailPageid;
            this.questionnaireId = questionnaireIdToFind;

            console.log("本頁頁碼 " + questionnaireIdToFind);

            try {
                const response = await fetch(`http://localhost:8080/api/quiz/userget?id=${questionnaireIdToFind}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                console.log(data);

                // Check if quizData is not null or undefined before using find
                const quizData = data.quizVo;

                if (quizData) {
                    this.searchAllList.questionnaire = quizData.questionnaire;
                    this.searchAllList.questionList = quizData.questionList;
                    this.searchAllList.userList = quizData.userList;
                } else {
                    console.error('Quiz data not found for questionnaire ID: ', questionnaireIdToFind);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

    }
};
</script>

<template>
    <div class="chartBody">
      <div class="showDetailPageHeader" v-if="searchAllList.questionnaire">
        <span>{{ searchAllList.questionnaire.startDate }}~~{{ searchAllList.questionnaire.endDate }}</span>
        <h6>アンケート名: {{ searchAllList.questionnaire.title }}</h6>
        <h6>アンケートの説明: {{ searchAllList.questionnaire.description }}</h6>
      </div>
  
      <div class="showList">
        <table>
          <thead>
            <tr>
              <th>＃</th>
              <th>現在のアンケート番号</th>
              <th>名前</th>
              <th>電話</th>
              <th>メール</th>
              <th>回答日時</th>
              <th>アンケート回答状況</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in searchAllList.userList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ info.quizId }}</td>
              <td>{{ info.name }}</td>
              <td>{{ info.phoneNumber }}</td>
              <td>{{ info.email }}</td>
              <td>{{ info.date_time }}</td>
              <td>
                <router-link v-if="info" :to="'/questHome/answerPage/' + this.questionnaireId" title="アンケート回答状況">
                  <i class="fa-solid fa-feather"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  

<style lang="scss" scoped>
.chartBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #212529;
    /* 深灰色背景 */
    height: 90vh;
    width: 100vw;

    .showDetailPageHeader {
        width: 78vw;
        border: 1px solid #4a90e2;
        /* 深灰色边框 */
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;

        background-color: #2e4b67;
        /* Using a darker blue background */
        /* 深灰色背景 */
        color: #fff;
        /* 白色文本 */
    }

    .showList {
        width: 78vw;
        border: 1px solid #4a90e2;
        border-radius: 10px;
        overflow: auto;
        background-color: #2e4b67;
        /* Using a darker blue background */
        min-height: 70vh;

        table {
            width: 100%;
            border-collapse: collapse;

            th,
            td {
                border: 1px solid #4682b4;
                padding: 12px;
                text-align: center;
                color: #fff;
            }

            th {
                background-color: #353b4d;
            }

            tr:nth-child(even) {
                background-color: #6495ed;
            }
        }
    }




}</style>