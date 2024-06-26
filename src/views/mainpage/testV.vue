<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / Penjelasan RKA</p>
        </div>
        <div class="container text-center">
          <div class="row-field align-items-start">
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
              <button type="button" class="btn">
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
};
</script>

<style scoped>
.row-field {
  display: flex;
}
</style>
