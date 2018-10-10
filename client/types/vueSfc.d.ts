/**
 * Allow the importing of Vue components from within TypeScript code.
 *
 * When importing Vue components, *always* use the '@/components/Component' syntax, otherwise this
 * declaration will not be matched by TypeScript. ktsn/vuetype on Github can be used to
 * auto-generate `*.d.ts` files from `*.vue` components.
 */

declare module '@/components/*' {
  import Vue from 'vue';
  export default Vue;
}
