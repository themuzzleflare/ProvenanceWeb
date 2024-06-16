<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="about">
    <span>
      Provenance is a web application that interacts with the Up Banking Developer API to display
      information about your bank accounts, transactions, categories, tags and more.
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
        href="mailto:paul@tavitian.net.au?subject=Feedback%20for%20Provenance"
      >
        <font-awesome-icon :icon="['fas', 'envelope']" />
        <span>Contact Developer</span>
      </a>
    </div>
  </div>
</template>

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
