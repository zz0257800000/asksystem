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
          <button class="deleteButton" @click="deleteQuestionnaires()">全部毀滅</button>
          <input type="search" v-model="searchText" placeholder="搜尋問卷">
        </div>
        <div class="searchListDown">
          <label for="">開始/結束</label>
          <input class="searchInput" type="date" v-model="searchStartTime">
          <input class="searchInput" type="date" v-model="searchEndTime">
          <button class="searchButton" @click="searchParam()">搜尋</button>
          <router-link to="/questHome/createQuestPage">
            <button class="createButton">新增問卷</button>
          </router-link>
        </div>
      </div>
      <div class="showList">
        <table>
          <thead>
            <tr>
              <th>＃</th>
              <th>問卷(新的列表fromDB)</th>
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
    background-color: #1a1a1a;
    padding: 20px;
    color: #fff;
  
    .searchList {
      width: 100%;
      border: 1px solid #333;
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: #222;
  
      .searchListTop,
      .searchListDown {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      label {
        margin-right: 10px;
      }
  
      .deleteButton,
      .searchButton,
      .createButton {
        padding: 10px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
  
      .deleteButton:hover,
      .searchButton:hover,
      .createButton:hover {
        background-color: #2980b9;
      }
  
      input {
        padding: 8px;
        border: 1px solid #333;
        border-radius: 5px;
        margin-right: 10px;
        color: #333;
        background-color: #fff;
      }
    }
  
    .showList {
      width: 100%;
      border: 1px solid #333;
      border-radius: 10px;
      overflow: auto;
      background-color: #222;
        min-height: 65vh;
      table {
        width: 100%;
        border-collapse: collapse;
  
        th,
        td {
          border: 1px solid #333;
          padding: 12px;
          text-align: center;
        }
  
        th {
          background-color: #111;
        }
  
        tr:nth-child(even) {
          background-color: #333;
        }
      }
    }
  
    .showPages {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      gap: 10px;
    }
  
    .pageButton {
      padding: 8px 12px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .pageButton:hover {
      background-color: #2980b9;
    }
  }
  </style>
  
