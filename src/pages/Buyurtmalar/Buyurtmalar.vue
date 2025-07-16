<template>
    <div class="box">
      <div class="table__box">
        <section class="header">
          <h2>Buyurtmalar</h2>
          <router-link to="/buyurtmaEdit" class="btn btn-primary">
            + Buyurtma qo‘shish
          </router-link>
        </section>
  
        <section class="main">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="th">#</th>
                <th class="th">Mijoz</th>
                <th class="th">Telefon</th>
                <th class="th">Mahsulot</th>
                <th class="th">Sana</th>
                <th class="th">Status</th>
                <th class="th">Amallar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" :key="order.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ order.customer }}</td>
                <td>{{ order.phone }}</td>
                <td>{{ order.product }}</td>
                <td>{{ order.date }}</td>
                <td>
                  <span
                    :class="{
                      status: true,
                      pending: order.status === 'Kutilmoqda',
                      completed: order.status === 'Yakunlandi',
                      canceled: order.status === 'Bekor qilindi',
                    }"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <i class="icon bi bi-eye"></i>
                  <i class="icon bi bi-pencil-square"></i>
                  <i class="icon bi bi-trash"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [
          {
            id: 1,
            customer: "Botirjon Tursunboyev",
            phone: "+998 90 123 45 67",
            product: "Noutbuk ASUS",
            date: "2025-07-14",
            status: "Kutilmoqda",
          },
          {
            id: 2,
            customer: "Alisher Karimov",
            phone: "+998 91 765 43 21",
            product: "Smartfon Samsung",
            date: "2025-07-12",
            status: "Yakunlandi",
          },
          {
            id: 3,
            customer: "Nodira Ismoilova",
            phone: "+998 93 112 22 33",
            product: "Monitor LG",
            date: "2025-07-10",
            status: "Bekor qilindi",
          },
        ],
      };
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
  .header h2 {
    font-size: 24px;
    font-weight: bold;
  }
  .btn-primary {
    background-color: #42a1ff;
    padding: 10px 20px;
    border-radius: 10px;
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  .btn-primary:hover {
    background-color: #0080ffe0;
  }
  .main {
    border-radius: 10px;
    margin-top: 20px;
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
  /* Status ranglari */
  .status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
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
  </style>
  