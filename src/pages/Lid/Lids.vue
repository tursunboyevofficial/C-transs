<template>
    <div class="box">
        <div class="table_box">
            <section class="header">
            <div class="right">
                <input type="text" v-model="this.search" class="filter" placeholder="Foydalanuvchi kodi bo'yicha ">
                <div class="btn-group" role="group">
                  <button type="button" @click="filtered()" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Barcha xolatlar
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Barcha xoltlar</a></li>
                    <li><a class="dropdown-item" href="#">Bog'lanilgan</a></li>
                    <li><a class="dropdown-item" href="#">Bog'lanilmagan</a></li>
                  </ul>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Barcha omborlar
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Barcha omborlar</a></li>
                    <li><a class="dropdown-item" href="#">Yiwu</a></li>
                    <li><a class="dropdown-item" href="#">Foshan</a></li>
                    <li><a class="dropdown-item" href="#">Qashqar</a></li>
                    <li><a class="dropdown-item" href="#">Hargos</a></li>
                  </ul>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Yangi boshidan
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Yangi boshidan</a></li>
                    <li><a class="dropdown-item" href="#">Eski boshidan</a></li>
                  </ul>
                </div>
                


            </div>
            
            <article>
                <button class="btn btn-primary">Excelga export qilish</button>
                <button class="btn btn-primary">Lid qo'shish</button>
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
                    <tbody v-for="user in users" :key="user.id">
                      <tr>
                        <th scope="row">1</th>
                        <td>{{ user.name }}</td>
                        <td>{{user.tel}}</td>
                        <td>{{ user.email }}</td>
                        <td>{{user.userCod}}</td>
                        <td>{{user.create}}</td>
                        <td><i class="icon bi bi-eye"></i> <i class="icon bi bi-pencil-square"></i> <i class="icon bi bi-trash"></i></td>
                      </tr>
                    </tbody>
                </table>
            </section>
            <section class="footer">
                <p class="left">Jami foydalanuvchilar: <span>{{ $store.state.count }}</span></p>
                <button class="right">1 2 </button>
            </section>
        </div>
    </div>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
export default {
    data(){
        return{
            search:'',
            users:{}
        }
    },
    mounted(){
        axios
        .get("http://localhost:3000/users")
        .then((res)=>{
            this.users = res.data
        })
        .catch((errorsa =>{
            console.log("Xatolik",errorsa);
        }))
    },
    methods:{
        filtered(){
            return this.users.filter(user =>
            user.userCode.toLowerCase().includes(this.search.toLowerCase()),
            console.log(this.users,'filter')
            )
        }
    }
}
</script>
<style scoped>
.box{
    padding: 20px;
    height: 100%;
    display: inline-block;
    
}
.table_box{
    padding: 30px;
    border-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
    width: 230px;
    height: 37px;
    border-radius: 10px;
    margin-right: 10px;
    border: none;
    background-color: rgb(247, 247, 247);
    font-size: 1rem;
    padding: 0 10px;
    }
    .btn{
        margin-right: 10px;
    }
    input{
        outline: none;
    }
input:focus{
    border: 1px solid #1875ff;
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
        font-size: 10px;
    }


</style>