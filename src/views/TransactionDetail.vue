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
        @click="listTransactionsByAccount(account.id)"
      />
      <AttributeCell
        key="transferAccount"
        v-if="transferAccount"
        :detail-text="transferAccount?.attributes?.displayName"
        left-text="Transfer Account"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByAccount(transferAccount.id)"
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
        @click="listTransactionsByCategory(parentCategory.id)"
      />
      <AttributeCell
        key="category"
        v-if="category"
        :detail-text="category?.attributes?.name"
        left-text="Category"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByCategory(category.id)"
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

@Options({
  components: { Spinner, AttributeCell },
  data() {
    return {
      transaction: null,
      error: null,
      account: null,
      transferAccount: null,
      category: null,
      parentCategory: null,
    };
  },
  computed: {
    transactionId() {
      return this.$route.params.transaction;
    },
    accountId() {
      return this.transaction.relationships.account.data.id;
    },
    transferAccountId() {
      return this.transaction.relationships.transferAccount.data?.id;
    },
    categoryId() {
      return this.transaction.relationships.category.data?.id;
    },
    parentCategoryId() {
      return this.transaction.relationships.parentCategory.data?.id;
    },
    holdInfo() {
      return this.transaction.attributes.holdInfo;
    },
    foreignAmount() {
      return this.transaction.attributes.foreignAmount;
    },
    transactionAmount() {
      return this.transaction.attributes.amount;
    },
    transactionHoldValue() {
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
    transactionHoldForeignValue() {
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
    transactionForeignValue() {
      if (this.foreignAmount) {
        return this.formatAmount(
          this.foreignAmount.currencyCode,
          this.foreignAmount.value
        );
      } else {
        return null;
      }
    },
    transactionAmountValue() {
      return this.formatAmount(
        this.transactionAmount.currencyCode,
        this.transactionAmount.value
      );
    },
    transactionCreationDate() {
      return this.formatDate(this.transaction.attributes.createdAt);
    },
    transactionSettlementDate() {
      if (this.transaction.attributes.settledAt) {
        return this.formatDate(this.transaction.attributes.settledAt);
      } else {
        return null;
      }
    },
  },
  methods: {
    getTransaction() {
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
    getAccount() {
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
    getTransferAccount() {
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
    getCategory() {
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
    getParentCategory() {
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
    listTransactionsByAccount(account: string) {
      this.$router.push({
        name: "Transactions By Account",
        params: {
          account: account,
        },
      });
    },
    listTransactionsByCategory(category: string) {
      this.$router.push({
        name: "Transactions By Category",
        params: {
          category: category,
        },
      });
    },
    listTransactionTags() {
      this.$router.push({
        name: "Transaction Tags",
      });
    },
    formatDate(date: string) {
      if (this.$store.state.relativeDates) {
        return dayjs().to(dayjs(date));
      } else {
        return dayjs(date).tz("Australia/Sydney").format("lll");
      }
    },
    formatAmount(currencyCode: string, amount: string) {
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
