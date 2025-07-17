<template >
    <div class="box">
        <div class="edit_box">
            <button type="button" @click="ortga()" class="btns">Orqaga</button>
                <h1>Lid tafsilotlari</h1>
                <div class="card">
                    <router-link to="/buyurtmaEdit" ><i class="bi bi-pencil-square"></i></router-link>
                    <!-- <p>Foydalanuvchi kodi: <span>{{ $store.state.count }}</span></p>
                    <p>Telefon: <span>{{}}</span></p>
                    <p>Elektron pochta: <span>{{}}</span></p>
                    <p>Name (UZ): <span>{{}}</span></p>
                    <p>Name (RU): <span>{{}}</span></p>
                    <p>Name (ZH): <span>{{}}</span></p>
                    <p>Vazn (kg): <span>{{}}</span></p>
                    <p>M³: <span>{{}}</span></p>
                    <p>O'rtacha og'irlik (kg/m³): <span>{{}}</span></p>
                    <p>Sklad: <span>{{}}</span></p>
                    <p>Narx: <span>{{}}</span></p>
                    <p>Yaratilgan sana: <span>{{}}</span></p>
                    <p>Holat: <span>{{}}</span></p> -->
                    
                    
                    
                    
                    <table class="table">
                      <tbody v-for="user in users" :key="user.id">
                        <tr>
                          <td>Foydalanuvchi kodi: <span>{{ user.userCod }}</span></td>
                        </tr>
                        <tr>
                          <td>Telefon: <span>{{ user.tel }}</span></td>
                        </tr>
                        <tr>
                          <td>Elektron pochta: <span>{{ user.email }}</span></td>
                        </tr>
                        <tr>
                          <td>Name (UZ): <span>{{ user.nameUz }}</span></td>
                        </tr>
                        <tr>
                          <td>Name (RU): <span>{{ user.nameRu }}</span></td>
                        </tr>
                        <tr>
                          <td>Name (ZH): <span>{{ user.nameZh }}</span></td>
                        </tr>
                        <tr>
                          <td>Vazn (kg): <span>{{ user.weight }}</span></td>
                        </tr>
                        <tr>
                          <td>M³: <span>{{ user.m3 }}</span></td>
                        </tr>
                        <tr>
                          <td>O'rtacha og'irlik (kg/m³): <span>{{ user.density }}</span> </td>
                        </tr>
                        <tr>
                          <td>Sklad:  <span>{{ user.warehouse }}</span></td>
                        </tr>
                        <tr>
                          <td>Narx: <span>{{ user.price }}</span></td>
                        </tr>
                        <tr>
                          <td>Yaratilgan sana: <span>{{ user.create }}</span></td>
                        </tr>
                        <tr>
                          <td>Holat: <span>{{ user.status }}</span></td>
                        </tr>

                      </tbody>
                    </table>
                </div>
        </div>
        <div class="plus_box">
            <Buyurtmalar/>
        </div>
    </div>
</template>
<script>
import store from '@/store';
import Buyurtmalar from "../Buyurtmalar/Buyurtmalar.vue";
import axios from "axios";
export default {
    components:{
        Buyurtmalar
    },
    data() {
  return {
    search: '',
    modalVisible: false,
    editMode: false,

    users: [],

    modalUser: {
      userCod: '',
      name: '',
      tel: '',
      email: '',
      nameUz: '',
      nameRu: '',
      nameZh: '',
      weight: '',
      m3: '',
      density: '',
      price: '',
      warehouse: '',
      status: 'Bog‘lanilmagan'
    }
  };
},
methods:{
    ortga(){
        this.$router.push("/lids")
    }
},
mounted(){
    axios.get('http://localhost:3000/users')
        .then((res)=>{
            this.users = res.data
        })
}
}
</script>
<style scoped>
    .box{
        display: flex;
        flex-direction: column;
        /* width: 100%; */
        height: 100%;
        padding: 40px;
    }
    .btns{
        font-size: 23px;
        padding: 5px 10px;
        border-radius: 10px;
        border:none;
        background-color: rgb(224, 224, 224);
        margin-bottom: 20px;

    }
    p{
        font-size: 26px;
    }
    .edit_box{
        width: 700px;
    }
    .edit_box h1{
        font-size: 35px;
        margin-bottom: 20px;
    }
    .card{
        padding: 20px;
        border: none;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
    .card i{
        margin-top: -10px;
        margin-left: 640px;
        font-size: 25px;
    }
    td{
        font-size: 17px;
        padding: 12px;
        color: rgb(117, 117, 117);
        display: flex;
        justify-content: space-between;
    }
    td span{
        color: rgb(0, 0, 0);
    }
</style>