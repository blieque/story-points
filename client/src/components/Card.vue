<template>
  <div class="card">
    <div class="card__front"></div>
    <div class="card__back"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
});
</script>

<style lang="scss">
@import '@/styles/global';

.card {
  background: $color-white;
  border-radius: $unit * 2;
  box-shadow: 0 $unit * 0.5 $unit * 2 0 rgba($color-black, 0.1);

  &__front {

  }

  &__back {

  }
}
</style>
