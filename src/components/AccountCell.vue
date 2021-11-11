<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div id="verticalStack">
    <span id="accountBalance">{{ accountBalance }}</span>
    <span id="accountDisplayName">{{ accountDisplayName }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    account: Object,
  },
  computed: {
    accountBalance() {
      return this.formatBalance(
        this.account.attributes.balance.currencyCode,
        this.account.attributes.balance.value
      );
    },
    accountDisplayName() {
      return this.account.attributes.displayName;
    },
  },
  methods: {
    formatBalance(currencyCode: string, balance: string) {
      const formatter = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: currencyCode,
      });
      const newBalance = parseInt(balance);

      return formatter.format(newBalance);
    },
  },
})
export default class AccountCell extends Vue {
  tag!: Record<string, unknown>;
}
</script>

<style lang="scss" scoped>
#verticalStack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    cursor: pointer;
  }
}

#accountBalance {
  font-weight: bold;
  color: #ff7967;
  font-size: larger;
}
</style>
