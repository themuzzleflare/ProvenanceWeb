/*
 * Copyright © 2024 Paul Tavitian.
 */

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TransactionCell from '../TransactionCell.vue'

import { sampleTransactionResource } from '@/upapi/TransactionResource'

describe('TransactionCell', () => {
  it('renders properly', () => {
    const wrapper = mount(TransactionCell, { props: { transaction: sampleTransactionResource } })
    expect(wrapper.text()).toContain('Amcal Pharmacy')
  })
})
