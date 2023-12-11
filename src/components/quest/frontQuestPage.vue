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
      currentPage: 1,
    };
  },

  mounted() {
    this.searchParam();
  },
  computed: {
    totalPages() {
      const pageSize = 10; // 1ページに表示されるアイテム数
      return Math.ceil(this.searchAllList.questionnaire.length / pageSize);
    }
  },

  methods: {
        // 新增判斷問卷是否開啟的方法
        isQuestionnaireOpen(quest) {
      const currentDateTime = new Date();
      const startDateTime = new Date(quest.startDate);
      const endDateTime = new Date(quest.endDate);

      return quest.published && currentDateTime >= startDateTime && currentDateTime <= endDateTime;
    },
  

    searchParam() {
      const title = this.searchText;
      const published = this.published;

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
        .catch(error => console.error('Error:', error))
        .finally(() => {
          // 検索条件をクリア
          this.searchStartTime = '';
          this.searchEndTime = '';
          this.searchText = '';
        });
    },
    getPage(pageNum) {
      const pageSize = 10; // 1ページに表示されるアイテム数
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return this.searchAllList.questionnaire.slice(startIndex, endIndex);
    },
    deleteQuestionnaires() {
      // 削除するアンケートのIDを抽出
      const questionnaireIds = this.searchAllList.questionnaire.map(item => item.questionnaireId);

      if (questionnaireIds.length === 0) {
        console.error('削除するアンケートのIDが提供されていません。');
        return;
      }

      // 実際にバックエンドAPIを呼び出して削除操作を行う
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
            console.log('削除成功:', data);
          })
          .catch(error => {
            console.error('エラー:', error);
            // エラーを処理する（例: ユーザーにエラーメッセージを表示する）
          });
      });

      // 削除が成功したと仮定して、ローカルデータを更新する（オプション、実際の要件に応じて）
      this.searchAllList.questionnaire = this.searchAllList.questionnaire.filter(item => !questionnaireIds.includes(item.questionnaireId));
    }
  }
};
</script>

<template>
  <div class="questHomeBody">
    <div class="searchList">
      <div class="searchListTop">
        <label>アンケートタイトル（リストページ）</label>
        <label for="">開始/終了</label>
        <input class="searchInput" type="date" v-model="searchStartTime">
        <input class="searchInput" type="date" v-model="searchEndTime">

        <input type="search" v-model="searchText" placeholder="アンケートを検索">

        <button class="searchButton" @click="searchParam()">検索</button>
      </div>
    </div>
    <div class="showList">
      <table>
        <thead>
          <tr>
            <th>＃</th>
            <th>アンケート</th>
            <th>ステータス</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>回答する</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quest, index) in getPage(currentPage)" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <!-- 使用 v-if 來條件渲染連結 -->
              <span v-if="quest.published" :to="'/questHome/doQuestPage/' + quest.id"  title="アンケート">{{ quest.title }}</span>

              <span v-else>{{ quest.title }}</span>
            </td>
            <td :style="{ 'color': quest.published ? 'green' : 'red' }">{{ quest.published ? '開始中' : '終了中' }}</td>
            <td>{{ quest.startDate }}</td>
            <td>{{ quest.endDate }}</td>
            <td>
              <router-link v-if="quest.published" :to="'/questHome/doQuestPage/' + quest.id" title="回答する"><i class="fa-regular fa-pen-to-square"></i></router-link>
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
  background-color: #ffc0cb; /* 使用粉色背景，可根据需要调整颜色 */
  padding: 20px;
  color: rgba(218, 41, 173, 0.723);

  .searchList {
    width: 100%;
   
    border: 1px solid #ffb6c1; /* 使用淡粉色边框 */
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #ffe4e1; /* 使用淡桃色背景 */

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
      background-color: #ff69b4; /* 使用深粉红色按钮 */
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .deleteButton:hover,
    .searchButton:hover,
    .createButton:hover {
      background-color: #ff1493; /* 鼠标悬停时使用更深的粉红色 */
    }

    input {
      padding: 8px;
      border: 1px solid #ffb6c1; /* 使用淡粉色边框 */
      border-radius: 5px;
      margin-right: 10px;
      color: #333;
      background-color: #fff;
    }
  }

  .showList {
    width: 100%;
    height:68vh ;
    border: 1px solid #ffb6c1; /* 使用淡粉色边框 */
    border-radius: 10px;
    overflow: auto;
    background-color: #ffe4e1; /* 使用淡桃色背景 */
    min-height: vh;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        border: 1px solid #ffb6c1; /* 使用淡粉色边框 */
        padding: 12px;
        text-align: center;
      }

      th {
        background-color: #ff69b4; /* 使用深粉红色表头 */
      }

      tr:nth-child(even) {
        background-color: #ffcccc; /* 使用淡红色背景 */
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
    background-color: #ff69b4; /* 使用深粉红色按钮 */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .pageButton:hover {
    background-color: #ff1493; /* 鼠标悬停时使用更深的粉红色 */
  }
}
</style>

