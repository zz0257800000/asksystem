<script>
export default {
    data() {
        return {
            searchAllList: {
                questionnaire: [],
                questionList: []
            },
            searchText: '',
            searchStartTime: '',
            searchEndTime: '',
            currentPage: 1,// 初始化当前页数为1
        };
    },
    
    mounted() {
        this.searchParam();
        
        
    },
    computed: {
        totalPages() {
            const pageSize = 10; // 每页显示的数量
            return Math.ceil(this.searchAllList.questionnaire.length / pageSize);
        }
    },

    methods: {
       
   
        searchParam() {
            const title = this.searchText;
            const startDate = this.searchStartTime;
            const endDate = this.searchEndTime;

            const url = new URL(`http://localhost:8080/api/quiz/searchParam?startDate=${startDate}&endDate=${endDate}&title=${title}`);
            url.searchParams.append('question_name', title);
            url.searchParams.append('start_Time', startDate);
            url.searchParams.append('end_Time', endDate);

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {

                    console.log(data);
                    this.searchAllList.questionnaire = data.quizVoList.map(item => item.questionnaire);
                    this.searchAllList.questionList = data.quizVoList.map(item => item.questionList);

                })
                .catch(error => console.error('Error:', error));
        },
        getPage(pageNum) {
            const pageSize = 10; // 每页显示的数量
            const startIndex = (pageNum - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return this.searchAllList.questionnaire.slice(startIndex, endIndex);
        },
        deleteQuestionnaires() {
  // 提取要删除的调查问卷的 ID
  const questionnaireIds = this.searchAllList.questionnaire.map(item => item.questionnaireId);

  if (questionnaireIds.length === 0) {
    console.error('No questionnaire IDs provided for deletion.');
    return;
  }

  // 实际调用后端 API 进行删除操作
  questionnaireIds.forEach(questionnaireId => {
    fetch(`http://localhost:8080/api/questionnaire/${questionnaireId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Delete successful:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        // 处理错误，例如显示错误信息给用户
      });
  });

  // 假设删除成功，更新本地数据（可选，根据实际需求）
  this.searchAllList.questionnaire = this.searchAllList.questionnaire.filter(item => !questionnaireIds.includes(item.questionnaireId));
}
  }
};
</script>

<template>
    <div class="questHomeBody">
        <div class="searchList">
            <div class="searchListTop">
                <label>問卷標題(列表頁)</label>
                <button class="DeLeteButton" v-on:click="deleteQuestionnaires()">全部毀滅</button>
                
                <input type="search" v-model="searchText">
            </div>
            <div class="searchListDown">
                <label for="">開始/結束</label>
                <input class="searchStartTime" type="date" v-model="searchStartTime">
                <input class="searchEndTime" type="date" v-model="searchEndTime">
                <button class="searchButton" v-on:click="searchParam()">搜尋</button>
                <button><a href="/questHome/createQuestPage">新增問卷</a></button>
            </div>
        </div>
        <div class="showList">
            <table>
                <thead>
                    <tr>
                        <th>＃</th>
                        <th>問卷(新的列表fromDB)
                        </th>
                        <th>狀態</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>觀看統計</th>
                    </tr>
                </thead>
                <tbody>
          <tr v-for="(quest, index) in getPage(currentPage)" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <router-link :to="'/questHome/doQuestPage/' + quest.questionnaireId">{{ quest.title }}</router-link>
            </td>
            <td>狀態</td>
            <td>{{ quest.startDate }}</td>
            <td>{{ quest.endDate }}</td>
            <td>
              <router-link :to="'/questHome/showDetailPage'">觀看統計</router-link>
            </td>
          </tr>
        </tbody>
            </table>
        </div>
        <div class="showPages">
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="pageButton">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.questHomeBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #bebebe;
    /* 设置背景颜色 */

    .searchList {
        margin-top: 15px;
        width: 900px;
        height: auto;
        /* 自适应内容高度 */
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 10px;
        /* 圆角边框 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .searchListTop {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .searchListDown {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        label,
        input,
        button,
        a {
            margin: 5px;
            /* 添加一些间距 */
        }
    }

    .showList {
        margin-top: 15px;
        width: 900px;
        height: 495px;
        // max-height: 400px;
        /* 设置最大高度以防止表格过长 */
        border: 1px solid #ccc;
        border-radius: 10px;
        /* 圆角边框 */
        overflow: auto;
        /* 添加滚动条，以防表格内容过长 */
        background-color: #fff;
        /* 设置白色背景 */

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            /* 移除表格间距 */
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #f0f0f0;
            /* 表头背景颜色 */
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
            /* 隔行背景颜色 */
        }
    }

    .showPages {
        display: flex;
        justify-content: center;
        /* 水平居中 */
        margin-top: 15px;
        gap: 10px;
        /* 间距 */
    }

    .pageButton {
        padding: 5px 10px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }

    .pageButton:hover {
        background-color: #ccc;
        /* 鼠标悬停时的背景色 */
    }



}
</style>
