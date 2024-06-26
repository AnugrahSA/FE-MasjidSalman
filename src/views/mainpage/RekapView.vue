<template>
  <div class="profile">
    <div class="card1">
      <div class="card mb-3" style="max-width: 1381px; max-height: fit-content">
        <div class="kepala" style="width: 1381px">
          <p @click="goBack">
            <b-icon-arrow-left-circle-fill
              style="margin-right: 26px"
            ></b-icon-arrow-left-circle-fill
            >Laporan / Laporan Rekap
          </p>
        </div>
        <!-- Tambahkan elemen tabel di bawah -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Program - Kegiatan</th>
                <th style="width: 20%">Target</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>Mei</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Agust</th>
                <th>Sept</th>
                <th>Okt</th>
                <th>Nov</th>
                <th>Des</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programRekap.length === 0">
                <tr>
                  <td colspan="15" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programRekap" :key="index">
                  <td>{{ program.no }}</td>
                  <td>{{ program.namaprogram }}</td>
                  <td>{{ program.target }}</td>
                  <td>{{ program.jan }}</td>
                  <td>{{ program.feb }}</td>
                  <td>{{ program.mar }}</td>
                  <td>{{ program.apr }}</td>
                  <td>{{ program.mei }}</td>
                  <td>{{ program.jun }}</td>
                  <td>{{ program.jul }}</td>
                  <td>{{ program.agust }}</td>
                  <td>{{ program.sept }}</td>
                  <td>{{ program.okt }}</td>
                  <td>{{ program.nov }}</td>
                  <td>{{ program.des }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- Akhir dari elemen tabel -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      // Fungsi ini akan mengarahkan pengguna kembali ke halaman sebelumnya
      this.$router.go(-1); // Menggunakan Vue Router untuk navigasi kembali
    },
  },
  data() {
    return {
      programRekap: [
        // Di sini Anda dapat menambahkan data rekap atau mengambilnya dari sumber eksternal
      ],
    };
  },
};
</script>

<style>
.card1 {
  padding-left: 60px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card1 .card {
  background-color: white;
}

.kepala {
  background-color: #967c55;
  height: 70px;
  width: 1381px;
}

.kepala p {
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-top: 18px;
  margin-left: 24px;
}

.teks {
  margin-left: 19px;
  margin-top: 30px;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.table-container {
  padding-left: 24px;
  padding-right: 17px;
  padding-top: 39px;
}

.table {
  width: calc(100% - 41px); /* 24px (padding kiri) + 17px (padding kanan) */
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  font-size: 12px;
  font-weight: 600;
}
</style>
