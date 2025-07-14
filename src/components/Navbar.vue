<template >
    <div class="box">
        <div class="left">
            <p>Foydalanuvchilar</p>
        </div>
        <div class="right">
            <button class="btns1 btn btn-outline"><i class="bi bi-moon-stars"></i></button>
            <div class="btns1 btn-group btns" role="group">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="language_flag" width="17px" height="17px" alt="">
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"><img src="../assets/Icon/china.png" class="img_flag" width="17px" height="17px" alt="China Flag">中文</a></li>
                <li><a class="dropdown-item" href="#"><img src="../assets/Icon/russia.png" class="img_flag" width="17px" height="17px" alt="Russia flag">Russia</a></li>
                <li><a class="dropdown-item" href="#"><img src="../assets/Icon/united.png" class="img_flag" width="17px" height="17px" alt="UZB flag">UZB</a></li>
              </ul>
            </div>
            <button class="btn btns1 btn-outline"><i class="bi bi-person-circle"></i></button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 20px;
        border-bottom:1px solid rgb(214, 214, 214);
    }
    .right{
        display: flex;
        align-items: center;
    }
    .left p{
        font-size: 20px;
        margin: 0;
    }
    .left{
        display: flex;
        align-items: center;
    }
    .btns1{
        margin-right: 15px;
        font-size: 20px;
    }
</style>