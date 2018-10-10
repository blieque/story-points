<template>
  <div class="room">
    <p>Enter your intials:</p>
    <div class="room__inputs">
      <input
        class="room__input"
        v-model="initialFirst"
        type="text"
        maxlength="1">
      <input
        class="room__input"
        v-model="initialLast"
        type="text"
        maxlength="1">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Room',


});
</script>

<style lang="scss">
@import '@/styles/global';

.room {
  flex: 1 0 auto;
  background: $color-blue;
}
</style>
