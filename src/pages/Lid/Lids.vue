<template>
    <div class="box">
      <div class="table_box">
        <section class="header">
          <div class="right">
            <input
              type="text"
              v-model="search"
              class="filter"
              placeholder="Foydalanuvchi kodi bo'yicha"
            />
  
            <button class="btn btn-primary" @click="exportExcel">
              Excelga export qilish
            </button>
            <button class="btn btn-primary" @click="openAddModal">
              Lid qo'shish
            </button>
          </div>
        </section>
  
        <section class="main">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="th">#</th>
                <th class="th">To‘liq ismi</th>
                <th class="th">Telefon</th>
                <th class="th">Elektron pochta</th>
                <th class="th">Foydalanuvchi kodi</th>
                <th class="th">Yaratilgan sana</th>
                <th class="th">Amallar</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in filteredUsers"
                :key="user.id"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.tel }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.userCod }}</td>
                <td>{{ user.create }}</td>
                <td>
                  <i class="icon bi bi-eye" @click="viewUser(user)"></i>
                  <i class="icon bi bi-pencil-square" @click="openEditModal(user)"></i>
                  <i class="icon bi bi-trash" @click="deleteUser(user)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
  
        <section class="footer">
          <p class="left">
            Jami foydalanuvchilar: <span>{{ users.length }}</span>
          </p>
        </section>
      </div>
  
      <!-- Add/Edit Modal -->
      <div class="modal" :class="{ modal_none: !modalVisible }" @click.self="closeModal">
        <div class="modal_nav">
          <h1>{{ editMode ? 'Foydalanuvchini tahrirlash' : "Yangi lead qo'shish" }}</h1>
  
          <input v-model="modalUser.userCod" placeholder="Foydalanuvchi kodi" />
          <input v-model="modalUser.name" placeholder="To'liq ismi" />
          <input v-model="modalUser.email" placeholder="Elektron pochta" />
          <input v-model="modalUser.tel" placeholder="Telefon raqam" />
  
          <button @click="saveUser">{{ editMode ? 'Saqlash' : 'Qo‘shish' }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import * as XLSX from "xlsx";
  export default {
    data() {
      return {
        search: '',
        users: [
          {id:1, userCod:"CT-00001", name:"Botirjon", email:"a@a.com", tel:"+998901234567", create:"2025-07-01"},
          {id:2, userCod:"CT-00002", name:"Alisher",  email:"b@b.com", tel:"+998911234567", create:"2025-06-29"},
        ],
        modalVisible: false,
        editMode: false,
        modalUser: {},
      };
    },
    computed: {
      filteredUsers() {
        if (!this.search) return this.users;
        return this.users.filter(u =>
          u.userCod.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    methods: {
      exportExcel() {
        const ws = XLSX.utils.json_to_sheet(this.users);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "users.xlsx");
      },
      openAddModal() {
        this.editMode = false;
        this.modalUser = {userCod: '', name:'', email:'', tel:''};
        this.modalVisible = true;
      },
      openEditModal(user) {
        this.editMode = true;
        this.modalUser = {...user};
        this.modalVisible = true;
      },
      viewUser(user) {
        alert(`
          Kod: ${user.userCod}
          Ismi: ${user.name}
          Email: ${user.email}
          Tel: ${user.tel}
        `);
      },
      deleteUser(user) {
        if (confirm("Rostan ham o‘chirmoqchimisiz?")) {
          this.users = this.users.filter(u => u.id !== user.id);
        }
      },
      saveUser() {
        if (!this.modalUser.userCod || !this.modalUser.name) {
          return alert("Kerakli maydonlarni to‘ldiring");
        }
        if (this.editMode) {
          const idx = this.users.findIndex(u=>u.id===this.modalUser.id);
          this.$set(this.users, idx, {...this.modalUser});
        } else {
          this.users.push({
            ...this.modalUser,
            id: Date.now(), create: new Date().toISOString().split("T")[0]
          });
        }
        this.closeModal();
      },
      closeModal() {
        this.modalVisible = false;
      }
    }
  };
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
    /* MODAL overlay */
    .modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5); /* qoramtir fon */
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.modal_nav {
  width: 25%; /* o'ng tomondan 1/4 ekran */
  height: 100%;
  background-color: #fff;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

.modal_nav h1 {
  font-size: 26px;
  margin-bottom: 30px;
  font-weight: 600;
}

.modal_nav p {
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
}

.modal_nav input[type="text"] {
  border: none;
  border-radius: 20px;
  background-color: #f5f5f5;
  font-size: 16px;
  padding: 12px 16px;
  margin-bottom: 20px;
  width: 100%;
  outline: none;
  transition: border 0.2s ease;
}

.modal_nav input:focus {
  border: 1px solid #007bff;
  background-color: #fff;
}

.modal_nav button {
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  background-color: #42a1ff;
  font-size: 18px;
  color: #000;
  font-weight: 500;
  border: 1px solid #2c8ce5;
  transition: background 0.2s ease;
}

.modal_nav button:hover {
  background-color: #2c8ce5;
  color: #fff;
}

/* Switch (checkbox) style */
.input_checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.switch {
  position: relative;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch span {
  position: absolute;
  cursor: pointer;
  background: #ccc;
  border-radius: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.3s;
}

.switch span::before {
  content: "";
  position: absolute;
  height: 22px;
  width: 22px;
  left: 2px;
  top: 2px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}

.switch input:checked + span {
  background: #4caf50;
}

.switch input:checked + span::before {
  transform: translateX(24px);
}

/* Modal yopish uchun class */
.modal_none {
  display: none;
}

/* Animatsiya chiqishda */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}


  </style>
  