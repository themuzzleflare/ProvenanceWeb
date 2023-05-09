<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<template>
  <div id="settingsModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Settings</h5>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              id="floatingInput"
              v-model="text"
              class="form-control"
              placeholder="API Key"
              type="text"
            />
            <label for="floatingInput">API Key</label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
          <button
            class="btn btn-primary"
            data-bs-dismiss="modal"
            type="button"
            @click="setKeyApi(text)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores, mapActions, mapState } from 'pinia'
import { useProvenanceStore } from '@/store'

export default defineComponent({
  name: 'SettingsModal',
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapStores(useProvenanceStore),
    ...mapState(useProvenanceStore, ['apiKey'])
  },
  methods: {
    ...mapActions(useProvenanceStore, {
      setKeyApi: 'setApiKey'
    })
  },
  mounted() {
    if (this.apiKey) {
      this.text = this.apiKey
    }
  }
})
</script>
