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
          <p>Tahunan / RKA</p>
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
              <button type="button" class="btn" @click="goToInputPage">
                Filter<b-icon-funnel-fill></b-icon-funnel-fill>
              </button>
              <div class="print">
                <button type="button" class="btn">
                  <b-icon-printer-fill
                    style="width: 20px; height: 20px"
                  ></b-icon-printer-fill>
                </button>
              </div>
            </div>
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
        <div class="box-text">
          <p class="text-area">Buku Antologi Literasi batch II</p>
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
        <p class="text-kebutuhan">
          Pengumpulan & Review Naskah
          <b-icon
            icon="plus-square"
            style="color: #967c55"
            @click="goToInputBulan"
          ></b-icon>
        </p>
        <div class="tabel-container">
          <table class="tabel" v-if="!showAnggaranTable">
            <thead>
              <tr>
                <th style="width: 40px">No.</th>
                <!-- Set lebar kolom No. -->
                <th style="width: 154px">Uraian</th>
                <th style="width: calc((100% - 40px) / 13)">Jan</th>
                <th style="width: calc((100% - 40px) / 13)">Feb</th>
                <th style="width: calc((100% - 40px) / 13)">Mar</th>
                <th style="width: calc((100% - 40px) / 13)">Apr</th>
                <th style="width: calc((100% - 40px) / 13)">Mei</th>
                <th style="width: calc((100% - 40px) / 13)">Jun</th>
                <th style="width: calc((100% - 40px) / 13)">Jul</th>
                <th style="width: calc((100% - 40px) / 13)">Agust</th>
                <th style="width: calc((100% - 40px) / 13)">Sept</th>
                <th style="width: calc((100% - 40px) / 13)">Okt</th>
                <th style="width: calc((100% - 40px) / 13)">Nov</th>
                <th style="width: calc((100% - 40px) / 13)">Des</th>
                <th style="width: 50px; text-align: center"></th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="programBulanByOption && programBulanByOption.length === 0"
              >
                <tr>
                  <td colspan="15" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr
                  v-for="(program, index) in programBulanByOption"
                  :key="index"
                >
                  <td>{{ program.no }}</td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.uraian
                    }}</template>
                    <input type="text" v-model="program.uraian" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.jan
                    }}</template>
                    <input type="text" v-model="program.jan" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.feb
                    }}</template>
                    <input type="text" v-model="program.feb" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.mar
                    }}</template>
                    <input type="text" v-model="program.mar" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.apr
                    }}</template>
                    <input type="text" v-model="program.apr" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.mei
                    }}</template>
                    <input type="text" v-model="program.mei" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.jun
                    }}</template>
                    <input type="text" v-model="program.jun" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.jul
                    }}</template>
                    <input type="text" v-model="program.jul" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.agust
                    }}</template>
                    <input type="text" v-model="program.agust" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.sept
                    }}</template>
                    <input type="text" v-model="program.sept" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.okt
                    }}</template>
                    <input type="text" v-model="program.okt" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.nov
                    }}</template>
                    <input type="text" v-model="program.nov" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.des
                    }}</template>
                    <input type="text" v-model="program.des" v-else />
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

          <table class="tabel anggaran-table" v-else>
            <thead>
              <tr>
                <th style="width: 40px">No.</th>
                <th style="width: 225px">Uraian</th>
                <th style="width: 145px">Nilai Satuan</th>
                <th style="width: calc((100% - 40px) / 12)">Qty</th>
                <th style="width: calc((100% - 40px) / 12)">Unt</th>
                <th style="width: calc((100% - 40px) / 12)">Frq</th>
                <th style="width: calc((100% - 40px) / 12)">Unt</th>
                <th style="width: calc((100% - 40px) / 12)">Vol</th>
                <th style="width: 145px">Nilai Total</th>
                <th style="width: 120px">Sumber Dana</th>
                <th style="width: 120px">Keterangan</th>
                <th style="width: 50px; text-align: center"></th>
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
                  <td colspan="12" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel saat tombol "Resume" diklik -->
                <tr
                  v-for="(program, index) in programAnggaranByOption"
                  :key="index"
                >
                  <td>{{ program.no }}</td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.uraian
                    }}</template>
                    <input type="text" v-model="program.uraian" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.jan
                    }}</template>
                    <input type="text" v-model="program.jan" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.nilai_satuan
                    }}</template>
                    <input type="text" v-model="program.nilai_satuan" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.qty
                    }}</template>
                    <input type="text" v-model="program.qty" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.unt_1
                    }}</template>
                    <input type="text" v-model="program.unt_1" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.frq
                    }}</template>
                    <input type="text" v-model="program.frq" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.unt_2
                    }}</template>
                    <input type="text" v-model="program.unt_2" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.vol
                    }}</template>
                    <input type="text" v-model="program.vol" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.nilai_total
                    }}</template>
                    <input type="text" v-model="program.nilai_total" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.sumber_dana
                    }}</template>
                    <input type="text" v-model="program.sumber_dana" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.keterangan
                    }}</template>
                    <input type="text" v-model="program.keterangan" v-else />
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
      showAnggaranTable: false,

      programBulan: [],
      programAnggaran: [],
      options: [
        "PROGRAM KEPUSTAKAAN",
        "PROGRAM INTELEKTUALITAS",
        "PROGRAM EKOLITERASI",
        "SUPPORTING SYSTEM",
      ],
      selectedOptionIndex: null,
      isBulanActive: true,
      isAnggaranActive: false,
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.options[this.selectedOptionIndex]
        : "PROGRAM KEPUSTAKAAN";
    },
    programBulanByOption() {
      return this.programBulan[this.selectedOption];
    },
    programAnggaranByOption() {
      return this.programAnggaran[this.selectedOption];
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA"); // Adjust the URL based on your API endpoint
        this.programBulan = response.data.programBulan;
        this.programAnggaran = response.data.programAnggaran;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputanggaran" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    goToInputBulan() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputbulan" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    editProgram(program) {
      // Toggle isEditing saat tombol edit diklik
      program.isEditing = !program.isEditing;
      // Simpan perubahan ke database
      // this.saveChanges(program);
      // Lakukan sesuatu dengan program yang diedit
      console.log("Editing program:", program);
    },
    toggleActive(button) {
      if (button === "bulan") {
        this.isBulanActive = true;
        this.isAnggaranActive = false;
        this.showAnggaranTable = false;
      } else {
        this.isBulanActive = false;
        this.isAnggaranActive = true;
        this.showAnggaranTable = true;
      }
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style>
.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card-container .card {
  background-color: white;
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

.text-kebutuhan {
  margin-left: 16px;
  margin-top: 24px;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.tabel-container {
  padding-top: 0%;
}

.tabel input[type="text"] {
  border: none;
  width: 100%;
  background-color: transparent;
  text-align: center;
  font-size: 15px;
}

/* Hilangkan border dan background-color input saat dalam mode edit */
.tabel input[type="text"]:focus {
  outline: none;
}

/* Sembunyikan tombol save-fill saat dalam mode edit */
.edit-btn .b-icon[icon="save-fill"] {
  display: none;
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
