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
                  @change="filterCustomData"
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
                class="btn bulan-btn"
                :class="{ active: isBulanActive }"
                @click="toggleActive('bulan')"
              >
                Bulan
              </button>
              <button
                type="button"
                class="btn anggaran-btn"
                :class="{ active: isAnggaranActive }"
                @click="toggleActive('anggaran')"
              >
                Anggaran
              </button>
            </div>
            <div v-if="isBulanActive">
              <div v-for="(data, index) in filteredCustomData" :key="index">
                <div class="box-text" style="margin-bottom: 10px">
                  <p class="text-area">
                    {{ data.nama ? data.nama : "No data available" }}
                  </p>
                  <div class="additional-text">
                    <p class="total">Nilai Total :</p>
                    <p class="nilai">{{ calculateTotal([data]) }}</p>
                    <div class="container-box">
                      <button type="button" class="btn" @click="goToInputPage">
                        <b-icon-plus></b-icon-plus>
                      </button>
                    </div>
                  </div>
                </div>
                <template v-if="showKegiatanNama(data.id)">
                  <div
                    v-for="(kegiatan, kegiatanIndex) in kegiatanNama[data.id]"
                    :key="kegiatanIndex"
                  >
                    <p class="text-kebutuhan">
                      {{
                        kegiatan.nama
                          ? kegiatan.nama
                          : "Pengumpulan & Review Naskah"
                      }}
                      <b-icon
                        icon="plus-square"
                        style="color: #967c55"
                        @click="goToInputBulan"
                      ></b-icon>
                    </p>
                    <div class="table-container1">
                      <table class="tabel">
                        <thead>
                          <tr>
                            <th style="width: 40px; font-weight: bold">ID</th>
                            <th style="width: 154px; font-weight: bold">
                              Uraian
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Jan
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Feb
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Mar
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Apr
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Mei
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Jun
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Jul
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Agust
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Sep
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Okt
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Nov
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Des
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Total
                            </th>
                            <th style="width: 50px; text-align: center"></th>
                            <!-- Tambahkan kolom lain sesuai dengan data yang ada -->
                          </tr>
                        </thead>
                        <tbody
                          v-if="getTableDataByJudul(kegiatan.id).length > 0"
                        >
                          <tr
                            v-for="item in getTableDataByJudul(kegiatan.id)"
                            :key="item.id"
                          >
                            <td>{{ item.id }}</td>
                            <td>{{ item.uraian }}</td>
                            <td>{{ item.dana_jan }}</td>
                            <td>{{ item.dana_feb }}</td>
                            <td>{{ item.dana_mar }}</td>
                            <td>{{ item.dana_apr }}</td>
                            <td>{{ item.dana_mei }}</td>
                            <td>{{ item.dana_jun }}</td>
                            <td>{{ item.dana_jul }}</td>
                            <td>{{ item.dana_aug }}</td>
                            <td>{{ item.dana_sep }}</td>
                            <td>{{ item.dana_oct }}</td>
                            <td>{{ item.dana_nov }}</td>
                            <td>{{ item.dana_dec }}</td>
                            <td>{{ item.total }}</td>
                            <td style="text-align: center">
                              <button
                                type="button"
                                class="edit-btn"
                                @click="editProgram(item)"
                              >
                                <b-icon
                                  :icon="
                                    item.isEditing
                                      ? 'save-fill'
                                      : 'pencil-square'
                                  "
                                ></b-icon>
                              </button>
                            </td>
                            <!-- Tambahkan data lain sesuai dengan kolom tabel -->
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="16" style="text-align: center">
                              Tidak ada data
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div v-else>
              <!-- Content for anggaran -->
              <div v-for="(data, index) in filteredCustomData" :key="index">
                <div class="box-text">
                  <p class="text-area">
                    {{ data.nama ? data.nama : "No data available" }}
                  </p>
                  <div class="additional-text">
                    <p class="total">Nilai Total :</p>
                    <p class="nilai">{{ calculateTotal([data]) }}</p>
                    <div class="container-box">
                      <button type="button" class="btn" @click="goToInputPage">
                        <b-icon-plus></b-icon-plus>
                      </button>
                    </div>
                  </div>
                </div>
                <template v-if="showKegiatanNama(data.id)">
                  <div
                    v-for="(kegiatan, kegiatanIndex) in kegiatanNama[data.id]"
                    :key="kegiatanIndex"
                  >
                    <p class="text-kebutuhan">
                      {{
                        kegiatan.nama
                          ? kegiatan.nama
                          : "Pengumpulan & Review Naskah"
                      }}
                      <b-icon
                        icon="plus-square"
                        style="color: #967c55"
                      ></b-icon>
                    </p>
                    <div class="table-container1">
                      <table class="tabel">
                        <thead>
                          <tr>
                            <th style="font-weight: bold; width: 40px">ID</th>
                            <th style="font-weight: bold; width: 225px">
                              Uraian
                            </th>
                            <th style="font-weight: bold; width: 145px">
                              Nilai Satuan
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Qty
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Unt
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Frq
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Unt
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Vol
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Nilai Total
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Sumber Dana
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Keterangan
                            </th>
                            <th style="width: 50px"></th>
                            <!-- Tambahkan kolom lain sesuai dengan data yang ada -->
                          </tr>
                        </thead>
                        <tbody
                          v-if="getTableDataByJudul(kegiatan.id).length > 0"
                        >
                          <tr
                            v-for="item in getTableDataByJudul(kegiatan.id)"
                            :key="item.id"
                          >
                            <td>{{ item.id }}</td>
                            <td>{{ item.uraian }}</td>
                            <td>{{ formatCurrency(item.nilai_satuan) }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.quantity_unit }}</td>
                            <td>{{ item.frequency }}</td>
                            <td>{{ item.frequency_unit }}</td>
                            <td>{{ item.vol }}</td>
                            <td>{{ formatCurrency(item.nilai_total) }}</td>
                            <td>{{ item.sumber_dana }}</td>
                            <td></td>
                            <td style="text-align: center">
                              <button
                                type="button"
                                class="edit-btn"
                                @click="editProgram(item)"
                              >
                                <b-icon
                                  :icon="
                                    item.isEditing
                                      ? 'save-fill'
                                      : 'pencil-square'
                                  "
                                ></b-icon>
                              </button>
                            </td>
                            <!-- Tambahkan data lain sesuai dengan kolom tabel -->
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="12" style="text-align: center">
                              Tidak ada data
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </template>
              </div>
            </div>
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
      customData: [],
      isBulanActive: true,
      isAnggaranActive: false,
      filteredCustomData: [], // New property for filtered data
      tableData: [], // Initialize as an empty array to store multiple items
      kegiatanNama: {}, // Initialize as an empty object to store nama from /api/judulKegiatanRKA by id_program_kegiatan_rka
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
    programBulanByOption() {
      return this.programBulan[this.selectedOption];
    },
    programAnggaranByOption() {
      return this.programAnggaran[this.selectedOption];
    },
  },
  mounted() {
    this.fetchProgramOptions();
    this.fetchCustomData();
    this.fetchTableData();
    this.fetchKegiatanNama();
  },

  methods: {
    toggleActive(button) {
      if (button === "bulan") {
        this.isBulanActive = true;
        this.isAnggaranActive = false;
      } else {
        this.isBulanActive = false;
        this.isAnggaranActive = true;
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
    async fetchCustomData() {
      try {
        const response = await axios.get("/api/custom/tahunanRKA");
        console.log("Custom Data Response:", response.data); // Log the response data for debugging
        this.customData = response.data; // Store the entire array
        this.filterCustomData(); // Filter the custom data based on the selected program and year
      } catch (error) {
        console.error("Error fetching custom data:", error);
      }
    },
    async fetchTableData() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA");
        console.log("Table Data: ", response.data); // Debugging log
        // Process the table data to include calculated values for dana columns and the total
        this.tableData = response.data.data.map((item) => {
          const total = [
            item.dana_jan,
            item.dana_feb,
            item.dana_mar,
            item.dana_apr,
            item.dana_mei,
            item.dana_jun,
            item.dana_jul,
            item.dana_aug,
            item.dana_sep,
            item.dana_oct,
            item.dana_nov,
            item.dana_dec,
          ].reduce(
            (sum, dana) => sum + (dana ? item.nilai_satuan * item.quantity : 0),
            0
          );

          // Calculate Vol as Qty * Frq
          const vol = item.quantity * item.frequency;
          const nilai_total = item.nilai_satuan * vol;

          return {
            ...item,
            dana_jan: item.dana_jan ? item.nilai_satuan * item.quantity : 0,
            dana_feb: item.dana_feb ? item.nilai_satuan * item.quantity : 0,
            dana_mar: item.dana_mar ? item.nilai_satuan * item.quantity : 0,
            dana_apr: item.dana_apr ? item.nilai_satuan * item.quantity : 0,
            dana_mei: item.dana_mei ? item.nilai_satuan * item.quantity : 0,
            dana_jun: item.dana_jun ? item.nilai_satuan * item.quantity : 0,
            dana_jul: item.dana_jul ? item.nilai_satuan * item.quantity : 0,
            dana_aug: item.dana_aug ? item.nilai_satuan * item.quantity : 0,
            dana_sep: item.dana_sep ? item.nilai_satuan * item.quantity : 0,
            dana_oct: item.dana_oct ? item.nilai_satuan * item.quantity : 0,
            dana_nov: item.dana_nov ? item.nilai_satuan * item.quantity : 0,
            dana_dec: item.dana_dec ? item.nilai_satuan * item.quantity : 0,
            total,
            vol, // Add the calculated vol value
            nilai_total,
          };
        });
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    },
    async fetchKegiatanNama() {
      try {
        const response = await axios.get("/api/judulKegiatanRKA");
        console.log("Kegiatan Nama Response:", response.data); // Log the response data for debugging
        // Process response.data to map id_program_kegiatan_rka to their respective 'nama' values
        this.kegiatanNama = {};
        response.data.data.forEach((item) => {
          if (!this.kegiatanNama[item.id_program_kegiatan_rka]) {
            this.kegiatanNama[item.id_program_kegiatan_rka] = [];
          }
          this.kegiatanNama[item.id_program_kegiatan_rka].push({
            id: item.id,
            nama: item.nama,
          });
        });

        // Move the item with id 1 to the top of each array in kegiatanNama
        Object.keys(this.kegiatanNama).forEach((key) => {
          const items = this.kegiatanNama[key];
          const index = items.findIndex((item) => item.id === 1);
          if (index > -1) {
            const [item] = items.splice(index, 1);
            items.unshift(item);
          }
        });
      } catch (error) {
        console.error("Error fetching kegiatan nama:", error);
      }
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
      this.selectedProgramId = this.programOptions[index].id; // Set the selected program ID
      this.filterCustomData(); // Filter custom data based on selected program and year
    },
    calculateTotal(filteredData) {
      const totalSum = filteredData.reduce((sum, item) => {
        const tableData = this.getTableDataByJudul(item.id);
        const totalSum = tableData.reduce(
          (total, data) => total + data.total,
          0
        );
        return sum + totalSum;
      }, 0);

      return this.formatCurrency(totalSum); // Menggunakan formatCurrency untuk mengubah ke format mata uang
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    filterCustomData() {
      if (this.selectedProgramId && this.selectedYear) {
        this.filteredCustomData = this.customData.filter(
          (item) =>
            item.id_program === this.selectedProgramId &&
            item.tahun === this.selectedYear
        );
      } else if (this.selectedProgramId) {
        this.filteredCustomData = this.customData.filter(
          (item) => item.id_program === this.selectedProgramId
        );
      } else if (this.selectedYear) {
        this.filteredCustomData = this.customData.filter(
          (item) => item.tahun === this.selectedYear
        );
      } else {
        this.filteredCustomData = this.customData;
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
    showKegiatanNama(id) {
      // Function to check if kegiatanNama has data for the given id
      return (
        Array.isArray(this.kegiatanNama[id]) && this.kegiatanNama[id].length > 0
      );
    },
    getTableDataByJudul(id_judul_kegiatan) {
      // Function to get the table data for a given id_judul_kegiatan
      return this.tableData.filter(
        (item) => item.id_judul_kegiatan === id_judul_kegiatan
      );
    },
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputanggaran" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    goToInputBulan() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputbulan" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
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

.box-text {
  height: 40px;
  width: 1116px;
  background-color: #d9d9d9;
  margin-top: 21px; /* Jarak antara kotak dan teks */
  margin-right: 30px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between; /* Menempatkan elemen ke ujung kiri dan kanan */
}

.table-container1 {
  margin-left: 18px;
  margin-top: 8px;
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

.text-kebutuhan {
  text-align: left;
  margin-left: 15px;
  margin-top: 24px;
  margin-bottom: 0%;
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
