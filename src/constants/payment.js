export const PAYMENT_METHODS = {
  MANAGER: "manager",
  LIQPAY: "liqpay",
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.MANAGER]: "Оплата після дзвінка менеджера",
  [PAYMENT_METHODS.LIQPAY]: "Оплата онлайн через LiqPay",
};

export const PAYMENT_STATUSES = ["unpaid", "pending", "paid", "failed", "refunded"];

export const PAYMENT_STATUS_LABELS = {
  unpaid: "Не оплачено",
  pending: "Ожидание платежа",
  paid: "Оплачено",
  failed: "Платёж не прошёл",
  refunded: "Возврат средств",
};
