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
      selectedRows: [],
      selectAllCheckbox: false,
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
    deleteQuestionnaire() {
      if (this.selectedRows.length === 0) {
        console.warn('No questionnaires selected for deletion.');
        return;
      }

      // Call the backend API to delete the selected questionnaires directly from the database
      fetch(`http://localhost:8080/api/quiz/deleteAll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.selectedRows)  // Pass the selected questionnaire IDs to the backend
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Deletion successful:', data);
          // Assuming deletion was successful, update the local data
          this.searchAllList.questionnaire = this.searchAllList.questionnaire.filter(
            item => !this.selectedRows.includes(item.id)  // 使用正确的ID属性
          );
          this.selectedRows = [];
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle the error (e.g., display an error message to the user)
        });
    },
    selectAllRows() {
      if (this.selectAllCheckbox) {
        // 如果全選框被選中，將所有行的 ID 加入 selectedRows 中
        this.selectedRows = this.searchAllList.questionnaire.map(quest => quest.id);
      } else {
        // 如果全選框未被選中，清空 selectedRows
        this.selectedRows = [];
      }
    }, oggleRowColor(id) {
      this.$nextTick(() => {
        // 在勾选或取消勾选时，根据selectedRows数组中的值来更新行的颜色
        const rows = document.querySelectorAll('.selected-row');
        rows.forEach((row, index) => {
          const questId = this.getPage(this.currentPage)[index].id;
          row.style.backgroundColor = this.selectedRows.includes(questId) ? 'red' : '';
        });
      });
    },
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
      <div class="searchListDown">
        <button class="deleteButton" @click="deleteQuestionnaire">刪除選定</button>
        <router-link to="/questHome/createQuestPage">
          <button class="createButton">アンケートの追加</button>
        </router-link>
      </div>
    </div>
    <div class="showList">
      <table>
        <thead>
          <tr>
            <th>
            </th>
            <th>＃</th>
            <th>アンケート</th>
            <th>ステータス</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>統計情報を見る</th>
            <th>更改問卷
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quest, index) in getPage(currentPage)" :key="index"
            :class="{ 'selected-row': selectedRows.includes(quest.id) }">
            <td>

              <input type="checkbox" v-model="selectedRows" :value="quest.id">
            </td>
            <td>{{ index + 1 }}</td>
            <td>
              <router-link :to="'/questHome/doQuestPage/' + quest.id" title="アンケート">{{ quest.title }}</router-link>
            </td>
            <td :style="{ 'color': quest.published ? 'green' : 'red' }">{{ quest.published ? '開始中' : '終了中' }}</td>
            <td>{{ quest.startDate }}</td>
            <td>{{ quest.endDate }}</td>
            <td>
              <router-link :to="'/showDetailPage/' + quest.id" title="統計情報を見る">統計情報を見る</router-link>
            </td>


            <td>
              <router-link :to="'/questHome/EditQuestionnaire/' + quest.id" title="更改問卷"> <i class="fa-solid fa-pencil"></i></router-link>
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
.selected-row {
  background-color: red;
  transition: background-color 0.3s;
}

.selected-row:hover {
  background-color: darkred;
}

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
