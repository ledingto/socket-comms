const orderStatuses = {
  PENDING: "pending",
  PAYMENT_SUCCEEDED: "payment succeeded",
  SHIPPED: "shipped",
  REFUND: "refund",
  COMPLETE: "complete"
}

const ordersByCustomerId = {
  "123": [
    {
      order_id: "some-order-id-3",
      status: orderStatuses.PENDING
    },
    {
      order_id: "some-order-id-1",
      status: orderStatuses.COMPLETE
    }
  ],
  "456": [
    {
      order_id: "some-order-id-2",
      status: orderStatuses.PAYMENT_SUCCEEDED
    }
  ]
}

module.exports = {
    ordersByCustomerId,
    orderStatuses
}
