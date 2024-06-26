<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Register</h2>
      <form action="#" method="post" @click="store">
        <div class="input-container">
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div class="input-container">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter your password"
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
        <div class="input-container">
          <input v-model="email" type="text" id="email" placeholder="Email" />
        </div>
      </form>
      <button type="submit">Daftar</button>
      <div class="akun">
        Sudah punya akun? <router-link to="/">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "@/lib/axios";

export default {
  data() {
    return {
      showPassword: false,
      form: {
        username: "",
        password: "",

        email: "",
      },
    };
  },
  methods: {
    login() {
      // Implement your login logic here
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async store() {
      try {
        const response = await axios.post("/register", this.form);
        alert(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container {
  background: #fff;
  width: 532px;
  height: 67px;
  border-radius: 13px;
  padding: 10px 20 px;
  margin: 13px auto;
  display: flex;
  align-items: center;
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
  width: 532px;
  height: 67px;
  border-radius: 13px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 39px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 13px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("E:\Materi\TA\Website\salmanitb\src\assets\background.jpg");
  background-size: cover;
  z-index: -1;
}

h2 {
  font-size: 32px;
  margin-top: 48px;
  font-weight: bold;
}

.login-card {
  background-color: white;
  width: 630px;
  height: 599px;
  border-radius: 15px;
  padding: 20px;
  margin-left: 44px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.akun {
  margin-top: 22px;
  font-size: 16px;
  font-weight: 600;
}
</style>
