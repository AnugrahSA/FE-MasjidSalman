<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div
        class="card mb-3"
        style="
          max-width: 1149px;
          max-height: fit-content;
          /* background-color: red; */
        "
      >
        <div class="kepala">
          <p>Tahunan / KPI</p>
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
            <div class="box-text">
              <p class="text-area">{{ selectedOption }}</p>
              <div class="additional-text">
                <div class="container-box">
                  <button type="button" class="btn" @click="goToInputPage">
                    <b-icon-plus></b-icon-plus>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-container1">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 45px">No</th>
                    <th style="width: 185px">Nama Program - Kegiatan</th>
                    <th style="width: 396px">KPI</th>
                    <th style="width: 504px">Target</th>
                    <th style="text-align: center"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="programKpiByOption.length === 0">
                    <tr>
                      <td colspan="5" class="text-center">Data masih kosong</td>
                    </tr>
                  </template>
                  <template v-else>
                    <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                    <tr
                      v-for="(program, index) in programKpiByOption"
                      :key="index"
                    >
                      <td>{{ program.no }}</td>
                      <td>
                        <template v-if="!program.isEditing">{{
                          program.namaprogram
                        }}</template>
                        <input
                          type="text"
                          v-model="program.namaprogram"
                          v-else
                        />
                      </td>
                      <!-- Kolom KPI -->
                      <td>
                        <template v-if="!program.isEditing">
                          <div
                            v-for="(kpi, kpiIndex) in program.kpi"
                            :key="kpiIndex"
                          >
                            {{ kpi }}
                          </div>
                        </template>
                        <template v-else>
                          <div
                            v-for="(kpi, kpiIndex) in program.kpi"
                            :key="kpiIndex"
                          >
                            <input
                              type="text"
                              v-model="program.kpi[kpiIndex]"
                            />
                          </div>
                        </template>
                      </td>
                      <!-- Kolom Target -->
                      <td>
                        <template v-if="!program.isEditing">
                          <div
                            v-for="(target, targetIndex) in program.target"
                            :key="targetIndex"
                          >
                            {{ target }}
                          </div>
                        </template>
                        <template v-else>
                          <div
                            v-for="(target, targetIndex) in program.target"
                            :key="targetIndex"
                          >
                            <input
                              type="text"
                              v-model="program.target[targetIndex]"
                            />
                          </div>
                        </template>
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

export default {
  data() {
    return {
      programKpi: {
        "PROGRAM KEPUSTAKAAN": [
          {
            no: 1,
            namaprogram: "Produksi Buku",
            kpi: ["jumlah buku baru ber-isbn 1", "jumlah buku baru ber-isbn 2"],
            target: [
              "minimal 4 judul dalam satu tahun 1",
              "minimal 4 judul dalam satu tahun 2",
            ],
            isEditing: false,
          },
        ],
        "PROGRAM INTELEKTUALITAS": [],
        "PROGRAM EKOLITERASI": [],
        "SUPPORTING SYSTEM": [],
      },
      selectedYear: new Date().getFullYear(), // Mengatur tahun saat ini sebagai nilai awal
      years: this.generateYears(), // Menghasilkan daftar tahun
      options: [
        "PROGRAM KEPUSTAKAAN",
        "PROGRAM INTELEKTUALITAS",
        "PROGRAM EKOLITERASI",
        "SUPPORTING SYSTEM",
      ],
      selectedOptionIndex: null,
    };
  },
  computed: {
    programKpiByOption() {
      return this.programKpi[this.selectedOption];
    },
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.options[this.selectedOptionIndex]
        : "PROGRAM KEPUSTAKAAN";
    },
  },
  methods: {
    editProgram(program) {
      // Toggle isEditing saat tombol edit diklik
      program.isEditing = !program.isEditing;
      // Simpan perubahan ke database
      // this.saveChanges(program);
      // Lakukan sesuatu dengan program yang diedit
      console.log("Editing program:", program);
    },
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/input" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
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
  },
  components: {
    Sidebar,
  },
};
</script>

<style>
.table input[type="text"] {
  border: none;
  width: 100%;
  background-color: transparent;
  text-align: center;
  font-size: 15px;
}

/* Hilangkan border dan background-color input saat dalam mode edit */
.table input[type="text"]:focus {
  outline: none;
}

/* Sembunyikan tombol save-fill saat dalam mode edit */
.edit-btn .b-icon[icon="save-fill"] {
  display: none;
}

.table-container1 {
  padding-top: 22px;
  padding-left: 18px;
  padding-bottom: 30px;
  padding-right: 25px;
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
</style>
