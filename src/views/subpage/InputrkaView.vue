<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Form Input</p>
        </div>
        <div class="container">
          <form>
            <div class="mb-3">
              <label for="namabidangprogram" class="form-label"
                >Nama Bidang Program</label
              >
              <div class="dropdown-with-addition">
                <select
                  v-model="bidangprogram"
                  class="form-control"
                  id="namabidangprogram1"
                  @change="handleProgramChange"
                >
                  <option value="">Pilih Bidang Program</option>
                  <option value="PROGRAM KEPUSTAKAAN">
                    PROGRAM KEPUSTAKAAN
                  </option>
                  <option value="PROGRAM INTELEKTUALITAS">
                    PROGRAM INTELEKTUALITAS
                  </option>
                  <option value="PROGRAM EKOLITERASI">
                    PROGRAM EKOLITERASI
                  </option>
                  <option value="SUPPORTING SYSTEM">SUPPORTING SYSTEM</option>
                  <option
                    value="__add__"
                    style="text-align: center; color: #5897fb"
                  >
                    ---Tambah program lain----<b-icon-person-add
                    ></b-icon-person-add>
                  </option>
                </select>
                <input
                  v-if="showAddInput"
                  type="text"
                  class="form-control"
                  v-model="newProgram"
                  placeholder="Masukkan Bidang Program Baru"
                />
              </div>
            </div>

            <div class="card-container1">
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="programkegiatan" class="form-label"
                      >Nama program kegiatan</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="programkegiatan1"
                      v-model="programkegiatan"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="deskripsi" class="form-label">Deskripsi</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="deskripsi1"
                      v-model="deskripsi"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="output" class="form-label">Output</label>
                    <input
                      type="text"
                      class="form-control"
                      id="output1"
                      v-model="output"
                    />
                  </div>
                  <div class="row">
                    <div class="mb-3">
                      <label for="tahunkegiatan" class="form-label"
                        >Tahun Kegiatan</label
                      >
                      <select
                        v-model="selectedYear"
                        class="form-control"
                        id="tahunkegiatan1"
                        style="width: 490px; margin-right: 20px"
                      >
                        <option v-for="year in years" :key="year" :value="year">
                          {{ year }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="sumberdana" class="form-label"
                        >Sumber Dana</label
                      >
                      <select
                        v-model="sumberdana"
                        class="form-control"
                        id="sumberdana1"
                      >
                        <option value="">Pilih Sumber Dana</option>
                        <option value="Dana Pusat">Dana Pusat</option>
                        <option value="Dana RAS">Dana RAS</option>
                        <option value="Dana kepesertaan">
                          Dana kepesertaan
                        </option>
                        <option value="Dana pihak ketiga">
                          Dana pihak ketiga
                        </option>
                        <option value="Dana pusat wakaf salman">
                          Dana pusat wakaf salman
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="tombol">
                    <button
                      type="button"
                      class="btn hapus-btn"
                      style="
                        display: none;
                        background-color: #ff0000;
                        margin-right: 14px;
                      "
                    >
                      Hapus
                    </button>
                    <button type="button" class="btn tambah-btn">Tambah</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tombol1">
              <button type="button" class="btn" @click="saveData">
                Simpan
              </button>
            </div>
          </form>
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
      showAddInput: false,
      newProgram: "",
      sumberdana: "",
      programkegiatan: "", // Menambahkan data kegiatan, deskripsi, dan output ke data
      deskripsi: "",
      output: "",
    };
  },
  mounted() {
    // Attach event listener to the parent element for both Tambah and Hapus buttons
    const cardContainer = document.querySelector(".card-container1");
    cardContainer.addEventListener("click", this.handleButtonClick);
  },
  methods: {
    handleProgramChange(event) {
      if (event.target.value === "__add__") {
        this.showAddInput = true;
      } else {
        this.showAddInput = false;
      }
    },
    handleButtonClick(event) {
      // Check if the clicked element is either "Tambah" or "Hapus" button
      if (event.target.classList.contains("tambah-btn")) {
        // Clone the existing card template
        const existingCard = document.querySelector(".card1");
        const newCard = existingCard.cloneNode(true);

        // Clear input values of the new card
        newCard
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));

        // Add the new card below the existing ones
        const cardContainer = document.querySelector(".card-container1");
        cardContainer.appendChild(newCard);

        // Show "Hapus" button only in duplicated containers
        const cardContainers = document.querySelectorAll(".card1");
        cardContainers.forEach((container) => {
          const hapusButton = container.querySelector(".hapus-btn");
          hapusButton.style.display =
            cardContainers.length > 1 ? "inline-block" : "none";
        });
      } else if (event.target.classList.contains("hapus-btn")) {
        // Remove the parent card when "Hapus" button is clicked
        event.target.closest(".card1").remove();

        // Hide "Hapus" button if there's only one container left
        const cardContainers = document.querySelectorAll(".card1");
        cardContainers.forEach((container) => {
          const hapusButton = container.querySelector(".hapus-btn");
          hapusButton.style.display =
            cardContainers.length > 1 ? "inline-block" : "none";
        });
      }
    },
    saveData() {
      // Mengumpulkan data formulir
      const formData = {
        bidangprogram: this.bidangprogram,
        sumberdana: this.sumberdana,
        selectedYear: this.selectedYear,
        programkegiatan: this.programkegiatan,
        deskripsi: this.deskripsi,
        output: this.output,
      };

      // Kirim data ke backend server menggunakan Axios
      axios
        .post("/api/programKegiatanRKA", formData)
        .then((response) => {
          // Tambahkan logika jika simpan berhasil
          console.log(response.data);
          // Misalnya, tampilkan pesan sukses kepada pengguna
          alert("Data berhasil disimpan!");
        })
        .catch((error) => {
          // Tambahkan logika jika simpan gagal
          console.error("Terjadi kesalahan:", error);
          // Misalnya, tampilkan pesan kesalahan kepada pengguna
          alert("Terjadi kesalahan saat menyimpan data.");
        });
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
.dropdown-with-addition {
  position: relative;
}

.dropdown-with-addition select {
  width: 490px;
  height: 38px;
}

.dropdown-with-addition input {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 16px); /* Sesuaikan dengan width form-control */
  height: 38px; /* Sesuaikan dengan tinggi form-control */
  margin-top: 38px; /* Sesuaikan dengan margin top form-control */
}

