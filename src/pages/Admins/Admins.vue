<template>
    <div class="box">
      <div class="table_box">
        <section class="header">
          <h2>Administratorlar</h2>
          <p>Jami foydalanuvchilar:<span>{{ users.length }}</span></p>
          <button class="btn " @click="openModal(null, 'create')">+ Yangi administratorlar qo'shish</button>
        </section>
  
        <section class="main">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="th" scope="col">#</th>
                <th class="th" scope="col">Foydalanuvchi nomi</th>
                <th class="th" scope="col">Telefon</th>
                <th class="th" scope="col">Roli</th>
                <th class="th" scope="col">Amallar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.tel }}</td>
                <td>{{ user.roli }}</td>
                <td>
                  <i class="icon bi bi-eye" @click="openModal(user, 'view')"></i>
                  <i class="icon bi bi-pencil-square" @click="openModal(user, 'edit')"></i>
                  <i class="icon bi bi-trash" @click="deleteUser(user.id)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
  
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h3>{{ modalMode === 'view' ? 'Administratorni ko’rish' : modalMode === 'edit' ? 'Administratorni tahrirlash' : "Yangi administrator qo'shish" }}</h3>
          <p>Foydalanuvchi:</p>
          <input type="text" v-model="modalData.name" class="filter" :disabled="modalMode === 'view'" />
          <p>Elektron pochta:</p>
          <input type="email" v-model="modalData.email" class="filter" :disabled="modalMode === 'view'" />
          <p>Telefon raqami:</p>
          <input type="text" v-model="modalData.tel" class="filter" :disabled="modalMode === 'view'" />
          <p>Parol:</p>
          <input type="password" v-model="modalData.password" class="filter" :disabled="modalMode === 'view'" />
          <p>Roli:</p>
          <select v-model="modalData.roli" class="filter" :disabled="modalMode === 'view'">
            <option value="Ombor ishchisi">Ombor ishchisi</option>
            <option value="Administrator">Administrator</option>
            <option value="Call-markaz">Call-markaz</option>
          </select>
          <div class="modal-buttons">
            <button v-if="modalMode !== 'view'" class="btn btn-success" @click="saveUser">Saqlash</button>
            <button class="btn btn-secondary" @click="closeModal">Yopish</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        users: [],
        showModal: false,
        modalMode: 'create',
        modalData: {
          id: null,
          name: "",
          email: "",
          tel: "",
          password: "",
          roli: ""
        }
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios.get("http://localhost:3000/users").then((res) => {
          this.users = res.data;
        });
      },
      openModal(user, mode) {
        this.showModal = true;
        this.modalMode = mode;
        if (user) {
          this.modalData = { ...user };
        } else {
          this.modalData = {
            id: null,
            name: "",
            email: "",
            tel: "",
            password: "",
            roli: ""
          };
        }
      },
      closeModal() {
        this.showModal = false;
      },
      saveUser() {
        if (this.modalData.id) {
          axios.put(`http://localhost:3000/users/${this.modalData.id}`, this.modalData)
            .then(() => this.fetchUsers());
        } else {
          axios.post("http://localhost:3000/users", this.modalData)
            .then(() => this.fetchUsers());
        }
        this.closeModal();
      },
      deleteUser(id) {
        axios.delete(`http://localhost:3000/users/${id}`)
          .then(() => this.fetchUsers());
      }
    }
  };
  </script>
  
  <style scoped>
  .btn{
    background-color: rgb(247, 247, 247);
  }
  .box {
    display: inline-block;
    padding: 20px;
    height: 100%;
  }
  .table_box {
    padding: 20px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  .header {
    display: flex;
    justify-content: space-between;
    height: 70px;
    align-items: center;
    width: 100%;
  }
  .header p {
    font-size: 20px;
    display: flex;
    margin-bottom: 0;
    color: rgb(117, 117, 117);
  }
  .header p span {
    color: #000;
    margin-left: 5px;
  }
  .main {
    border-radius: 10px;
    margin-top: 5px;
  }
  td,
  th {
    font-size: 18px;
  }
  .th {
    color: rgb(77, 77, 77);
    background: rgb(247, 247, 247);
    padding: 15px;
  }
  td {
    font-weight: 400;
    padding: 15px;
  }
  .icon {
    margin-right: 5px;
    cursor: pointer;
    color: rgb(77, 77, 77);
  }
  .icon:hover {
    background-color: rgb(230, 230, 230);
    color: #0d6efd;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: end;
    z-index: 999;
  }
  .modal {
    display: flex;
    background: white;
    padding: 30px;
    border-radius: 12px;
    width: 400px;
  }
  .modal h3 {
    margin-bottom: 20px;
  }
  .modal p {
    margin: 10px 0 5px;
  }
  .modal .filter {
    width: 100%;
    margin-bottom: 15px;
  }
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>