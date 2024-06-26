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
            <div class="dropdown">
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
                  v-for="(option, index) in options"
                  :key="index"
                >
                  {{ option }}
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
              <div class="dropdown">
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
        <div class="box-text">
          <p class="text-area">{{ selectedOption }}</p>
          <div class="additional-text">
            <p class="total">Nilai Total : Rp</p>
            <p class="nilai">100.000.000</p>
            <div class="container-box">
              <button type="button" class="btn" @click="goToInputPage">
                <b-icon-plus></b-icon-plus>
              </button>
            </div>
          </div>
        </div>
        <div class="tabel-container1">
          <table class="tabel" v-if="!showResumeTable">
            <thead>
              <tr>
                <th style="width: 40px">id</th>
                <!-- Set lebar kolom No. -->
                <th>nama</th>
                <th>deskripsi</th>
                <th>output</th>
                <th>Nominal Anggaran</th>
                <th style="text-align: center"></th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="
                  programAnggaranByOption &&
                  programAnggaranByOption.length === 0
                "
              >
                <tr>
                  <td colspan="6" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr
                  v-for="(program, index) in programAnggaranByOption"
                  :key="index"
                >
                  <td>{{ program.id }}</td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.nama
                    }}</template>
                    <input type="text" v-model="program.nama" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.deskripsi
                    }}</template>
                    <input type="text" v-model="program.deskripsi" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.output
                    }}</template>
                    <input type="text" v-model="program.output" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.anggaran
                    }}</template>
                    <input type="text" v-model="program.anggaran" v-else />
                  </td>
                  <td style="text-align: center">
                    <!-- Tombol Edit -->
                    <button
                      type="button"
                      class="edit-btn"
                      @click="editProgram(program)"
                    >
                      <b-icon
                        :icon="
                          program.isEditing ? 'save-fill' : 'pencil-square'
                        "
                      ></b-icon>
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <table class="tabel resume-table" v-else>
            <thead>
              <tr>
                <th>No.</th>
                <th>Program-Kegiatan</th>
                <th>Pusat</th>
                <th>RAS</th>
                <th>Kepesertaan</th>
                <th>Pihak Ketiga</th>
                <th>Wakaf Salman</th>
                <th>Total Anggaran</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="
                  programResumeByOption && programResumeByOption.length === 0
                "
              >
                <tr>
                  <td colspan="8" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel saat tombol "Resume" diklik -->
                <tr
                  v-for="(program, index) in programResumeByOption"
                  :key="index"
                >
                  <td>{{ program.no }}</td>
                  <td>{{ program.program }}</td>
                  <td>{{ program.pusat }}</td>
                  <td>{{ program.ras }}</td>
                  <td>{{ program.kepesertaan }}</td>
                  <td>{{ program.pihakKetiga }}</td>
                  <td>{{ program.wakafSalman }}</td>
                  <td>{{ program.totalAnggaran }}</td>
                </tr>
              </template>
            </tbody>
          </table>
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
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      showResumeTable: false,
      programAnggaran: [], // Hapus data default, karena akan diisi dari API
      programResume: [], // Hapus data default, karena akan diisi dari API
      options: [
        "PROGRAM KEPUSTAKAAN",
        "PROGRAM INTELEKTUALITAS",
        "PROGRAM EKOLITERASI",
        "SUPPORTING SYSTEM",
      ],
      selectedOptionIndex: null,
      isPenjelasanActive: true,
      isResumeActive: false,
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.options[this.selectedOptionIndex]
        : "PROGRAM KEPUSTAKAAN";
    },
    programAnggaranByOption() {
      return this.programAnggaran[this.selectedOption];
    },
    programResumeByOption() {
      return this.programResume[this.selectedOption];
    },
  },
  mounted() {
    this.fetchProgramData();
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
    fetchProgramData() {
      axios
        .get("/api/programKegiatanRKA")
        .then((response) => {
          this.programAnggaran = response.data.programAnggaran;
          this.programResume = response.data.programResume;
        })
        .catch((error) => {
          console.error("Gagal mengambil data program:", error);
        });
    },
    editProgram(program) {
      program.isEditing = !program.isEditing;
      this.saveChanges(program);
      console.log("Editing program:", program);
    },
    saveChanges(program) {
      axios
        .put("/api/programKegiatanRKA" + program.id, program)
        .then((response) => {
          console.log("Perubahan disimpan:", response.data);
        })
        .catch((error) => {
          console.error("Gagal menyimpan perubahan:", error);
        });
    },
    goToInputPage() {
      this.$router.push({ path: "/inputrka" });
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    toggleActive(button) {
      if (button === "penjelasan") {
        this.isPenjelasanActive = true;
        this.isResumeActive = false;
        this.showResumeTable = false;
      } else {
        this.isPenjelasanActive = false;
        this.isResumeActive = true;
        this.showResumeTable = true;
      }
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style>
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
