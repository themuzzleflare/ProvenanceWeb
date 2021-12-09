<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <Spinner v-else-if="!transaction" />
  <div v-else id="transactionDetail">
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="status"
        :detail-text="transactionStatus"
        class="list-group-item"
        left-text="Status"
      />
      <AttributeCell
        key="account"
        :detail-text="account?.attributes?.displayName"
        class="list-group-item list-group-item-action"
        left-text="Account"
        @click="listTransactionsByAccount(account)"
      />
      <AttributeCell
        v-if="transferAccount"
        key="transferAccount"
        :detail-text="transferAccount?.attributes?.displayName"
        class="list-group-item list-group-item-action"
        left-text="Transfer Account"
        @click="listTransactionsByAccount(transferAccount)"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="description"
        :detail-text="transaction?.attributes?.description"
        class="list-group-item"
        left-text="Description"
      />
      <AttributeCell
        v-if="transaction?.attributes?.rawText"
        key="rawText"
        :detail-text="transaction?.attributes?.rawText"
        class="list-group-item"
        left-text="Raw Text"
      />
      <AttributeCell
        v-if="
          transaction?.attributes?.message &&
          transaction?.attributes?.message !== ''
        "
        key="message"
        :detail-text="transaction?.attributes?.message"
        class="list-group-item"
        left-text="Message"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        v-if="transactionHoldValue"
        key="holdAmount"
        :detail-text="transactionHoldValue"
        class="list-group-item"
        left-text="Hold Amount"
      />
      <AttributeCell
        v-if="transactionHoldForeignValue"
        key="holdForeignAmount"
        :detail-text="transactionHoldForeignValue"
        class="list-group-item"
        left-text="Hold Foreign Amount"
      />
      <AttributeCell
        v-if="transactionForeignValue"
        key="foreignAmount"
        :detail-text="transactionForeignValue"
        class="list-group-item"
        left-text="Foreign Amount"
      />
      <AttributeCell
        key="amount"
        :detail-text="transactionAmountValue"
        class="list-group-item"
        left-text="Amount"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="creationDate"
        :detail-text="transactionCreationDate"
        class="list-group-item"
        left-text="Creation Date"
      />
      <AttributeCell
        v-if="transactionSettlementDate"
        key="settlementDate"
        :detail-text="transactionSettlementDate"
        class="list-group-item"
        left-text="Settlement Date"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        v-if="parentCategory"
        key="parentCategory"
        :detail-text="parentCategory?.attributes?.name"
        class="list-group-item list-group-item-action"
        left-text="Parent Category"
        @click="listTransactionsByCategory(parentCategory)"
      />
      <AttributeCell
        v-if="category"
        key="category"
        :detail-text="category?.attributes?.name"
        class="list-group-item list-group-item-action"
        left-text="Category"
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
        class="list-group-item list-group-item-action"
        left-text="Tags"
        @click="listTransactionTags"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageNotFound from "@/views/PageNotFound.vue";
import Spinner from "@/components/Spinner.vue";
import AttributeCell from "@/components/AttributeCell.vue";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TransactionResource from "@/UpAPI/TransactionResource";
import HoldInfoObject from "@/UpAPI/HoldInfoObject";
import MoneyObject from "@/UpAPI/MoneyObject";
import AccountResource from "@/UpAPI/AccountResource";
import CategoryResource from "@/UpAPI/CategoryResource";
import { mapActions, mapMutations, mapState } from "vuex";

dayjs.extend(utc);
dayjs.extend(timezone);

export default defineComponent({
  name: "TransactionDetail",
  components: { PageNotFound, Spinner, AttributeCell },
  data() {
    return {
      transaction: null as unknown as TransactionResource,
      error: null as unknown as Error,
      account: null as unknown as AccountResource,
      transferAccount: null as unknown as AccountResource,
      category: null as unknown as CategoryResource,
      parentCategory: null as unknown as CategoryResource,
    };
  },
  watch: {
    transaction(newValue: TransactionResource): void {
      this.pageTitle(newValue.attributes.description);
    },
    error(newValue: Error): void {
      this.pageTitle(newValue.name);
      this.pageDescription(newValue.message);
    },
  },
  computed: {
    transactionId(): string | string[] {
      return this.$route.params.transaction;
    },
    accountId(): string {
      return this.transaction.relationships.account.data.id;
    },
    transferAccountId(): string | undefined {
      return this.transaction.relationships.transferAccount.data?.id;
    },
    categoryId(): string | undefined {
      return this.transaction.relationships.category.data?.id;
    },
    parentCategoryId(): string | undefined {
      return this.transaction.relationships.parentCategory.data?.id;
    },
    transactionStatus(): string {
      return this.transaction.attributes.status
        .replace("SETTLED", "Settled")
        .replace("HELD", "Held");
    },
    holdInfo(): HoldInfoObject | undefined {
      return this.transaction.attributes.holdInfo;
    },
    foreignAmount(): MoneyObject | undefined {
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
      return this.foreignAmount
        ? this.formatAmount(
            this.foreignAmount.currencyCode,
            this.foreignAmount.value
          )
        : null;
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
      return this.transaction.attributes.settledAt
        ? this.formatDate(this.transaction.attributes.settledAt)
        : null;
    },
    ...mapState(["relativeDates"]),
  },
  methods: {
    getTransaction(): void {
      this.fetchTransaction(this.transactionId)
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
      this.fetchAccount(this.accountId)
        .then((response) => {
          console.log(response.data);
          this.account = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getTransferAccount(): void {
      this.$http
        .get(`/accounts/${this.transferAccountId}`)
        .then((response) => {
          console.log(response.data);
          this.transferAccount = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCategory(): void {
      this.$http
        .get(`/categories/${this.categoryId}`)
        .then((response) => {
          console.log(response.data);
          this.category = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getParentCategory(): void {
      this.$http
        .get(`/categories/${this.parentCategoryId}`)
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
    ...mapMutations({
      pageTitle: "setPageTitle",
      pageDescription: "setPageDescription",
    }),
    ...mapActions({
      fetchTransaction: "getTransaction",
      fetchAccount: "getAccount",
    }),
  },
  mounted() {
    this.getTransaction();
  },
});
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
