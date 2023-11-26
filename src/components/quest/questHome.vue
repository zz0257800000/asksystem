<script>
export default {
    data() {
        return {
            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
            searchText: '',
            searchStartTime: '',
            searchEndTime: '',
            currentPage: 1,// 初始化当前页数为1

            quizVoList: [    ],
        };
    },
    mounted() {
        this.searchParam();
    },
    computed: {
        totalPages() {
            const pageSize = 10; // 每页显示的数量
            return Math.ceil(this.searchAllList.hwQuestionnaireList.length / pageSize);
        }
    },

    methods: {
        
        searchParam() {
            const title = this.searchText;
            const startDate = this.searchStartTime;
            const endDate = this.searchEndTime;

            const url = new URL('http://localhost:8080/api/quiz/search');
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
                    console.log(data.quizVoList);
                    this.quizVoList= data.quizVoList;
                    this.searchAllList.hwQuestionnaireList = data.hwQuestionnaireList;
                    this.searchAllList.hwQuestionList = data.hwQuestionList;
                    //
                                        console.log(this.searchAllList);

                })
                .catch(error => console.error('Error:', error));
        },
        getPage(pageNum) {
            const pageSize = 10; // 每页显示的数量
            const startIndex = (pageNum - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return this.searchAllList.hwQuestionnaireList.slice(startIndex, endIndex);
        }

    }
};
</script>

<template>
    <div class="questHomeBody">
        <div class="searchList">
            <div class="searchListTop">
                <h1><b>問卷調查局</b></h1>
                <input class="searchText" type="text" placeholder="請輸入搜尋內容……"  v-model="searchText">

            </div>
            <div class="searchListDown">
                <h1>開始 / 結束</h1>                
                <input class="searchStartTime" type="date" v-model="searchStartTime">
                <input class="searchEndTime" type="date" v-model="searchEndTime">
                <button class="searchButton" v-on:click="searchParam()">搜尋</button>
                <button>        <RouterLink to="/questHome/createQuestPage">新增問卷</RouterLink></button>
            </div>
        </div>
        <div class="showList">
            <table>
                
                <div>
                    <!-- {{ quizVoList }} -->
    <div class="resList" v-for="(data) in quizVoList" :key="data.questionnaire.id">
      <span class="title">{{ data.questionnaire.title }}</span>
      <span class="time">{{ data.questionnaire.startDate }} ~ {{ data.questionnaire.endDate }}</span>

      <div class="iconBar">
        <!-- 這裡的 RouterLink 需要改成 router-link -->
        <router-link :to="'/view/' + data.questionnaire.id" title="查看問卷">
          <i class="fa-regular fa-eye icon"></i>
        </router-link>

        <router-link :to="'/fill/' + data.questionnaire.id" title="填寫問卷">
          <i class="fa-solid fa-pencil icon"></i>
        </router-link>
      </div>
    </div>
  </div>
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
    background-color: #f0f0f0;
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



}.resList {
  width: 45vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #1e5128;
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem 0;
  box-shadow: 0px 8px 6px -6px #1e5128;

  .title {
    width: 30%;
    font-size: 1.2rem;
  }

  .time {
    width: 40%;
    font-size: 1.2rem;
  }

  .iconBar {
    width: 20%;
    display: flex;
    justify-content: space-around;
    .icon {
      font-size: 1.5rem;
      color: #1e5128;
    }
  }
}
</style>
