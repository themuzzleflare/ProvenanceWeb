<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <h4 id="noContent">{{ message }}</h4>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    message: String,
  },
})
export default class NoContent extends Vue {
  message!: string;
}
</script>

<style lang="scss" scoped>
#noContent {
  text-align: center;
  margin: 30px;
}
</style>
