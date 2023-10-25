<script>
export default {
    data() {
        return {


        }
    }
}
</script>
<template >
    <div class="cakeOne page">
        <div class="cakeTop">

        </div>
        <img src="./../../public/./上課用圖片/Group 10.png" class="cakeTopRight" height=100px width=100px alt="">
    </div>
    <div class="cakeTwo page">
        <div class="cakeTwoLeft">
            <h1>Title</h1>
            <p class="cakeFiveP1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos commodi recusandae fuga. Voluptates nostrum
                ratione eveniet dolore dolor modi perspiciatis quaerat hic nesciunt quasi? Error, sapiente reiciendis. Ab,
                omnis asperiores!</p>
        </div>

        <div class="cakeTwoRight">
            <img src="../../public/上課用圖片/1.png" alt="">
        </div>
    </div>

    <div class="cakeThree page">
        <h1>On Sale</h1>
        <div class="cakeThreeImgs">
            <div class="cakeThreeImgs1">

                <img src=".../../../../public/上課用圖片/3.png" alt="">
                <button class="cakeThreeBtn1">item</button>
            </div>
            <div class="cakeThreeImgs2">

                <img src=".../../../../public/上課用圖片/2.png" alt="">
                <button class="cakeThreeBtn2">item</button>
            </div>
            <div class="cakeThreeImgs3">

                <img src=".../../../../public/上課用圖片/4.png" alt="">
                <button class="cakeThreeBtn3">item</button>
            </div>
        </div>
    </div>
    <hr /> <br><br>
    <h1>News</h1><br>
    <div class="cakeFour page">

        <div class="cakeCard1">
            <img src=".../../../../public/上課用圖片/5.png" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem, iste minus laudantium
                voluptates magni eveniet amet, suscipit iure culpa pariatur, doloremque tempore totam reprehenderit odio
                fugit sed voluptatem vero?</p>
            <button class="cakeCardBtn1">Detail</button>
        </div>
        <div class="cakeCard2">
            <img src=".../../../../public/上課用圖片/6.png" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem, iste minus laudantium
                voluptates magni eveniet amet, suscipit iure culpa pariatur, doloremque tempore totam reprehenderit odio
                fugit sed voluptatem vero?</p>
            <button class="cakeCardBtn2">Detail</button>
        </div>
        <div class="cakeCard3">
            <img src=".../../../../public/上課用圖片/7.png" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem, iste minus laudantium
                voluptates magni eveniet amet, suscipit iure culpa pariatur, doloremque tempore totam reprehenderit odio
                fugit sed voluptatem vero?</p>
            <button class="cakeCardBtn3">Detail</button>
        </div>

    </div>
    <button class="newsBtn page">More</button>
    <div class="cakeFive page">
        <div class="cakeFiveLeft">

        </div>
        <div class="cakeFiveTeam">
   <img src="../../public/上課用圖片/8.png" alt="">

    <div class="cakeFiveArr">
        <h1 class="cakeFiveArrWord">New Arrival </h1>
        <b class="cakeFiveP">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ea perspiciatis atque vitae assumenda aliquid excepturi dicta cum delectus odio mollitia aliquam eaque, officia nostrum similique labore provident dolor eveniet!</b>
    </div>

   </div>

    </div>
    <div class="cakeFooter page">
<h3>Copy@2023 by kou</h3>
    </div>
</template>
<style lang="scss" scoped>
hr {
    border: 2px solid black;
}

body {
    margin: 0;
}

.page {
    width: 100vw;
    display: flex;

}

.cakeOne {
    display: flex;
    justify-content: space-around;
    border: 0px solid black;
    height: 25vh;

    .cakeTop {
        position: relative;
        width: 150px;
        height: 150px;
        background-color: rgb(255, 192, 213);
        right: 18%;
        top: 8%;

    }

    .cakeTopRight {
        width: 100px;
        height: 100px;
        left: 18%;
        top: 15%;
        position: relative;
    }
}

.cakeTwo {
    .cakeTwoLeft {
        margin: 120px;
        .cakeFiveP1{
            font-size: 20pt;
        }
    }

    .cakeTwoRight {
        margin: 80px;
    }
}

