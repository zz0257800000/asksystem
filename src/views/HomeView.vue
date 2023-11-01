<script >
import { RouterLink, } from 'vue-router'
import Header from "../components/Header.vue"
export default {
  data() {
    return {
      imageUrl: null,
      isZoomed: false,
      currentDate: new Date().toLocaleString(),
    }
  },
  components: {
    RouterLink,
    
    Header
  },
  created() {
    // 在组件创建时启动日期更新
    this.updateDate();
  },
  methods: {
    updateDate() {
      // 更新当前日期和时间
      this.currentDate = new Date().toLocaleString();
      // 每秒更新一次
      setTimeout(this.updateDate, 1000);
    },
  },

}

</script>

<template>

  <Header/>
  <div class="header page">
   
    <div class="right">
      <h1>作者</h1>
      <img src="../../public/7.jpg" alt="">
      <p>
        你好，我叫武弄組。感謝您抽出寶貴的時間。感謝您今天的合作。我目前在餐飲業工作，已經工作了約4年。下班後，我去學校學習如何組裝和修理各種電氣設備，例如安裝電動自行車馬達和室內佈線。所以我在台灣學習了四年後最近畢業了。當我有空閒時，我會自己修理舊的二手自行車，我還修理車引擎。另外，我的興趣是彈電吉他，尤其是聽日本樂團的音樂。我通常會畫與漫畫相關的插圖。希望有一天在日本騎摩托車，去著名的地方看看各地的風景。
      </p>
      <a href="https://www.instagram.com/zz025784/">Insta:@zz025784 </a>
      
      <a href="https://twitter.com/kamishu0126">Twitter:@kamishu0126</a>
      <h2>実行しなければ、ただの夢でしかない。</h2>
    </div>

  </div>
 
  

</template>
<style lang="scss" scoped>
a{
  text-decoration: none;
}
.page {
  width: 97vw;
  margin: 10px;
}

.header {
  background-color: aqua;

  height: 80vh;
  border: 2px solid rgb(6, 6, 6);
  margin: 10px;
  display: flex;

  img {
    width: 30vw;
    height: 569px;
  }

  .right {
    margin: 20px;
    width: 60vw;
    height: 80vh;
    border: 0px solid rgb(6, 6, 6);

    img {
      width: 20vw;
      height: 40vh;
    }

    a {
      font-size: 20pt;
      text-decoration: none;
      
    }
  }
}
.CarouselTeam{
  display: flex;
  border: 1px solid rgb(6, 6, 6);
  height: 32vh;
  background-color: #000000;
.Carousel1 {
  border: 1px solid rgb(6, 6, 6);
  height: 30vh; 
  width:400px; 
  margin: 10px;
  height :202px;
}
.Carousel2 {
  border: 0px solid rgb(6, 6, 6);
   
  width:600px; 
  margin: 10px;
  height :202px;
  
}
}
.content0{
  
  height: 160vh;
  display: flex;
  justify-content: space-between;
  border: 0px solid rgb(6, 6, 6);
  
.left0{


height: 600px;
  border: 0px solid rgb(6, 6, 6);
.p0{
  height: 424px;
  border: 2px solid rgb(6, 6, 6);
  transition: 0.3s;
&:hover{
  transform: scale(1.2, 1.2);
}}
.date-display {
  height: 100vh;
  font-size: 2em;.time {
  font-family: "Arial", sans-serif;
 
}
} 
}

.between0{
  margin: 10px;border: 0px solid rgb(6, 6, 6);
.top0{
  border: 2px solid rgb(6, 6, 6);
  height: 202px;
  width: 103vh;
  display: flex;
  .pb0{
  border: 2px solid rgb(6, 6, 6);
}
.pt0{margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 0px solid rgb(6, 6, 6);
  &:hover{
    color: red;
    
  }
}
}
.down0{
  width: 100vh;
  margin: 10px;
  height: 92vh;
  border: 0px solid rgb(6, 6, 6);
  .nineArea{
    border: 0px solid black;
    display: flex;
    flex-wrap: wrap;
    
    .nums{
      flex-direction: column;
      background-color: white;
      transition: 0.3s; 
    &:hover{
  transform: scale(1.2, 1.2);
}
      margin: 2px;
      width: 232px;
  height: 210px;
  border: 2px solid black;
  
  transition: 0.3s;
  &:hover{
    color: red;  
  }
    }
  
  }
  
}


}

.right0{ 
  
  hr {    
        height: 4px; /* 设置水平线的高度，这会增加其厚度 */
      background-color: #000000; /* 设置水平线的颜色 */
        }
  .pr0{
    margin-bottom: 50px;
    border: 2px solid rgb(6, 6, 6);
    transition: 0.3s;
&:hover{
  transform: scale(1.2, 1.2);
}
  }
  
}
}
.second {

  
  border: 0px solid rgb(6, 6, 6);
  flex-direction: column;
    text-align: center;
  h1 {
    flex-direction: column;
    text-align: center;
  }

  .secondPicture {
    display: flex;

   
    flex-wrap: wrap;
    justify-content: space-around;
    border: 2px solid rgb(6, 6, 6);

    .p1 {
      margin: 10px;
      height: 80vh;
      width: 30vw;border: 1px solid rgb(6, 6, 6);
    }
  }


}
.footer0{
  height: 25vh;
border: 2px solid rgb(6, 6, 6);
}
</style>
