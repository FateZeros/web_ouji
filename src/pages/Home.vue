<template>
  <div>
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :key="key">
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/Header.vue'
import vSidebar from '@/components/Sidebar.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    vHeader,
    vSidebar
  },
  computed: {
    key () {
      return this.$router.path !== undefined ? this.$router.path + +new Date() : this.$router + +new Date()
    }
  }
}
</script>

<style scoped>
  .content {
    margin-left: 250px;
    padding: 20px;
  }
</style>