.form-control {
  background-color: white;
  overflow-y: auto;
}

/* Tetapkan width dan height dropdown */
.form-control#namabidangprogram1 {
  width: 1030px;
  height: 38px; /* Sesuaikan dengan tinggi form sebelumnya */
}

.form-control#sumberdana1 {
  width: 490px; /* Sesuaikan dengan width form sebelumnya */
  height: 38px; /* Sesuaikan dengan tinggi form sebelumnya */
}
.form-control#tahunkegiatan1 {
  width: 490px; /* Sesuaikan dengan width form sebelumnya */
  height: 38px; /* Sesuaikan dengan tinggi form sebelumnya */
}

.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card-container1 {
  overflow-y: auto;
  margin-top: 32px;
}

.form {
  margin-left: 16px;
  margin-right: 9px;
}

.form .mb-3 .form-label {
  margin-top: 12px;
}

.card-container1 .card1 {
  background-color: #d9d9d9;
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

form {
  margin-left: 45px;
  margin-top: 57px;
  margin-right: 36px;
}

.form-label {
  font-size: 16px;
  font-weight: 700;
}

.card1 .tombol {
  display: flex;
  margin-top: 14px;
  margin-right: 9px;
}

.card1 .tombol .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 47px;
  width: 104px;
  color: white;
  margin-bottom: 19px;
}

.tombol1 {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}

.tombol1 .btn {
  background-color: #967c55;
  font-size: 16px;
  font-weight: bolder;
  height: 47px;
  width: 104px;
  color: white;
}

.form .row {
  margin-left: 0%;
}
</style>
