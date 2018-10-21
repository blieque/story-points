<template>
  <div class="welcome">
    <p @click="focusInput(1)">Enter your intials to participate:</p>

    <div class="welcome__input-wrapper">
      <input
        class="welcome__input"
        v-model="initialFirst"
        type="text"
        maxlength="1"
        autofocus>
      <input
        class="welcome__input"
        v-model="initialLast"
        type="text"
        maxlength="1">
    </div>

    <hr>

    <p>
      <a
        href=""
        @click.prevent="$emit('identify', { name: null })">
        I just want to observe.
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Welcome',

  data() {
    return {
      initialFirst: '',
      initialLast: '',
      el: {
        inputs: null,
      },
    };
  },

  computed: {
    name() {
      return `${this.initialFirst || ''}${this.initialLast || ''}`.toUpperCase();
    },
  },

  watch: {
    initialFirst() {
      this.initialFirst = this.sanitiseInitial(this.initialFirst);
      if (this.initialFirst.length > 0) this.focusInput(1);
    },

    initialLast() {
      this.initialLast = this.sanitiseInitial(this.initialLast);
      if (this.initialLast.length > 0) this.focusInput(0);
    },

    name() {
      if (this.name.length > 1) {
        this.$emit('identify', { name: this.name });
      }
    },
  },

  mounted() {
    this.el.inputs = this.$el.querySelectorAll('input');
    this.focusInput(0);
  },

  methods: {
    focusInput(index) {
      this.el.inputs[index].focus();
    },

    sanitiseInitial(input) {
      const match = input.toUpperCase().match(/^[A-Z]$/);
      return match !== null ? match[0] : '';
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/global';

.welcome {
  padding: $unit * 3;
  width: $unit * 25;
  max-width: 100%;

  > * {
    margin-top: $unit * 2;
  }

  > :first-child {
    margin-top: 0;
  }

  &__input-wrapper {
    display: flex;
  }

  &__input {
    flex: 1;
    padding: 0.5em 0.6em 0.4em;
    min-width: 1.6em;
    background: $color-white;
    border: none;
    border-radius: $unit * 0.5;
    font: inherit;
    font-size: $unit * 3.9;
    text-align: center;

    &:not(:first-child) {
      margin-left: $unit * 2;
    }
  }
}
</style>
