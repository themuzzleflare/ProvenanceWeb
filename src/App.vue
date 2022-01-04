<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <APIKeyModal />
  <SettingsModal />
  <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          alt=""
          class="d-inline-block align-text-center rounded-3 shadow-sm bg-body"
          height="50"
          src="./assets/logo.svg"
          width="50"
        />
        Provenance
      </router-link>
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler"
        data-bs-target="#navbarSupportedContent"
        data-bs-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/transactions"
              >Transactions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/accounts">Accounts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tags">Tags</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/categories"
              >Categories
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        <button
          class="d-flex btn btn-outline-primary"
          type="button"
          @click="openSettingsModal"
        >
          <font-awesome-icon :icon="['fas', 'cog']" />
        </button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import APIKeyModal from "@/components/APIKeyModal.vue";
import SettingsModal from "@/components/SettingsModal.vue";

import * as bootstrap from "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGithub);
library.add(faEnvelope);
library.add(faCog);

export default defineComponent({
  name: "App",
  components: { SettingsModal, APIKeyModal, FontAwesomeIcon },
  methods: {
    checkApiKey(): void {
      if (!localStorage.apiKey) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const el: HTMLElement = document.getElementById("apiKeyModal")!;
        const apiKeyModal: bootstrap.Modal = new bootstrap.Modal(el);
        apiKeyModal.toggle();
      }
    },
    openSettingsModal(): void {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const el: HTMLElement = document.getElementById("settingsModal")!;
      const settingsModal: bootstrap.Modal = new bootstrap.Modal(el);
      settingsModal.toggle();
    },
  },
  mounted() {
    this.checkApiKey();
  },
});
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

@font-face {
  font-family: "circular-std";
  src: url("fonts/CircularStd-Book.otf");
}

@font-face {
  font-family: "circular-std";
  font-style: italic;
  src: url("fonts/CircularStd-BookItalic.ttf");
}

@font-face {
  font-family: "circular-std";
  font-weight: 500;
  src: url("fonts/CircularStd-Medium.otf");
}

@font-face {
  font-family: "circular-std";
  font-weight: bold;
  src: url("fonts/CircularStd-Bold.otf");
}

@font-face {
  font-family: "sf-mono";
  src: url("fonts/SF-Mono-Regular.otf");
}

#app {
  font-family: "circular-std", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  a {
    color: #22222e;

    &:hover {
      color: black;
    }

    &.router-link-exact-active {
      color: #ff7967;
      font-weight: 500;
    }
  }
}

.navbar-brand {
  font-weight: 500;
  transition: transform 200ms ease;

  @media screen and (max-width: 991px) {
    transition: none;
  }

  &:hover {
    transform: scale(1.1);

    @media screen and (max-width: 991px) {
      transform: none;
    }
  }
}
</style>
