<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Profile</p>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              @change="changeImage"
              accept="image/*"
            />
            <div class="profile-picture">
              <img src="@/assets/profil.jpg" alt="Profile Picture" />
              <div class="overlay-text" @click="openFileInput">
                Change Profile
              </div>
            </div>
          </div>
          <div class="col-6">
            <ul class="list-group">
              <li class="nama">{{ user.name }}</li>
              <li class="role">{{ user.role }}</li>
            </ul>
            <div class="identitas">
              <ul class="list-group list-group-horizontal-md">
                <li class="list-group-item">Nama:</li>
                <li class="list-group-item">{{ user.name }}</li>
              </ul>
              <ul class="list-group list-group-horizontal-md">
                <li class="list-group-item">Email:</li>
                <li class="list-group-item">{{ user.email }}</li>
              </ul>
            </div>
          </div>
          <div class="col">
            <div class="tombol">
              <button
                type="button"
                class="btn-out"
                style="background-color: red"
                @click="logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        role: "Admin", // Peran default, bisa disesuaikan atau diambil dari data pengguna jika tersedia
      },
    };
  },
  mounted() {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      this.user.name = userData.name;
      this.user.email = userData.email;
      // Ubah 'profilePicture' jika URL gambar profil tersedia di userData
      // this.profilePicture = userData.profilePicture || '@/assets/profil.jpg';
    }
  },
  methods: {
    logout() {
      // Hapus token akses dari session storage
      sessionStorage.removeItem("bearer");
      sessionStorage.removeItem("user");

      // Clear localStorage data
      localStorage.clear();

      // Clear sessionStorage data
      sessionStorage.clear();
      // Hapus cookie (jika ada)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Redirect pengguna kembali ke halaman login
      window.location.href = "/"; // Gantilah "/" dengan URL halaman login Anda
    },
    changeImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePicture = reader.result; // Mengubah gambar dengan gambar yang dipilih dari galeri
        };
        reader.readAsDataURL(file);
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.profile-picture {
  position: relative;
}

.btn-out {
  width: 104px;
  height: 47px;
  border-radius: 3px;
  color: white;
}

.overlay-text {
  position: absolute;
  margin-left: 24px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  height: 37px;
  width: 220px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}

.overlay-text:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
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

.col img {
  margin-left: 24px;
  height: 218px;
  width: 219px;
}

.tombol {
  display: flex;
  justify-content: flex-end; /* Mengatur agar tombol berada di sebelah kanan */
  margin-right: 32px;
}

.tombol .btn {
  font-size: 16px;
  font-weight: 600;
  height: 35px;
  width: 110px;
}

.list-group .nama {
  font-weight: 600;
  list-style-type: none;
  font-size: 24px;
}

.list-group .role {
  font-weight: 600;
  list-style-type: none;
  font-size: 16px;
}

.row .col {
  margin-top: 28px;
}

.list-group .nama {
  margin-top: 28px;
}

.identitas {
  margin-top: 32px;
}

.identitas .list-group-item {
  background-color: white;
  border: none;
}
</style>
