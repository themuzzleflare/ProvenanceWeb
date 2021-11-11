<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="transaction === null" />
  <div v-else id="transactionDetail">
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="status"
        :detail-text="transaction?.attributes?.status"
        left-text="Status"
        class="list-group-item"
      />
      <AttributeCell
        key="account"
        :detail-text="account?.attributes?.displayName"
        left-text="Account"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByAccount(account)"
      />
      <AttributeCell
        key="transferAccount"
        v-if="transferAccount"
        :detail-text="transferAccount?.attributes?.displayName"
        left-text="Transfer Account"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByAccount(transferAccount)"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="description"
        :detail-text="transaction?.attributes?.description"
        left-text="Description"
        class="list-group-item"
      />
      <AttributeCell
        key="rawText"
        v-if="transaction?.attributes?.rawText"
        :detail-text="transaction?.attributes?.rawText"
        left-text="Raw Text"
        class="list-group-item"
      />
      <AttributeCell
        key="message"
        v-if="
          transaction?.attributes?.message &&
          transaction?.attributes?.message !== ''
        "
        :detail-text="transaction?.attributes?.message"
        left-text="Message"
        class="list-group-item"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="holdAmount"
        v-if="transactionHoldValue"
        :detail-text="transactionHoldValue"
        left-text="Hold Amount"
        class="list-group-item"
      />
      <AttributeCell
        key="holdForeignAmount"
        v-if="transactionHoldForeignValue"
        :detail-text="transactionHoldForeignValue"
        left-text="Hold Foreign Amount"
        class="list-group-item"
      />
      <AttributeCell
        key="foreignAmount"
        v-if="transactionForeignValue"
        :detail-text="transactionForeignValue"
        left-text="Foreign Amount"
        class="list-group-item"
      />
      <AttributeCell
        key="amount"
        :detail-text="transactionAmountValue"
        left-text="Amount"
        class="list-group-item"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="creationDate"
        :detail-text="transactionCreationDate"
        left-text="Creation Date"
        class="list-group-item"
      />
      <AttributeCell
        key="settlementDate"
        v-if="transactionSettlementDate"
        :detail-text="transactionSettlementDate"
        left-text="Settlement Date"
        class="list-group-item"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="parentCategory"
        v-if="parentCategory"
        :detail-text="parentCategory?.attributes?.name"
        left-text="Parent Category"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByCategory(parentCategory)"
      />
      <AttributeCell
        key="category"
        v-if="category"
        :detail-text="category?.attributes?.name"
        left-text="Category"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByCategory(category)"
      />
    </transition-group>
    <transition-group
      v-if="transaction.relationships.tags.data.length !== 0"
      class="list-group"
      name="flip-list"
      tag="ul"
    >
      <AttributeCell
        key="tags"
        :detail-text="transaction.relationships.tags.data.length.toString()"
        left-text="Tags"
        class="list-group-item list-group-item-action"
        @click="listTransactionTags"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import Spinner from "@/components/Spinner.vue";
import AttributeCell from "@/components/AttributeCell.vue";

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

import { Options, Vue } from "vue-class-component";
import TransactionResource from "@/UpAPI/TransactionResource";
import HoldInfoObject from "@/UpAPI/HoldInfoObject";
import MoneyObject from "@/UpAPI/MoneyObject";
import AccountResource from "@/UpAPI/AccountResource";
import CategoryResource from "@/UpAPI/CategoryResource";

@Options({
  components: { Spinner, AttributeCell },
  data() {
    return {
      transaction: null as unknown as TransactionResource,
      error: null,
      account: null as unknown as AccountResource,
      transferAccount: null as unknown as AccountResource,
      category: null as unknown as CategoryResource,
      parentCategory: null as unknown as CategoryResource,
    };
  },
  computed: {
    transactionId(): string {
      return this.$route.params.transaction;
    },
    accountId(): string {
      return this.transaction.relationships.account.data.id;
    },
    transferAccountId(): string | null {
      return this.transaction.relationships.transferAccount.data?.id;
    },
    categoryId(): string | null {
      return this.transaction.relationships.category.data?.id;
    },
    parentCategoryId(): string | null {
      return this.transaction.relationships.parentCategory.data?.id;
    },
    holdInfo(): HoldInfoObject | null {
      return this.transaction.attributes.holdInfo;
    },
    foreignAmount(): MoneyObject | null {
      return this.transaction.attributes.foreignAmount;
    },
    transactionAmount(): MoneyObject {
      return this.transaction.attributes.amount;
    },
    transactionHoldValue(): string | null {
      if (
        this.holdInfo &&
        this.holdInfo?.amount.value !== this.transactionAmount.value
      ) {
        return this.formatAmount(
          this.holdInfo.amount.currencyCode,
          this.holdInfo.amount.value
        );
      } else {
        return null;
      }
    },
    transactionHoldForeignValue(): string | null {
      if (
        this.holdInfo?.foreignAmount &&
        this.holdInfo?.foreignAmount?.value !== this.foreignAmount?.value
      ) {
        return this.formatAmount(
          this.holdInfo.foreignAmount.currencyCode,
          this.holdInfo.foreignAmount.value
        );
      } else {
        return null;
      }
    },
    transactionForeignValue(): string | null {
      if (this.foreignAmount) {
        return this.formatAmount(
          this.foreignAmount.currencyCode,
          this.foreignAmount.value
        );
      } else {
        return null;
      }
    },
    transactionAmountValue(): string {
      return this.formatAmount(
        this.transactionAmount.currencyCode,
        this.transactionAmount.value
      );
    },
    transactionCreationDate(): string {
      return this.formatDate(this.transaction.attributes.createdAt);
    },
    transactionSettlementDate(): string | null {
      if (this.transaction.attributes.settledAt) {
        return this.formatDate(this.transaction.attributes.settledAt);
      } else {
        return null;
      }
    },
  },
  methods: {
    getTransaction(): void {
      axios
        .get(
          `https://api.up.com.au/api/v1/transactions/${this.transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.apiKey}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.transaction = response.data.data;
          this.getAccount();
          if (this.transferAccountId) {
            this.getTransferAccount();
          }
          if (this.categoryId) {
            this.getCategory();
          }
          if (this.parentCategoryId) {
            this.getParentCategory();
          }
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    getAccount(): void {
      axios
        .get(`https://api.up.com.au/api/v1/accounts/${this.accountId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.account = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getTransferAccount(): void {
      axios
        .get(
          `https://api.up.com.au/api/v1/accounts/${this.transferAccountId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.apiKey}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.transferAccount = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCategory(): void {
      axios
        .get(`https://api.up.com.au/api/v1/categories/${this.categoryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.category = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getParentCategory(): void {
      axios
        .get(
          `https://api.up.com.au/api/v1/categories/${this.parentCategoryId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.apiKey}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.parentCategory = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    listTransactionsByAccount(account: AccountResource): void {
      this.$router.push({
        name: "Transactions By Account",
        params: {
          account: account.id,
        },
      });
    },
    listTransactionsByCategory(category: CategoryResource): void {
      this.$router.push({
        name: "Transactions By Category",
        params: {
          category: category.id,
        },
      });
    },
    listTransactionTags(): void {
      this.$router.push({
        name: "Transaction Tags",
      });
    },
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
  mounted() {
    this.getTransaction();
  },
})
export default class TransactionDetail extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

.list-group-item-action:hover {
  cursor: pointer;
}

.list-group {
  margin-bottom: 15px;
}

#transactionDetail {
  margin: 15px;
}
</style>
