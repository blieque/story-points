<template>
  <div class="connecting">
    <span class="connecting__spinner"></span>Connecting
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import io from 'socket.io-client';

export default Vue.extend({
  name: 'Connecting',

  created() {
    console.log('something');
    const socket = io({ path: '/data' });
    socket.on('connect', () => {
      console.log('something else');
      // this.$emit('connect', socket);
    });
  },
});
</script>

<style lang="scss">
@import '@/styles/global';

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.connecting {
  @extend %type-container-fix;

  &__spinner {
    display: inline-block;
    margin: -0.25em 1em -0.25em 0;
    width: 1.2em;
    height: 1.2em;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 1em;
      border: solid 0.1em transparent;
      border-right-color: #fff;
    }

    &::before {
      animation: 1s linear infinite spin;
    }

    &::after {
      border-top-color: #fff;
      opacity: 0.4;
      animation: 2s linear infinite reverse spin;
    }
  }
}
</style>
