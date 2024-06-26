<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Persetujuan akun</p>
        </div>
        <div class="show-box">
          <p class="show-text">Show</p>
          <select
            @change="handleChange"
            v-model="itemsPerPage"
            style="margin-top: 18px"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th style="font-weight: bold">Name</th>
                <th style="font-weight: bold">Email</th>
                <th style="width: 170px; font-weight: bold">Tipe User</th>
                <th style="width: 170px; font-weight: bold">
                  Email Verifikasi
                </th>
                <th style="width: 50px; text-align: center; font-weight: bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="paginatedDataAkun.length === 0">
                <tr>
                  <td colspan="5" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(account, index) in paginatedDataAkun" :key="index">
                  <td>{{ account.name }}</td>
                  <td>{{ account.email }}</td>
                  <td
                    :class="{
                      'admin-color': account.tipe_user === 'Admin',
                      'pengguna-color': account.tipe_user === 'Pengguna',
                    }"
                    style="text-align: center"
                  >
                    {{ account.tipe_user }}
                  </td>
                  <td
                    :class="{
                      'verified-color': account.verification === 'Verified',
                      'not-verified-color':
                        account.verification === 'Not Verified',
                    }"
                    style="text-align: center"
                  >
                    {{ account.verification }}
                  </td>
                  <td style="text-align: center; position: relative">
                    <button
                      type="button"
                      style="border-style: none"
                      @click="toggleActions(index)"
                    >
                      <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
                    </button>
                    <div v-if="activeRow === index" class="actions-dropdown">
                      <button @click="deleteUser(account, index)">
                        Delete
                      </button>
                      <button @click="selectUser(account)">
                        Jadikan Pengguna
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Pop-up Konfirmasi -->
    <div v-if="confirmDelete !== null" class="confirmation-popup">
      <div class="confirmation-card">
        <b-icon-exclamation-circle-fill
          style="color: #f24e1e; width: 126px; height: 126px"
        ></b-icon-exclamation-circle-fill>
        <p style="font-size: 32px; font-weight: bold">
          Anda yakin menghapus akun?
        </p>
        <div class="confirmation-buttons">
          <button
            @click="deleteConfirmed"
            style="
              width: 259px;
              height: 47px;
              background-color: #967c55;
              color: white;
              margin-right: 14px;
              font-size: 16px;
              font-weight: bolder;
            "
          >
            HAPUS
          </button>
          <button
            @click="cancelDelete"
            style="
              width: 259px;
              height: 47px;
              background-color: #a4a4a3;
              color: black;
              font-size: 16px;
              font-weight: bolder;
            "
          >
            BATAL
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";

export default {
  data() {
    return {
      dataAkun: [],
      itemsPerPage: 5, // Default jumlah item per halaman
      activeRow: null, // To track which row's actions dropdown is open
      confirmDelete: null, // Untuk melacak pengguna yang akan dihapus
    };
  },

  components: {
    Sidebar,
  },

  computed: {
    paginatedDataAkun() {
      return this.dataAkun.slice(0, this.itemsPerPage);
    },
  },

  methods: {
    toggleActions(index) {
      if (this.activeRow === index) {
        this.activeRow = null; // Tutup dropdown jika sudah terbuka
      } else {
        this.activeRow = index; // Buka dropdown untuk baris yang diklik
      }
    },
    deleteUser(account, index) {
      // Tampilkan pop-up konfirmasi
      this.confirmDelete = index;
    },
    deleteConfirmed() {
      // Implementasikan logika untuk menghapus pengguna
      if (this.confirmDelete !== null) {
        console.log("Deleting user:", this.dataAkun[this.confirmDelete].name);
        // Implementasikan logika hapus di sini, misalnya memanggil API atau memodifikasi data secara langsung
        this.dataAkun.splice(this.confirmDelete, 1);
        this.confirmDelete = null; // Tutup pop-up konfirmasi
      }
    },
    cancelDelete() {
      // Batalkan penghapusan
      this.confirmDelete = null;
    },
    handleChange() {
      // Implementasikan logika untuk menangani perubahan jumlah item per halaman
    },
    fetchDataFromApi() {
      // Contoh fungsi untuk mengambil data dari API dengan Axios
      axios
        .get("/user")
        .then((response) => {
          this.dataAkun = response.data.map((account) => ({
            ...account,
            tipe_user: account.is_admin === 1 ? "Admin" : "Pengguna",
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },

  created() {
    // Panggil fungsi fetchDataFromApi pada saat komponen dibuat
    this.fetchDataFromApi();
  },
};
</script>

<style>
.confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirmation-card {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 594px;
  height: 350px;
  text-align: center;
  padding-top: 48px;
}

.confirmation-buttons {
  display: flex;
  margin-left: 31px;
  margin-top: 20px;
}

.confirmation-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirmation-buttons button:first-child {
  background-color: red;
  color: white;
}

.confirmation-buttons button:last-child {
  background-color: grey;
  color: white;
}

.actions-dropdown {
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
}
.actions-dropdown button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.actions-dropdown button:hover {
  background-color: #f9f9f9;
}

.card-container {
  padding-left: 260px;
  padding-top: 33px;
  overflow-y: auto;
}

.card .kepala {
  background-color: #967c55;
  height: 70px;
  width: 1149px;
}

.kepala p {
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-top: 18px;
  margin-left: 24px;
}

.show-box {
  display: flex;
  align-items: center;
}

.show-text {
  font-weight: bold;
  font-size: 16;
  margin-left: 19px;
  margin-top: 30px;
  margin-right: 14px;
}

select {
  height: 30px;
  width: 70px;
}

.teks {
  margin-left: 19px;
  margin-top: 30px;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.box {
  height: 40px;
  width: 1108px;
  background-color: #d9d9d9;
  margin-top: 24px;
  margin-bottom: 16px;
  display: flex;
}

.text {
  color: black;
  font-weight: bold;
  text-align: start;
  margin-top: 8px;
  margin-left: 15px;
}

.tabel-container {
  padding-left: 18px;
  padding-top: 22px;
  padding-bottom: 30px;
}

.tabel {
  width: 1110px;
  border-collapse: collapse;
}

.tabel th,
.tabel td {
  border: 1px solid #cccccc;
  padding: 8px;
  font-size: 12px;
}

.tabel th {
  background-color: #c2c2c2;
  font-size: 12px;
  font-weight: 600;
  width: calc(100% / 4);
}

.hapus-btn,
.setuju-btn {
  width: 67px;
  height: 26px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.hapus-btn {
  background-color: red;
  margin-left: 12px;
  margin-right: 7px;
}

.setuju-btn {
  background-color: blue;
  margin-right: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 20px;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 120px;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-menu p {
  margin: 0;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-menu p:hover {
  background-color: #f0f0f0;
}

/* Warna teks berdasarkan tipe pengguna */
.admin-color {
  color: #9e9fff;
}

.pengguna-color {
  color: #83d357;
}

/* Warna teks berdasarkan status verifikasi email */
.verified-color {
  color: #83d357;
}

.not-verified-color {
  color: #ff5d47;
}
</style>
