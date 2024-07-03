<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / KPI</p>
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
                  @change="fetchRKAKPI"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>

            <div class="box-text-kpi">
              <p class="text-area">{{ selectedOption }}</p>
              <div class="additional-text">
                <div class="container-box">
                  <button type="button" class="btn" @click="goToInputPage">
                    <b-icon-plus></b-icon-plus>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-kpi">
              <table class="table table-fixed-width">
                <thead>
                  <tr>
                    <th style="width: 45px">No</th>
                    <th style="width: 185px">Nama Program - Kegiatan</th>
                    <th style="width: 396px">Indikator</th>
                    <th style="width: 504px">Target</th>
                    <th style="text-align: center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in processedDataRKAKPI"
                    :key="generateUniqueKey(item, index)"
                  >
                    <td>{{ item.displayNumber ? item.overallCounter : "" }}</td>
                    <td>{{ item.nama }}</td>
                    <td>{{ item.indikator }}</td>
                    <td>{{ item.target }}</td>
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
            <!-- Akhir dari elemen tabel -->
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
      dataRKAKPI: [],
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
    processedDataRKAKPI() {
      let previousProgramName = null;
      let indicatorCounter = 1;
      let overallCounter = 1;
      return this.dataRKAKPI.map((item, index) => {
        let displayNumber = false;
        if (index === 0 || item.nama !== previousProgramName) {
          previousProgramName = item.nama;
          displayNumber = true;
          indicatorCounter = overallCounter; // Set indicatorCounter to the overall counter
          overallCounter++; // Increment the overall counter for each unique program name
        } else {
          item = { ...item, nama: "" };
        }
        const processedItem = {
          ...item,
          indicatorCounter,
          displayNumber,
          overallCounter: displayNumber ? indicatorCounter : overallCounter - 1,
        };
        if (displayNumber) indicatorCounter++;
        return processedItem;
      });
    },
  },
  mounted() {
    this.fetchProgramOptions().then(() => {
      if (this.programOptions.length > 0) {
        this.selectedOptionIndex = 0;
        this.selectedProgramId = this.programOptions[0].id;
        this.fetchRKAKPI();
      }
    });
  },
  watch: {
    selectedOptionIndex(newIndex) {
      if (newIndex !== null) {
        this.selectedProgramId = this.programOptions[newIndex].id;
        this.fetchRKAKPI();
      }
    },
  },
  methods: {
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data;
      } catch (error) {
        console.error("Error fetching program options:", error);
      }
    },
    async fetchRKAKPI() {
      try {
        const rkakpiResponse = await axios.get("/api/custom/RKAKPI", {
          params: {
            id_program: this.selectedProgramId,
            year: this.selectedYear,
          },
        });
        const kpiResponse = await axios.get("/api/keyPerformanceIndicator", {
          params: {
            year: this.selectedYear,
          },
        });

        const rkakpiData = rkakpiResponse.data;
        const kpiData = kpiResponse.data.data;

        this.dataRKAKPI = rkakpiData.flatMap((rkakpiItem) => {
          const matchingKPIItems = kpiData.filter(
            (kpi) => kpi.id_program_kegiatan_kpi === rkakpiItem.id
          );
          return matchingKPIItems.length > 0
            ? matchingKPIItems.map((kpiItem) => ({
                ...rkakpiItem,
                indikator: kpiItem.indikator,
                target: kpiItem.target,
              }))
            : [
                {
                  ...rkakpiItem,
                  indikator: "N/A",
                  target: "N/A",
                },
              ];
        });
      } catch (error) {
        console.error("Error fetching RKAKPI or KPI data:", error);
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
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/input" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    generateUniqueKey(item, index) {
      return `${item.id}_${index}`;
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

.box-text-kpi {
  height: 40px;
  width: 1120px;
  background-color: #d9d9d9;
  margin-top: 21px; /* Jarak antara kotak dan teks */
  margin-right: 30px;
  margin-left: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between; /* Menempatkan elemen ke ujung kiri dan kanan */
}

.table-kpi {
  width: 1095px; /* Set the width of the table container */
  margin-left: 15px;
}

.table-fixed-width {
  width: 100%; /* Ensure the table takes up the full width of the container */
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
