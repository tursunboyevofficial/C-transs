<template>
  <div class="box">
    <!-- Table Section -->
    <div class="table__box">
      <div class="filter__box">
        <div class="filter__left">
          <input
            type="text"
            placeholder="Buyurtma raqami bo‘yicha"
            v-model="searchOrderNumber"
            class="input"
          />
          <input
            type="text"
            placeholder="Foydalanuvchi kodi bo‘yicha"
            v-model="searchUserCode"
            class="input"
          />

          <select v-model="selectedWarehouse" class="input">
            <option value="">Barcha omborlar</option>
            <option v-for="item in warehouses" :key="item" :value="item">{{ item }}</option>
          </select>

          <select v-model="selectedShipment" class="input">
            <option value="">Barcha jo'natmalar</option>
            <option v-for="item in shipments" :key="item" :value="item">{{ item }}</option>
          </select>

          <select v-model="selectedStatus" class="input">
            <option value="">Barcha holatlar</option>
            <option v-for="item in statuses" :key="item" :value="item">{{ item }}</option>
          </select>

          <select v-model="selectedSort" class="input">
            <option value="">Yangi boshidan</option>
            <option v-for="item in sortOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="filter__right">
          <router-link to="/buyurtmaEdit" class="btn ">
            + Buyurtma qo‘shish
          </router-link>
        </div>
      </div>

      <section class="main">
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="th">#</th>
              <th class="th">Foydalanuvchi kodi</th>
              <th class="th">Buyurtma raqami</th>
              <th class="th">Umumiy miqdor</th>
              <th class="th">Jo'natmalar</th>
              <th class="th">Yaratilgan sana</th>
              <th class="th">Holat</th>
              <th class="th">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(order, index) in filteredOrders"
              :key="order.id"
              v-show="filteredOrders.length"
            >
              <th scope="row">
                {{ index + 1 + (currentPage - 1) * pageSize }}
              </th>
              <td>{{ order.userCode }}</td>
              <td>{{ order.orderCode }}</td>
              <td>{{ order.miqdor }}</td>
              <td>{{ order.jonatmaCode }}</td>
              <td>{{ order.date }}</td>
              <td>
                <span :class="['status', getStatusClass(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <td>
                <i class="icon bi bi-eye"></i>
                <i class="icon bi bi-pencil-square"></i>
                <i class="icon bi bi-trash"></i>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="text-center">Ma'lumot topilmadi</td>
            </tr>
          </tbody>
        </table>

        <div class="table__footer">
          <div class="left">Jami buyurtmalar: {{ filteredOrders.length }}</div>
          <div class="right">
            <button @click="prevPage" :disabled="currentPage === 1">Oldingi</button>
            <span>{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">
              Keyingi
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchOrderNumber: "",
      searchUserCode: "",
      selectedWarehouse: "",
      selectedShipment: "",
      selectedStatus: "",
      selectedSort: "",
      currentPage: 1,
      pageSize: 10,
      warehouses: ["Yiwu", "Foshan", "Qashqar", "Hargos"],
      shipments: ["Yuborildi", "Jo'natilmagan"],
      statuses: [
        "Kutilmoqda",
        "Yarim keldi",
        "To'liq keldi",
        "Yuborildi",
        "Xitoydan Chiqqan",
        "O'zbekistonga kirgan",
        "Toshkent ombori",
        "Bojxona rasmiylashtiruvi",
        "Yetkazib berilgan",
      ],
      sortOptions: ["Yangi birinchidan", "Eski birinchidan"],
      orders: [],
    };
  },
  computed: {
    filteredOrders() {
      let result = this.orders.filter((order) => {
        return (
          (!this.searchOrderNumber || order.orderCode?.includes(this.searchOrderNumber)) &&
          (!this.searchUserCode || order.userCode?.includes(this.searchUserCode)) &&
          (!this.selectedWarehouse || order.whereHaus === this.selectedWarehouse) &&
          (!this.selectedShipment || order.orderCode === this.selectedShipment) &&
          (!this.selectedStatus || order.status === this.selectedStatus)
        );
      });

      if (this.selectedSort === "Eski birinchidan") {
        result.reverse();
      }

      const start = (this.currentPage - 1) * this.pageSize;
      return result.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    },
  },
  methods: {
    getStatusClass(status) {
      if (status === "Kutilmoqda") return "pending";
      if (status === "Yarim keldi" || status === "To'liq keldi") return "completed";
      if (status === "Yuborildi") return "canceled";
      return "";
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => {
        this.orders = res.data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
  },
};
</script>

<style scoped>
.box {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.filter__box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
  align-items: center;
}
.filter__left {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filter__right {
  flex-shrink: 0;
}
.input, .btn {
  padding: 5px 12px;
  border: none;
  border-radius: 8px;
  width: 200px;
  font-size: 15px;
  background-color: rgb(247, 247, 247);
}
.input:focus {
  outline: none;
  border: 1px solid #1d92ff;
}
.btn-primary {
  background-color: #42a1ff;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.table__box {
  border: 1px solid rgb(255, 255, 255);
  border-radius: 12px;
  padding: 16px;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}
.main {
  margin-top: 10px;
}
.th {
  background: rgb(247, 247, 247);
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
}
th,
td {
  padding: 15px;
  font-size: 14px;
}
.icon {
  margin-right: 5px;
  cursor: pointer;
  color: rgb(77, 77, 77);
}
.icon:hover {
  color: #0d6efd;
}
.status {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  display: inline-block;
}
.pending {
  background-color: #fff3cd;
  color: #856404;
}
.completed {
  background-color: #d4edda;
  color: #155724;
}
.canceled {
  background-color: #f8d7da;
  color: #721c24;
}
.table__footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.text-center {
  text-align: center;
  font-style: italic;
  color: #666;
}
</style>