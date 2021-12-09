<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div id="horizontalStack">
    <div id="verticalStack">
      <span id="description">{{ description }}</span>
      <span id="creationDate" class="text-secondary">{{ creationDate }}</span>
    </div>
    <span id="amount" :class="{ positiveAmount: isPositiveAmount }">{{
      amount
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import TransactionResource from "@/UpAPI/TransactionResource";
import { mapState } from "vuex";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export default defineComponent({
  name: "TransactionCell",
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
    isPositiveAmount(): boolean {
      return parseFloat(this.transaction.attributes.amount.value) > 0;
    },
    ...mapState(["relativeDates"]),
  },
  methods: {
    formatDate(date: string): string {
      return this.relativeDates
        ? dayjs().to(dayjs(date))
        : dayjs(date).tz("Australia/Sydney").format("D MMM, YYYY h:mm A");
    },
    formatAmount(currencyCode: string, amount: string): string {
      const formatter = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: currencyCode,
      });
      const newAmount = parseFloat(amount);
      return formatter.format(newAmount);
    },
  },
});
</script>

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
