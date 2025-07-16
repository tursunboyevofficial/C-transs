<template>
  <div class="box">
    <div class="table__box">
      <section class="header">
        <h2>Foydalanuvchilar</h2>
        <p>
          Jami foydalanuvchilar: <span>{{ $store.state.count }}</span>
        </p>
        <article>
          <input
            type="text"
            class="filter"
            placeholder="To'liq ismi bo'yicha qidirish"
            v-model="searchQuery"
          />
          <input
            type="text"
            class="filter"
            placeholder="Foydalanuvchi kodi bo'yicha "
          />
          <button class="btn btn-primary" @click="toggleModal()">
            + Foydalanuvchi qo'shish
          </button>
        </article>
      </section>

      <section class="main">
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="th" scope="col">#</th>
              <th class="th" scope="col">To‘liq ismi</th>
              <th class="th" scope="col">Telefon</th>
              <th class="th" scope="col">Elektron pochta</th>
              <th class="th" scope="col">Foydalanuvchi kodi</th>
              <th class="th" scope="col">Yaratilgan sana</th>
              <th class="th" scope="col">Amallar</th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in filteredUsers" :key="user.id">
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.tel }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.userCod }}</td>
              <td>{{ user.create }}</td>
              <td>
                <i class="icon bi bi-eye"></i>
                <i class="icon bi bi-pencil-square"></i>
                <i class="icon bi bi-trash"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div class="footer">
        <p class="left">
          Jami foydalanuvchilar: <span>{{ $store.state.count }}</span>
        </p>
        <button class="right">1 2</button>
      </div>
    </div>

    <div
      class="modal"
      :class="{ modal_none: modal }"
      @click.self="toggleModal()"
    >
      <div class="modal_nav">
        <h1>Yangi foydalanuvchi qo'shish</h1>
        <p>Foydalanuvchi kodi</p>
        <div class="input_checkbox">
          <input
            type="text"
            :disabled="!this.isActive"
            ref="userPush"
            v-model="this.newUser.newCode"
            class="input_number"
            name="kod"
            id="1"
          />
          <label class="switch">
            <input type="checkbox" v-model="isActive" />
            <span></span>
          </label>
        </div>
        <p>To'liq ismi</p>
        <div class="name">
          <input
            type="text"
            class="input"
            v-model="this.newUser.newName"
            name="kod"
            id="1"
          />
        </div>
        <p>Elektron pochta</p>
        <input type="text" name="kod" v-model="this.newUser.newEmail" id="1" />
        <p>Telefon raqam</p>
        <input
          type="text"
          name="kod"
          ref="newPhone"
          v-model="this.newUser.newPhone"
          id="1"
        />
        <button type="submit" @click="addUser()">Yaratish</button>
      </div>
    </div>
  </div>
</template>

<script>
import IMask from "imask";
import store from "@/store/index.js";
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      modal: true,
      isActive: false,
      searchQuery: "", // 🔍 для поиска
      newUser: {
        newCode: "",
        newName: "",
        newEmail: "",
        newPhone: "",
      },
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log("xato", err);
      });

    const element = this.$refs.userPush;
    if (element) {
      IMask(element, {
        mask: "CT-00000",
      });
    }

    const res = this.$refs.newPhone;
    if (res) {
      IMask(res, {
        mask: "+998 (00) 000-00-00",
      });
    }
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users;
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal;
    },
    addUser() {
      const newUser = {
        id: Date.now(),
        name: this.newUser.newName,
        tel: this.newUser.newPhone,
        email: this.newUser.newEmail,
        userCod: this.newUser.newCode,
        create: new Date().toISOString().split("T")[0], // yyyy-mm-dd
      };

      this.users.push(newUser); // qo‘shish
      this.$store.state.count = this.users.length; // agar Vuex bor bo‘lsa

      // inputlarni tozalash
      this.newUser = {
        newCode: "",
        newName: "",
        newEmail: "",
        newPhone: "",
      };
      this.isActive = false;

      // modalni yopish
      this.toggleModal();
    },
  },
  watch: {
    isActive() {
      if (!this.isActive) {
        this.newUser.newCode = "";
      }
    },
  },
};
</script>

<style scoped>
.box {
  position: relative;
  height: 100%;
  padding: 20px;
  flex-direction: column;
}

.table__box {
  border: 1px solid rgb(255, 255, 255);
  border-radius: 12px;
  padding: 16px;
  background-color: white;
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
article {
  display: flex;
  align-items: center;
}
article .filter {
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
.main {
  border-radius: 10px;
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

/* Footer */

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  font-size: 20px;
}
.left span {
  color: #0d6efd;
}
.right {
  font-size: 20px;
}
/* MODAL */
.modal {
  display: flex;
  justify-content: end;
  left: 0;
  width: 100%;
  background-color: rgba(15, 15, 15, 0.836);
}
.modal_nav {
  left: 400px;
  background: rgb(255, 255, 255);
  padding: 25px;
  justify-content: center;
  width: 33%;
}
.modal_nav h1 {
  font-size: 30px;
  margin-bottom: 20px;
}
.modal_nav p {
  font-size: 16px;
  margin: 0 0 6px 6px;
  font-weight: 400;
}
.modal_nav input {
  border-radius: 20px;
  border: none;
  background-color: rgb(247, 247, 247);
  margin-bottom: 20px;
  font-size: 23px;
  padding: 10px 20px;
  width: 580px;
}
.modal_nav button {
  width: 580px;
  border-radius: 20px;
  font-size: 20px;
  padding: 10px 0;
  margin-top: 30px;
  background-color: #42a1ff;
}
.modal_nav button:hover {
  background-color: #0080ffe0;
}
.chakk {
  width: 20px !important;
}
.modal_none {
  display: none;
  transition: 0.5s;
}
.input_number {
  width: 500px !important;
}
.input_checkbox {
  display: flex;
  align-items: center;
}
/* checkbox */

.switch {
  position: relative;
  width: 50px;
  height: 30px;
  display: inline-block;
  margin: -20px 0 0 10px;
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
  height: 26px;
  width: 26px;
  left: 1.5px;
  top: 1.5px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}
.switch input:checked + span {
  background: #4caf50;
}
.switch input:checked + span::before {
  transform: translateX(20px);
}
</style>
