<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / Penjelasan RKA</p>
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
                  :key="index"
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
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
            <div class="pilihan">
              <button
                type="button"
                class="btn penjelasan-btn"
                :class="{ active: isPenjelasanActive }"
                @click="toggleActive('penjelasan')"
              >
                Penjelasan
              </button>
              <button
                type="button"
                class="btn resume-btn"
                :class="{ active: isResumeActive }"
                @click="toggleActive('resume')"
              >
                Resume
              </button>
            </div>
            <div class="text-box">
              <p class="text-area">{{ selectedOption }}</p>
              <div class="additional-text">
                <p class="total">Nilai Total :</p>
                <p class="nilai">{{ formatCurrency(totalNilai) }}</p>
                <div class="container-box">
                  <button type="button" class="btn" @click="goToInputPage">
                    <b-icon-plus></b-icon-plus>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-container1" v-if="isPenjelasanActive">
          <table class="tabel">
            <thead>
              <tr>
                <th style="width: 40px; font-weight: bold">No.</th>
                <th style="width: 160px; font-weight: bold">
                  Program-Kegiatan
                </th>
                <th style="width: 250px; font-weight: bold">
                  Deskripsi Singkat
                </th>
                <th style="width: 250px; font-weight: bold">Output/Keluaran</th>
                <th style="width: 275px; font-weight: bold">
                  Nominal Anggaran
                </th>
                <th style="width: 50px; text-align: center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredData" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.deskripsi }}</td>
                <td>{{ item.output }}</td>
                <td>{{ formatCurrency(item.total_anggaran) }}</td>
                <td style="text-align: center">
                  <button
                    type="button"
                    class="edit-btn"
                    @click="editProgram(item)"
                  >
                    <b-icon
                      :icon="item.isEditing ? 'save-fill' : 'pencil-square'"
                    ></b-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-container1" v-if="isResumeActive">
          <table class="tabel">
            <thead>
              <tr>
                <th style="font-weight: bold; width: 40px">No.</th>
                <th style="font-weight: bold; width: calc((100%) / 7)">
                  Program-Kegiatan
                </th>
                <th style="font-weight: bold; width: calc((100%) / 7)">
                  Pusat
                </th>
                <th style="font-weight: bold; width: calc((100%) / 7)">RAS</th>
                <th style="font-weight: bold; width: calc((100%) / 7)">
                  Kepesertaan
                </th>
                <th style="font-weight: bold; width: calc((100%) / 7)">
                  Pihak Ketiga
                </th>
                <th style="font-weight: bold; width: calc((100%) / 7)">
                  Wakaf Salman
                </th>
                <th style="font-weight: bold; width: calc((100%) / 7)">
                  Total Anggaran
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredData" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ formatCurrency(item.dana_pusat) }}</td>
                <td>{{ formatCurrency(item.ras) }}</td>
                <td>{{ formatCurrency(item.kepesertaan) }}</td>
                <td>{{ formatCurrency(item.pihak_ketiga) }}</td>
                <td>{{ formatCurrency(item.wakaf_salman) }}</td>
                <td>{{ formatCurrency(item.total_anggaran) }}</td>
              </tr>
            </tbody>
          </table>
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
      data: [], // Initialize as empty array
      programOptions: [],
      rencanaAnggaranData: [], // Initialize as empty array
      selectedOptionIndex: null,
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      isPenjelasanActive: true,
      isResumeActive: false,
    };
  },
  computed: {
    filteredData() {
      let filtered = this.data;

      if (this.selectedOptionIndex !== null) {
        const selectedProgramId =
          this.programOptions[this.selectedOptionIndex].id;
        filtered = filtered.filter(
          (item) => item.id_program === selectedProgramId
        );
      }

      if (this.selectedYear !== null) {
        filtered = filtered.filter((item) => item.tahun === this.selectedYear);
      }

      // Log to check the mapping
      console.log("Filtered Data before mapping:", filtered);
      console.log(
        "Rencana Anggaran Data for mapping:",
        this.rencanaAnggaranData
      );

      // Map rencana anggaran data to filtered data
      filtered = filtered.map((item) => {
        const rencanaItem = this.rencanaAnggaranData.find(
          (ra) => ra.id === item.id
        );
        return {
          ...item,
          dana_pusat: rencanaItem ? rencanaItem.Dana_Pusat : "N/A",
          ras: rencanaItem ? rencanaItem.Dana_RAS : "N/A",
          kepesertaan: rencanaItem ? rencanaItem.Dana_Kepesertaan : "N/A",
          pihak_ketiga: rencanaItem ? rencanaItem.Dana_Pihak_Ketiga : "N/A",
          wakaf_salman: rencanaItem ? rencanaItem.Dana_Wakaf_Salman : "N/A",
          total_anggaran: rencanaItem ? rencanaItem.Total_Dana : "N/A",
        };
      });

      // Log to check the mapped data
      console.log("Filtered Data after mapping:", filtered);

      // Sort data by ID
      return filtered.sort((a, b) => a.id - b.id);
    },
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
    totalNilai() {
      // Calculate the total value of total_anggaran
      return this.filteredData.reduce((sum, item) => {
        // Ensure the value is a number and not 'N/A'
        const totalAnggaran = parseFloat(item.total_anggaran);
        return sum + (isNaN(totalAnggaran) ? 0 : totalAnggaran);
      }, 0);
    },
  },
  mounted() {
    this.fetchData();
    this.fetchProgramOptions();
    this.fetchRencanaAnggaranData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/api/programKegiatanRKA");
        console.log("Response from API:", response.data); // Log the response from API for inspection
        this.data = response.data.data; // Extract actual data from API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data; // Assuming response.data is an array of program options
      } catch (error) {
        console.error("Error fetching program options:", error);
      }
    },
    async fetchRencanaAnggaranData() {
      try {
        const response = await axios.get("/api/custom/rencanaAnggaran");
        console.log("Rencana Anggaran Data:", response.data); // Log the response data
        this.rencanaAnggaranData = response.data; // Store the rencana anggaran data
      } catch (error) {
        console.error("Error fetching rencana anggaran data:", error);
      }
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
    goToInputPage() {
      this.$router.push({ path: "/inputrka" });
    },
    toggleActive(button) {
      if (button === "penjelasan") {
        this.isPenjelasanActive = true;
        this.isResumeActive = false;
      } else {
        this.isPenjelasanActive = false;
        this.isResumeActive = true;
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    editProgram(item) {
      item.isEditing = !item.isEditing;
      this.saveChanges(item);
      console.log("Editing program:", item);
    },
  },
};
</script>

<style>
.dropdown {
  width: auto; /* Atur lebar dropdown agar menyesuaikan dengan panjang teks */
  min-width: 270px; /* Lebar minimum dropdown */
}

.dropdown1 .dropdown-menu {
  width: 100%; /* Menyesuaikan lebar menu dropdown dengan lebar dropdown */
  max-height: 300px; /* Atur tinggi maksimum dropdown jika terdapat banyak opsi */
  overflow-y: auto; /* Aktifkan scroll jika terdapat banyak opsi */
  font-size: 12px;
}

.dropdown .dropdown-menu .dropdown-item {
  white-space: normal; /* Biarkan teks panjang memanjang */
  font-size: 12px;
}

.text-box {
  height: 40px;
  width: 1300px;
  background-color: #d9d9d9;
  margin-top: 21px; /* Jarak antara kotak dan teks */
  margin-right: 15px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between; /* Menempatkan elemen ke ujung kiri dan kanan */
}

.resume-table th,
.resume-table td {
  width: auto;
}

.resume-table th:nth-child(1),
.resume-table td:nth-child(1) {
  width: 40px; /* Misalnya lebar kolom No. adalah 50px */
}

.total {
  color: black;
  font-weight: bold;
  margin-top: 8px;
}

.additional-text {
  display: flex;
  margin-right: 6px;
}

.tabel-container1 {
  padding-top: 22px;
  padding-left: 18px;
  padding-bottom: 30px;
}

.nilai {
  color: black;
  font-weight: bold;
  margin-top: 8px;
  margin-right: 13px; /* Adjust margin-right as needed */
}

.container-box .btn {
  display: flex;
  border-radius: 4px;
  margin-top: 5px;
}

.container-box .btn {
  background-color: #967c55;
  justify-content: center; /* Menengahkan secara horizontal */
  align-items: center; /* Menengahkan secara vertikal */
  color: white;
  height: 31px;
  width: 31px;
}

.tabel {
  margin-bottom: 10px;
}

.tabel th {
  background-color: #f2f2f2;
}

.container-box .btn:hover {
  color: white;
}

.edit-btn {
  height: 31px;
  width: 31px;
  background-color: #967c55;
  color: white;
  border-radius: 4px;
  border: none;
}

.text-area {
  color: black; /* Warna teks di dalam kotak */
  font-weight: bold; /* Ketebalan teks di dalam kotak */
  text-align: start;
  margin-top: 8px;
  margin-left: 13px;
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

.dropdown1 {
  margin-top: 14px;
  margin-bottom: 38px;
}

.dropdown1 .m-md-2 {
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
  margin-left: 15px;
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

.print .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  width: 30px;
  color: white;
}

.pilihan {
  margin-left: 15px;
}

.pilihan .btn {
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  width: 558px;
  color: white;
  border-radius: 0%;
}

.pilihan .btn.active {
  background-color: #967c55;
  color: white;
}

.pilihan .btn:not(active) {
  background-color: #d9d9d9;
  color: black;
}
</style>
