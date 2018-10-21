<template>
  <div class="app">
    <Welcome
      v-if="name === '' && !connecting"
      @identify="connect"/>
    <Connecting
      v-else-if="connecting"
      @connect="enterRoom"/>
    <Room
      v-else
      :name="name"
      :socket="socket"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Connecting from '@/components/Connecting';
import Room from '@/components/Room';
import Welcome from '@/components/Welcome';

export default Vue.extend({
  name: 'App',

  components: {
    Connecting,
    Room,
    Welcome,
  },

  data() {
    return {
      name: '',
      connecting: false,
      socket: null,
    };
  },

  methods: {
    connect({ name }) {
      this.name = name;
      this.connecting = true;
    },

    enterRoom(socket) {
      this.connecting = false;
      this.socket = socket;
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/global';

.app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: $color-blue;
  color: $color-white;
}
</style>
