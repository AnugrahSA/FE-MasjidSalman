<template>
  <div class="profile">
    <div class="card1">
      <div class="card mb-3" style="max-width: 1381px; max-height: fit-content">
        <div class="kepala" style="width: 1381px">
          <p @click="goBack">
            <b-icon-arrow-left-circle-fill
              style="margin-right: 26px"
            ></b-icon-arrow-left-circle-fill>
            Laporan / Laporan Rekap
          </p>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th style="font-weight: bold">No</th>
                <th style="font-weight: bold; width: 200px">
                  Nama Program-Kegiatan
                </th>
                <th style="font-weight: bold">Target</th>
                <th style="font-weight: bold">Jan</th>
                <th style="font-weight: bold">Feb</th>
                <th style="font-weight: bold">Mar</th>
                <th style="font-weight: bold">Apr</th>
                <th style="font-weight: bold">Mei</th>
                <th style="font-weight: bold">Jun</th>
                <th style="font-weight: bold">Jul</th>
                <th style="font-weight: bold">Agust</th>
                <th style="font-weight: bold">Sep</th>
                <th style="font-weight: bold">Okt</th>
                <th style="font-weight: bold">Nov</th>
                <th style="font-weight: bold">Des</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data" :key="item.key">
                <td>{{ item.id }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.target }}</td>
                <td>{{ item.jan }}</td>
                <td>{{ item.feb }}</td>
                <td>{{ item.mar }}</td>
                <td>{{ item.apr }}</td>
                <td>{{ item.mei }}</td>
                <td>{{ item.jun }}</td>
                <td>{{ item.jul }}</td>
                <td>{{ item.august }}</td>
                <td>{{ item.sep }}</td>
                <td>{{ item.oct }}</td>
                <td>{{ item.nov }}</td>
                <td>{{ item.dec }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/lib/axios";
export default {
  data() {
    return {
      data: [], // Menyimpan data yang digabungkan dari ketiga API
    };
  },
  methods: {
    goBack() {
      // Fungsi ini akan mengarahkan pengguna kembali ke halaman sebelumnya
      this.$router.go(-1); // Menggunakan Vue Router untuk navigasi kembali
    },
    async fetchData() {
      try {
        // Ambil data dari ketiga API
        const [response1, response2, response3] = await Promise.all([
          axios.get("/api/custom/RKAKPI"),
          axios.get("/api/keyPerformanceIndicator"),
          axios.get("/api/itemKegiatanRKA"),
        ]);

        const dataRKAKPI = response1.data;
        const dataKPI = response2.data.data; // Akses array data dari objek dataKPI
        const dataItemKegiatanRKA = response3.data.data; // Akses array data dari objek dataItemKegiatanRKA

        // Logging all data received
        console.log("dataRKAKPI:", dataRKAKPI);
        console.log("dataKPI:", dataKPI);
        console.log("dataItemKegiatanRKA:", dataItemKegiatanRKA);

        // Check if data received are arrays
        if (!Array.isArray(dataRKAKPI)) {
          throw new Error("Data from RKAKPI API is not an array");
        }
        if (!Array.isArray(dataKPI)) {
          throw new Error("Data from KPI API is not an array");
        }
        if (!Array.isArray(dataItemKegiatanRKA)) {
          throw new Error("Data from itemKegiatanRKA API is not an array");
        }

        // Sort dataKPI by ID
        dataKPI.sort((a, b) => a.id - b.id);

        let mergedData = [];

        // Gabungkan data berdasarkan ID dan id_program_kegiatan_kpi
        dataRKAKPI.forEach((item) => {
          const targets = dataKPI.filter(
            (kpi) => kpi.id_program_kegiatan_kpi === item.id
          );
          const itemKegiatan = dataItemKegiatanRKA.find(
            (kegiatan) => kegiatan.id === item.id
          );

          const getMonthlyValue = (month, kegiatan) => {
            return kegiatan && kegiatan[`dana_${month}`]
              ? kegiatan.nilai_satuan * kegiatan.quantity
              : "0";
          };

          const jan = getMonthlyValue("jan", itemKegiatan);
          const feb = getMonthlyValue("feb", itemKegiatan);
          const mar = getMonthlyValue("mar", itemKegiatan);
          const apr = getMonthlyValue("apr", itemKegiatan);
          const mei = getMonthlyValue("mei", itemKegiatan);
          const jun = getMonthlyValue("jun", itemKegiatan);
          const jul = getMonthlyValue("jul", itemKegiatan);
          const august = getMonthlyValue("aug", itemKegiatan);
          const sep = getMonthlyValue("sep", itemKegiatan);
          const oct = getMonthlyValue("oct", itemKegiatan);
          const nov = getMonthlyValue("nov", itemKegiatan);
          const dec = getMonthlyValue("dec", itemKegiatan);

          if (targets.length > 0) {
            targets.forEach((target) => {
              mergedData.push({
                id: item.id,
                nama: item.nama,
                target: target.target,
                jan: jan,
                feb: feb,
                mar: mar,
                apr: apr,
                mei: mei,
                jun: jun,
                jul: jul,
                august: august,
                sep: sep,
                oct: oct,
                nov: nov,
                dec: dec,
                key: `${item.id}-${target.target}`,
              });
            });
          } else {
            mergedData.push({
              id: item.id,
              nama: item.nama,
              target: "Tidak ada target",
              jan: jan,
              feb: feb,
              mar: mar,
              apr: apr,
              mei: mei,
              jun: jun,
              jul: jul,
              august: august,
              sep: sep,
              oct: oct,
              nov: nov,
              dec: dec,
              key: `${item.id}-no-target`,
            });
          }
        });

        // Tambahkan data KPI yang tidak ada di RKAKPI
        dataKPI.forEach((kpi) => {
          if (
            !dataRKAKPI.find((item) => item.id === kpi.id_program_kegiatan_kpi)
          ) {
            const itemKegiatan = dataItemKegiatanRKA.find(
              (kegiatan) => kegiatan.id === kpi.id_program_kegiatan_kpi
            );

            const getMonthlyValue = (month, kegiatan) => {
              return kegiatan && kegiatan[`dana_${month}`]
                ? kegiatan.nilai_satuan * kegiatan.quantity
                : "Tidak ada data";
            };

            const jan = getMonthlyValue("jan", itemKegiatan);
            const feb = getMonthlyValue("feb", itemKegiatan);
            const mar = getMonthlyValue("mar", itemKegiatan);
            const apr = getMonthlyValue("apr", itemKegiatan);
            const mei = getMonthlyValue("mei", itemKegiatan);
            const jun = getMonthlyValue("jun", itemKegiatan);
            const jul = getMonthlyValue("jul", itemKegiatan);
            const august = getMonthlyValue("aug", itemKegiatan);
            const sep = getMonthlyValue("sep", itemKegiatan);
            const oct = getMonthlyValue("oct", itemKegiatan);
            const nov = getMonthlyValue("nov", itemKegiatan);
            const dec = getMonthlyValue("dec", itemKegiatan);

            mergedData.push({
              id: kpi.id_program_kegiatan_kpi,
              nama: "Tidak ada nama", // Placeholder if nama not available
              target: kpi.target,
              jan: jan,
              feb: feb,
              mar: mar,
              apr: apr,
              mei: mei,
              jun: jun,
              jul: jul,
              august: august,
              sep: sep,
              oct: oct,
              nov: nov,
              dec: dec,
              key: `${kpi.id_program_kegiatan_kpi}-${kpi.target}`,
            });
          }
        });

        // Sort mergedData by ID
        mergedData.sort((a, b) => a.id - b.id);

        // Handle duplicate IDs and names
        let previousID = "";
        let previousNama = "";
        mergedData = mergedData.map((item) => {
          if (item.id === previousID) {
            item.id = "";
          } else {
            previousID = item.id;
          }
          if (item.nama === previousNama) {
            item.nama = "";
          } else {
            previousNama = item.nama;
          }
          return item;
        });

        this.data = mergedData; // Menyimpan data yang telah digabungkan
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    },
  },
  mounted() {
    this.fetchData(); // Memanggil fungsi fetchData ketika komponen dimuat
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
