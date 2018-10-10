<template>
    <div class="app">
      <Welcome
        v-if="name === ''"
        @identify="join"/>
      <Room
        v-else
        :name="name"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Room from '@/components/Room';
import Welcome from '@/components/Welcome';

export default Vue.extend({
  name: 'App',

  components: {
    Room,
    Welcome,
  },

  data() {
    return {
      name: '',
    };
  },

  methods: {
    join({ name }) {
      // Attempt to join.
      this.name = name;
    },
  },
});
</script>

<style lang="scss">
.app {
  height: 100vh;

  &,
  &__content {
    display: flex;
    flex-direction: column;

    &,
    .section:last-child {
      flex: 1 0 auto;
    }
  }
}
</style>
