<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Laporan / Laporan Program</p>
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
                  <b-icon-printer-fill></b-icon-printer-fill>
                </button>
              </div>
            </div>
            <div class="bulan">Bulan</div>
            <div class="dropdown">
              <select
                v-model="selectedMonth"
                class="m-md-2"
                style="width: 90px; height: 38px"
              >
                <option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="index + 1"
                >
                  {{ month }}
                </option>
              </select>
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
        <div class="text-left">
          <p>Pengelolaan Salman Reading Corner</p>
        </div>
        <!-- Tambahkan elemen tabel di bawah -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Nama dan Penjelasan Singkat</th>
                <th>Waktu</th>
                <th>Tempat</th>
                <th>Penyaluran</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programData.length === 0">
                <tr>
                  <td colspan="4" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programData" :key="index">
                  <td>{{ program.nama }}</td>
                  <td>{{ program.waktu }}</td>
                  <td>{{ program.tempat }}</td>
                  <td>{{ program.penyaluran }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- Akhir dari elemen tabel -->
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
        <!-- Tambahkan kotak di sini -->
        <div class="evaluation-box">
          <p class="evaluation-text">
            {{ options[selectedOptionIndex] }}
          </p>
        </div>
        <!-- Akhir dari kotak -->
        <!-- Tambahkan elemen tabel di bawah -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Indikator</th>
                <th>Target Indikator</th>
                <th>Deskripsi</th>
                <th>Capaian</th>
                <th>Indikator</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programEvaluasi.length === 0">
                <tr>
                  <td colspan="5" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programEvaluasi" :key="index">
                  <td>{{ program.indikator }}</td>
                  <td>{{ program.targetindikator }}</td>
                  <td>{{ program.deskripsi }}</td>
                  <td>{{ program.capaian }}</td>
                  <td>{{ program.indikator1 }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- Akhir dari elemen tabel -->
        <div class="description-container">
          <div class="description-box1">
            <p class="description-text1">Penerima Manfaat</p>
          </div>
          <div class="tombol-plus">
            <div class="print" style="margin-top: 12px">
              <button type="button" class="btn" style="font-size: 25px">
                <b-icon-plus></b-icon-plus>
              </button>
            </div>
          </div>
        </div>
        <!-- Tambahkan kotak di sini -->
        <div class="evaluation-box">
          <p class="evaluation-text">
            {{ options[selectedOptionIndex] }}
          </p>
        </div>
        <!-- Akhir dari kotak -->
        <!-- Tambahkan elemen tabel di bawah -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kategori</th>
                <th>Rutinitas</th>
                <th>Penyaluran</th>
                <th>Rencana</th>
                <th>Realisasi</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programPenerima.length === 0">
                <tr>
                  <td colspan="6" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programPenerima" :key="index">
                  <td>{{ program.no }}</td>
                  <td>{{ program.kategori }}</td>
                  <td>{{ program.rutinitas }}</td>
                  <td>{{ program.penyaluran }}</td>
                  <td>{{ program.rencana }}</td>
                  <td>{{ program.realisasi }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- Akhir dari elemen tabel -->
        <div class="description-container">
          <div class="description-box1">
            <p class="description-text1">Pengguna Dana</p>
          </div>
          <div class="tombol-plus">
            <div class="print" style="margin-top: 12px">
              <button type="button" class="btn" style="font-size: 25px">
                <b-icon-plus></b-icon-plus>
              </button>
            </div>
          </div>
        </div>
        <!-- Tambahkan kotak di sini -->
        <div class="Row1">
          <p class="text-dana">
            Dana yang direncanakan : RP {{ danaDirencanakan }}
          </p>
          <p class="text-dana">Dana yang digunakan : RP {{ danaDigunakan }}</p>
          <p class="text-dana">Saldo : RP {{ danaSaldo }}</p>
        </div>

        <!-- Akhir dari kotak -->
        <!-- Tambahkan elemen tabel di bawah -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kategori Pengeluaran</th>
                <th>Jumlah Realisasi</th>
                <th>Jumlah Rencana</th>
                <th>Sumber Dana</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programDana.length === 0">
                <tr>
                  <td colspan="5" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programDana" :key="index">
                  <td>{{ program.no }}</td>
                  <td>{{ program.kategoripengeluaran }}</td>
                  <td>{{ program.jumlahrealisasi }}</td>
                  <td>{{ program.jumlahrencana }}</td>
                  <td>{{ program.dana }}</td>
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
import Sidebar from "@/components/SidebarView.vue";

export default {
  data() {
    return {
      selectedMonth: new Date().getMonth() + 1, // Mengatur bulan saat ini sebagai nilai awal
      selectedYear: new Date().getFullYear(), // Mengatur tahun saat ini sebagai nilai awal
      years: this.generateYears(), // Menghasilkan daftar tahun
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      options: [
        "PROGRAM KEPUSTAKAAN",
        "PROGRAM INTELEKTUALITAS",
        "PROGRAM EKOLITERASI",
        "SUPPORTING SYSTEM",
      ],
      selectedOptionIndex: 0, // Menetapkan indeks pertama sebagai nilai awal
      danaDirencanakan: 9580000, // Contoh nilai dana yang direncanakan
      danaDigunakan: 9215160, // Contoh nilai dana yang direncanakan
      danaSaldo: 364840, // Contoh nilai dana yang direncanakan
      // Data program yang akan ditampilkan di tabel
      programData: [
        // Di sini Anda dapat menambahkan data program atau mengambilnya dari sumber eksternal
      ],
      programEvaluasi: [
        // Di sini Anda dapat menambahkan data evaluasi atau mengambilnya dari sumber eksternal
      ],
      programPenerima: [
        // Di sini Anda dapat menambahkan data penerima atau mengambilnya dari sumber eksternal
      ],
      programDana: [
        // Di sini Anda dapat menambahkan data penerima atau mengambilnya dari sumber eksternal
      ],
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.options[this.selectedOptionIndex]
        : "PROGRAM KEPUSTAKAAN";
    },
  },
  methods: {
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputkpi" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
      // Di sini Anda dapat mengambil data program terkait dari sumber eksternal, misalnya dari API
      // dan mengisi programData sesuai dengan program yang dipilih
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

<style></style>
