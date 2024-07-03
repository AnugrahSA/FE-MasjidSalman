<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / RKA</p>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="teks">Program</div>
            <div class="dropdown1">
              <b-dropdown
                id="dropdown-1"
                class="m-md-2"
                variant="outline"
                :text="selectedOption"
                v-model="selectedOptionIndex"
                dropup
              >
                <b-dropdown-item
                  @click="selectOption(index)"
                  v-for="(option, index) in programOptions"
                  :key="'program' + index"
                >
                  {{ option.nama }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="tombol">
              <div class="print">
                <button type="button" class="btn">
                  <b-icon-printer-fill
                    style="width: 20px; height: 20px"
                  ></b-icon-printer-fill>
                </button>
              </div>
            </div>
            <div class="tahun">Tahun</div>
            <div class="tahun1">
              <div class="dropdown1">
                <select
                  v-model="selectedYear"
                  class="m-md-2"
                  style="width: 90px; height: 38px"
                >
                  <option
                    v-for="year in years"
                    :key="'year' + year"
                    :value="year"
                  >
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="description-container">
            <div class="description-box1">
              <p class="description-text1">Deskripsi Pelaksanaan Kegiatan</p>
            </div>
            <div class="tombol-plus">
              <div class="print" style="margin-top: 12px">
                <button type="button" class="btn" style="font-size: 25px">
                  <b-icon-plus></b-icon-plus>
                </button>
              </div>
            </div>
          </div>
          <div
            class="text-left"
            v-for="(activity, index) in activityNames"
            :key="'activity1-' + index"
          >
            <p>{{ activity.nama }}</p>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Waktu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ activity.nama }}</td>
                  <td>{{ activity.waktu }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="description-container">
            <div class="description-box1">
              <p class="description-text1">Evaluasi Kegiatan</p>
            </div>
            <div class="tombol-plus">
              <div class="print" style="margin-top: 12px">
                <button type="button" class="btn" style="font-size: 25px">
                  <b-icon-plus></b-icon-plus>
                </button>
              </div>
            </div>
          </div>
          <div class="evaluation-box">
            <p class="evaluation-text">
              {{ selectedOption }}
            </p>
          </div>
          <div
            class="text-left"
            v-for="(activity, index) in activityNames"
            :key="'activity2-' + index"
          >
            <p>{{ activity.nama }}</p>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Indikator</th>
                  <th scope="col">Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ activity.indikator }}</td>
                  <td>{{ activity.waktu }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      programOptions: [],
      selectedOptionIndex: null,
      selectedProgramId: null,
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      activityNames: [], // Untuk menyimpan data kegiatan yang diambil dari API
      keyPerformanceIndicators: [], // Untuk menyimpan data indikator dan target dari API KPI
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
  },
  mounted() {
    this.fetchProgramOptions();
    this.fetchActivityNames(); // Mengambil data kegiatan saat komponen dimuat
    this.fetchKeyPerformanceIndicators(); // Mengambil data KPI saat komponen dimuat
  },
  methods: {
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data; // Mengisi programOptions dengan hasil dari API program
      } catch (error) {
        console.error("Error fetching program options:", error);
      }
    },
    async fetchActivityNames() {
      try {
        const response = await axios.get("/api/custom/RKAKPI");
        this.activityNames = response.data; // Mengisi activityNames dengan hasil dari API RKAKPI
      } catch (error) {
        console.error("Error fetching activity names:", error);
        this.activityNames = [{ nama: "Error fetching data" }];
      }
    },
    async fetchKeyPerformanceIndicators() {
      try {
        const response = await axios.get("/api/keyPerformanceIndicator");
        this.keyPerformanceIndicators = response.data; // Mengisi keyPerformanceIndicators dengan hasil dari API KPI
      } catch (error) {
        console.error("Error fetching key performance indicators:", error);
      }
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
  },
};
</script>

<style>
.description-box {
  height: 35px;
  width: 265px;
  background-color: #967c55;
  margin-bottom: 24px; /* Jarak antara kotak dan teks */
  display: flex;
  align-items: center; /* Untuk memusatkan vertikal teks di dalam kotak */
  justify-content: center; /* Untuk memusatkan horizontal teks di dalam kotak */
}

.description-text {
  color: white; /* Warna teks di dalam kotak */
  font-weight: bold; /* Ketebalan teks di dalam kotak */
  margin-top: 10px;
  text-align: center; /* Untuk memusatkan teks di dalam kotak */
}

.description-container {
  display: flex;

  align-items: center; /* Untuk memusatkan vertikal elemen di dalam kontainer */
}

.description-box1 {
  height: 35px;
  width: 265px;
  background-color: #967c55;
  margin-top: 24px;
  margin-bottom: 14px; /* Jarak antara kotak dan teks */

  display: flex;
}

.description-text1 {
  color: white; /* Warna teks di dalam kotak */
  font-weight: bold; /* Ketebalan teks di dalam kotak */
  margin-top: 6px;
  margin-left: 5px;
  text-align: start;
}

.text-left {
  text-align: left;

  font-size: 14px;
  font-weight: bold;
}

.table-container {
  padding-left: 24px;
  padding-right: 17px;
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

.Row1 {
  background-color: #d9d9d9;
  margin-left: 24px;
  margin-bottom: 16px;
}

.Row1 .text-dana {
  font-size: 14px;
  margin-left: 12px;
  margin-top: 14px;
}

.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card-container .card {
  background-color: white;
}

.kepala {
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

.teks {
  margin-left: 19px;
  margin-top: 30px;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.dropdown {
  margin-top: 14px;
  margin-bottom: 38px;
}

.dropdown .m-md-2 {
  border: 1px solid black;
  background-color: white;
}

.tombol {
  display: flex;
  margin-top: 27px;
  margin-left: 5px;
}

.tahun {
  margin-top: 30px;
  font-weight: bold;
}

.bulan {
  margin-top: 30px;
  font-weight: bold;
}

.tombol .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  width: 75px;
  color: white;
}

.tombol .btn:hover {
  color: white;
}

.print {
  margin-left: 8px;
}

.print .btn {
  background-color: #967c55;
  height: 30px;
  width: 30px;
  align-content: center;
  color: white;
  display: flex; /* Menggunakan flexbox */
  justify-content: center; /* Untuk membuat konten berada di tengah */
  align-items: center; /* Untuk memusatkan vertikal jika diperlukan */
}

.evaluation-box {
  height: 40px;
  width: 1108px;
  background-color: #d9d9d9;
  margin-top: 24px; /* Jarak antara kotak dan teks */

  margin-bottom: 16px;
  display: flex;
}

.evaluation-text {
  color: black; /* Warna teks di dalam kotak */
  font-weight: bold; /* Ketebalan teks di dalam kotak */
  text-align: start;
  margin-top: 8px;
  margin-left: 15px;
}
</style>
