<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue'
import { useProvenanceStore } from '@/store'

const store = useProvenanceStore()

const text: Ref<string> = ref<string>('')

const apiKey = computed(() => store.apiKey)

onMounted(() => {
  if (apiKey.value) {
    text.value = apiKey.value
  }
})
</script>

<template>
  <div id="apiKeyModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">API Key Required</h5>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <p>You don't have an API Key set. You can set one now.</p>
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
            @click="store.setApiKey(text)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
