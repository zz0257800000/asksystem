<script>

export default{
    data(){
        return{
            showDia: false,

          
        }
    },
    methods: {
    logout() {
      // 清除用户认证状态（这里示例清除本地存储中的令牌）
      localStorage.removeItem("userToken");

      // 导航到登出页面或首页
      this.$router.push("/askDetail"); // 或者使用首页路径
    },
    ShowMainDai() {
            this.showDia = true;
        },

        CloseMainDai() {
            this.showDia = false;
        },
  },
    }


    

</script>
<template>
   <div class="askUserPage">
 <div class="askHeader">
    <h1><b>問卷調查局</b></h1>
<div>

  
    <button  class="btn" @click="logout">登出</button>
</div>
 </div>
 <div class="askMainPage">
    <div class="search">
<input class="searchText" type="text"> 
<i class="fa-solid fa-magnifying-glass icon"></i>
 </div>


 <div class="userIcon">
<i class="fa-solid fa-trash fs-2"></i>
<button @:click="ShowMainDai" > <i class="fa-solid fa-plus fs-2 " ></i></button>
</div>

</div>

 <div class="otherPage">

 </div>
</div>


</template>
<style lang="scss" scoped>

.btn{
    font-size: 16pt;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    width: 5vw;
    background-color: rgb(223, 223, 223);
}
.icon{
    font-size: 28pt;

}
.askUserPage{
  
    border: 0px solid black;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .askHeader{
        justify-content: space-around;
        align-items: center;
        display: flex;
        font-size: 16pt;
        padding: 5px;
       

    } 
    .askMainPage{
        display: flex;
        justify-content: center;
            border: 1px solid black;
            height: 80vh;
            width: 100vw;
            .search{
                width: 40vw;
                display: flex;
                justify-content: space-around;
              height: 5vh;  
                border: 1px solid black;
                position: relative;
                left: 7%;
                
                .searchText{
                    width: 50vw;
                    font-size: 18pt;
                }
            }
            .userIcon{
                position: relative;
                bottom: -1%;
                right:  44%;
                display: flex;
                justify-content: space-around;
            border: 0px solid black;
            width: 10vw;
            
            }

        }
        .otherPage{
            border: 1px solid black;
            height: 10vh;
            width: 100vw;


        }
}

</style>