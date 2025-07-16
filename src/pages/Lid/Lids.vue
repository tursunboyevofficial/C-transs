<template>
    <div class="box">
        <section class="header">
            <div class="right">
                <input type="text" class="filter" placeholder="Foydalanuvchi kodi bo'yicha ">
                <button class="btn btn-primary">+ Foydalanuvchi qo'shish</button>
                <button class="btn btn-primary">+ Foydalanuvchi qo'shish</button>
                <button class="btn btn-primary">+ Foydalanuvchi qo'shish</button>
            </div>
            
            <article>
                <button class="btn btn-primary">+ Foydalanuvchi qo'shish</button>
                <button class="btn btn-primary">+ Foydalanuvchi qo'shish</button>
            </article>
        </section>
        <section class="main">
            <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="th" scope="col">#</th>
                    <th class="th" scope="col">	To‘liq ismi</th>
                    <th class="th" scope="col">Telefon</th>
                    <th class="th" scope="col">Elektron pochta</th>
                    <th class="th" scope="col">Foydalanuvchi kodi</th>
                    <th class="th" scope="col">Yaratilgan sana</th>
                    <th class="th" scope="col">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><i class="icon bi bi-eye"></i> <i class="icon bi bi-pencil-square"></i> <i class="icon bi bi-trash"></i></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>John</td>
                    <td>Doe</td>
                    <td>@social</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>@social</td>
                  </tr>
                </tbody>
            </table>
        </section>
        <section class="footer">
            <p class="left">Jami foydalanuvchilar: <span>{{ $store.state.count }}</span></p>
            <button class="right">1 2 </button>
        </section>
    </div>
</template>
<script>
import store from "@/store/index.js";
export default {
    
}
</script>
<style scoped>
.box{
    box-shadow: 0.4px 0.4px 4px 1px;
    padding: 40px;
    flex-direction: column;

    
}
.header{
    display: flex;
    justify-content: space-between;
    height: 70px;
    align-items: center;
    width: 100%;
}
.header p{
    font-size: 20px;
    display: flex;
    margin-bottom: 0;
    color:rgb(117, 117, 117);
}
.header p span{
    color: #000;
    margin-left: 5px;
}
article{
    display: flex;
    align-items: center;
}
.filter{
    width: 270px;
    height: 37px;
    border-radius: 10px;
    margin-right: 10px;
    border: none;
    background-color: rgb(247, 247, 247);
    font-size: 1rem;
    padding: 0 10px;
    }

    /* Main */
    .main{
        border-radius: 10px;
        margin-top: 5px;
    }


    td, th{
        font-size: 18px;
    }
    .th{
        color: rgb(77, 77, 77);
        background: rgb(247, 247, 247);
        padding: 15px;
    }
    td{
        font-weight: 400;
        padding:15px;
    }
    .icon{
        margin-right: 5px;
        cursor: pointer;
        color: rgb(77, 77, 77);
    }
    .icon:hover{
        background-color: rgb(230, 230, 230);
        color:#0d6efd;
    }

    /* Footer */

    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left{
        font-size: 20px;
    }
    .left span{
        color:#0d6efd;
    }
    .right{
        font-size: 20px;
    }
</style>