.cakeThree {
    flex-direction: column;

    .cakeThreeImgs {
        display: flex;
        margin: 100px;
        justify-content: space-between;

        .cakeThreeImgs1 {
            display: flex;
            flex-direction: column;
            transition: 0.3s;
            &:hover {
                transform:translateY(-15px);
                }

            .cakeThreeBtn1 {
                width: 200px;
                height: 58px;
                border: 0;
                background-color: rgb(255, 136, 176);
                color: aliceblue;
                position: relative;
                bottom: 100px;
                left: 100px;

                &:hover {
                    background-color: rgb(132, 255, 255);
                    color: rgb(28, 18, 83);
                }


            }
        }

        .cakeThreeImgs2 {
            display: flex;
            flex-direction: column;transition: 0.3s;
            &:hover {
                transform:translateY(-15px);
                }

            .cakeThreeBtn2 {
                width: 200px;
                height: 58px;
                border: 0;
                background-color: rgb(255, 136, 176);
                color: aliceblue;
                position: relative;
                bottom: 100px;
                left: 100px;

                &:hover {
                    background-color: rgb(132, 255, 255);
                    color: rgb(28, 18, 83);
                }


            }
        }

        .cakeThreeImgs3 {
            display: flex;
            flex-direction: column;transition: 0.3s;
            &:hover {
                transform:translateY(-15px);
                }

            .cakeThreeBtn3 {
                width: 200px;
                height: 58px;
                border: 0;
                background-color: rgb(255, 136, 176);
                color: aliceblue;
                position: relative;
                bottom: 100px;
                left: 100px;

                &:hover {
                    background-color: rgb(132, 255, 255);
                    color: rgb(28, 18, 83);
                }


            }
        }
    }
}

.cakeFour {
    margin-top: 10vh;
    border: 0px solid black;
    height: 85vh;
    display: flex;
    justify-content: space-around;

    .cakeCard1 {
        height: 70vh;
        width: 26vw;
        border: 0px solid black;
        box-shadow: 0px 20px 15px -1px #000;transition: 0.3s;
            &:hover {
                transform: scale(1.2, 1.2);
                }

        .cakeCardBtn1 {
            height: 10vh;
            width: 12vw;
            color: white;
            position: relative;
            right: 20%;
            background-color: rgb(53, 53, 53);
            font-size: 26pt;

        }
    }

    .cakeCard2 {
        height: 70vh;
        width: 26vw;
        border: 0px solid black;
        box-shadow: 0px 20px 15px -1px #000;transition: 0.3s;
            &:hover {
                transform: scale(1.2, 1.2);
                }

        .cakeCardBtn2 {
            height: 10vh;
            width: 12vw;
            color: white;
            position: relative;
            right: 20%;
            background-color: rgb(53, 53, 53);
            font-size: 26pt;

        }
    }

    .cakeCard3 {
        height: 70vh;
        width: 26vw;
        border: 0px solid black;
        box-shadow: 0px 20px 15px -1px #000;transition: 0.3s;
            &:hover {
                transform: scale(1.2, 1.2);
                }

        .cakeCardBtn3 {
            height: 10vh;
            width: 12vw;
            color: white;
            position: relative;
            right: 20%;
            background-color: rgb(53, 53, 53);
            font-size: 26pt;

        }
    }

}

.newsBtn {
    justify-content: center;
    position: relative;
    left: 43%;
    display: flex;
    width: 200px;
    height: 58px;
    border: 0;
    background-color: rgb(255, 136, 176);
    color: aliceblue;
    font-size: 26pt;
    box-shadow: 0px 20px 15px -12px #000;
transition: 0.5s;
    &:hover {
        background-color: rgb(132, 255, 255);
        color: rgb(28, 18, 83);
    }
}



.cakeFooter{
    background-color: pink;
    height: 20vh;
    display: flex;
    align-items:center ;
    justify-content: center;
}
.cakeFive {
    height: 150vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 0px solid black;
    .cakeFiveLeft
    {background-color: pink;
        height: 700px;
        width:700px ;
        left: 0;
        position: absolute;  
        z-index: -2; 
    }
.cakeFiveTeam{
    display: flex;
    margin-left: 7vw;
    .cakeFiveArr{
        margin-left: 1vw;
        width: 30%;
    align-items: center;
    justify-content: space-around;
        background-color: pink;
        
        
        }

        .cakeFiveP{
            font-size: 20pt;
        }
    }
}




</style>