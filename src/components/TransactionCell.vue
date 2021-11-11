<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div id="horizontalStack">
    <div id="verticalStack">
      <span id="description">{{ description }}</span>
      <span id="creationDate" class="text-secondary">{{ creationDate }}</span>
    </div>
    <span
      id="amount"
      :class="{
        positiveAmount: parseInt(transaction.attributes.amount.value) >= 0,
      }"
      >{{ amount }}</span
    >
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

import { Options, Vue } from "vue-class-component";
import TransactionResource from "@/UpAPI/TransactionResource";
import { PropType } from "vue";

@Options({
  props: {
    transaction: {
      type: Object as PropType<TransactionResource>,
      required: true,
    },
  },
  computed: {
    description(): string {
      return this.transaction.attributes.description;
    },
    creationDate(): string {
      return this.formatDate(this.transaction.attributes.createdAt);
    },
    amount(): string {
      return this.formatAmount(
        this.transaction.attributes.amount.currencyCode,
        this.transaction.attributes.amount.value
      );
    },
  },
  methods: {
    formatDate(date: string): string {
      if (this.$store.state.relativeDates) {
        return dayjs().to(dayjs(date));
      } else {
        return dayjs(date).tz("Australia/Sydney").format("lll");
      }
    },
    formatAmount(currencyCode: string, amount: string): string {
      const formatter = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: currencyCode,
      });
      const newAmount = parseInt(amount);

      return formatter.format(newAmount);
    },
  },
})
export default class TransactionCell extends Vue {
  transaction!: TransactionResource;
}
</script>

<!--suppress CssUnusedSymbol -->
<style lang="scss" scoped>
#horizontalStack {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;

  &:hover {
    cursor: pointer;
  }
}

#verticalStack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#description {
  font-weight: 500;
}

#amount {
  text-align: right;
}

.positiveAmount {
  color: #00ba81;
}
</style>
