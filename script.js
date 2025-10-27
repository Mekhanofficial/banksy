// GLOBAL VARIABLES //
const BANK_NAME = "My Bank Inc."; // Global variable
const CURRENCY = "₦"; // Currency symbol

// ACCOUNT DATA STRUCTURE
const customerAccounts = [
  {
    accountId: 1001,
    accountHolder: "Ruky Ogunjimi",
    balance: 500.0,
    type: "Savings",
  },
  {
    accountId: 1002,
    accountHolder: "Emeka Bello",
    balance: 1200.0,
    type: "Checking",
  },
  {
    accountId: 1003,
    accountHolder: "Amaka Udo",
    balance: 2000.0,
    type: "Savings",
  },
  {
    accountId: 1004,
    accountHolder: "Tunde Afolabi",
    balance: 750.0,
    type: "Checking",
  },
];

// CORE FUNCTIONS //

// Find account by ID
function findAccount(accountId) {
  return customerAccounts.find((acc) => acc.accountId === accountId) || null;
}

// Check balance
function checkBalance(accountId) {
  const account = findAccount(accountId);
  if (!account) {
    console.log(`Account ${accountId} not found.`);
    return;
  }
  console.log(
    `${account.accountHolder}'s balance is ${CURRENCY}${account.balance.toFixed(
      2
    )}`
  );
}

// Deposit funds
function deposit(accountId, amount) {
  const account = findAccount(accountId);
  if (!account) {
    console.log("Account not found!");
    return;
  }
  if (amount <= 0) {
    console.log("Deposit amount must be greater than zero.");
    return;
  }

  account.balance += amount;
  console.log(
    `[${BANK_NAME}] Deposit of ${CURRENCY}${amount.toFixed(2)} successful for ${
      account.accountHolder
    }.`
  );
  console.log(`New balance: ${CURRENCY}${account.balance.toFixed(2)}`);
}

// Withdraw funds
function withdraw(accountId, amount) {
  const account = findAccount(accountId);
  if (!account) {
    console.log("Account not found!");
    return;
  }
  if (amount <= 0) {
    console.log("Withdrawal amount must be greater than zero.");
    return;
  }

  const FEE_RATE = 0.01; // Local variable
  const fee = amount * FEE_RATE;
  const total = amount + fee;

  if (total > account.balance) {
    console.log(
      `Insufficient funds! Tried to withdraw ${CURRENCY}${amount.toFixed(
        2
      )} + fee ${CURRENCY}${fee.toFixed(
        2
      )} but only has ${CURRENCY}${account.balance.toFixed(2)}.`
    );
  } else {
    account.balance -= total;
    console.log(
      `Withdrawal of ${CURRENCY}${amount.toFixed(
        2
      )} (Fee: ${CURRENCY}${fee.toFixed(2)}) successful for ${
        account.accountHolder
      }.`
    );
    console.log(`New balance: ${CURRENCY}${account.balance.toFixed(2)}`);
  }
}

// DEMONSTRATION //
console.log(`Welcome to ${BANK_NAME}`);
console.log("INITIAL BALANCES");
checkBalance(1001);
checkBalance(1002);
checkBalance(1003);
checkBalance(1004);

console.log("DEPOSIT ");
deposit(1001, 250); // Deposit ₦250 into Ruky's account

console.log("WITHDRAWAL (SUCCESS) ");
withdraw(1001, 100); // Withdraw ₦100 from Ruky

console.log("WITHDRAWAL (FAILURE) ");
withdraw(1002, 5000); // Try to withdraw too much from Emeka

console.log(" FINAL BALANCES ");
checkBalance(1001);
checkBalance(1002);
checkBalance(1003);
checkBalance(1004);

console.log(" SCOPE TEST ");
try {
  console.log(FEE_RATE);
} catch (error) {
  console.log(
    "Cannot access FEE_RATE outside withdraw() — it is locally scoped only."
  );
}
