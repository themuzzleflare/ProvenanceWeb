<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div class="about">
    <span>
      Provenance is a web application that interacts with the Up Banking
      Developer API to display information about your bank accounts,
      transactions, categories, tags and more.
    </span>
    <div class="list-group">
      <a
        class="list-group-item list-group-item-action"
        href="https://github.com/themuzzleflare/ProvenanceWeb"
        target="_blank"
      >
        <font-awesome-icon :icon="['fab', 'github']" />
        <span>GitHub</span>
      </a>
      <a
        class="list-group-item list-group-item-action"
        href="mailto:feedback@tavitian.cloud?subject=Feedback%20for%20Provenance"
      >
        <font-awesome-icon :icon="['fas', 'envelope']" />
        <span>Contact Developer</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Options({
  components: { FontAwesomeIcon },
})
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
.about {
  margin: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-group-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>
