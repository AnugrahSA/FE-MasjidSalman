<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Login Masjid Salman ITB</h2>
      <p>
        Selamat datang kembali! Silakan masuk untuk mengakses akun Anda dan
        tetap terhubung dengan komunitas Masjid Salman ITB.
      </p>
      <form @submit.prevent="onSubmit">
        <div class="input-container">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            autocomplete="username"
            required
          />
        </div>
        <div class="input-container">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          />
          <b-icon-eye-fill
            style="
              width: 24px;
              height: 14px;
              margin-right: 23px;
              cursor: pointer;
            "
            @click="togglePasswordVisibility"
          ></b-icon-eye-fill>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="rememberMe"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Remember Me
          </label>
        </div>
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Masuk</span>
        </button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="akun">
        Tidak punya akun? <router-link to="/register">Daftar</router-link>
      </div>
      <div class="lupa">
        <router-link to="/lupa" style="color: red">Lupa Password</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "@/lib/axios"; // Sesuaikan path sesuai struktur proyek Anda

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const form = {
    email: email.value,
    password: password.value,
    remember: rememberMe.value,
  };

  try {
    await axios.get("sanctum/csrf-cookie");
    try {
      const result = await axios.post("/login", form);
      if (result.status !== 200) {
        throw new Error(result.data);
      }
      sessionStorage.setItem("user", JSON.stringify(result.data.user));
      sessionStorage.setItem("bearer", result.data.access_token);
      window.location.href = "/profile";
    } catch (error) {
      console.error(
        "Error saat melakukan permintaan:",
        error.response?.data || error.message
      );
      errorMessage.value =
        error.response?.data.message || "Login gagal. Periksa kredensial Anda.";
    }
  } catch (error) {
    console.error("Error dengan CSRF atau jaringan:", error);
    errorMessage.value = "Kesalahan jaringan. Silakan coba lagi nanti.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (sessionStorage.getItem("bearer") != null) {
    window.location.href = "/profile";
  }
});
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.input-container {
  background: #fff;
  width: 100%;
  max-width: 532px;
  height: 67px;
  border-radius: 13px;
  padding: 10px 20px;
  margin: 13px auto;
  display: flex;
  align-items: center;
}

.form-check {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form-check .form-check-label {
  font-size: 12px;
  font-weight: 600;
}

.input-container input {
  width: 100%;
  padding: 10px 0;
  border-radius: 15px;
  border: 0;
  outline: 0;
  font-size: 16px;
  color: black;
}

button {
  background-color: #967c55;
  width: 100%;
  max-width: 532px;
  height: 67px;
  border-radius: 13px;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 29px;
  font-size: 20px;
  font-weight: bold;
}

button:disabled {
  background-color: #967c55;
  opacity: 0.6;
  cursor: not-allowed;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("E:\\Materi\\TA\\Website\\salmanitb\\src\\assets\\background.jpg");
  background-size: cover;
  z-index: -1;
}

h2 {
  font-size: 32px;
  margin-top: 48px;
  font-weight: bold;
}

p {
  font-size: 13px;
  font-weight: medium;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 22px;
}

.login-card {
  background-color: white;
  width: 100%;
  max-width: 630px;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.akun {
  margin-top: 22px;
  font-size: 16px;
  font-weight: 600;
}

.lupa {
  color: red;
  font-weight: 600;
  font-size: 16px;
  margin-top: 11px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
