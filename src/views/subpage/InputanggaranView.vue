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
              <input
                type="program"
                class="form-control"
                id="namabidangprogram1"
              />
            </div>
            <div class="mb-3">
              <label for="namaprogramkegiatan" class="form-label"
                >Nama Program Kegiatan</label
              >
              <input
                type="program"
                class="form-control"
                id="namaprogramkegiatan1"
              />
            </div>
            <div class="card-container1">
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="judulkegiatan" class="form-label"
                      >Judul Kegiatan</label
                    >
                    <input
                      type="judulkegiatan"
                      class="form-control"
                      id="judulkegiatan1"
                      v-model="judulkegiatan"
                    />
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
              <button type="button" class="btn" @click="goToInputPage">
                Simpan
              </button>
            </div>
          </form>
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
      selectedYear: new Date().getFullYear(), // Mengatur tahun saat ini sebagai nilai awal
      years: this.generateYears(), // Menghasilkan daftar tahun
    };
  },
  mounted() {
    // Attach event listener to the parent element for both Tambah and Hapus buttons
    const cardContainer = document.querySelector(".card-container1");
    cardContainer.addEventListener("click", this.handleButtonClick);
  },
  methods: {
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
  padding-left: 0%;
  padding-top: 0%;
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
</style>
