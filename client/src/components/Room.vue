<template>
  <div class="room">
    You are {{ name }}!
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Room',

  props: {
    name: String,
  },
});
</script>

<style lang="scss">
@import '@/styles/global';

.room {
  flex: 1 0 auto;
  background: $color-blue;
}
</style>
