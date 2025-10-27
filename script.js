// GLOBAL VARIABLES //
const BANK_NAME = "My Bank Inc."; // Global variable
const CURRENCY = "₦"; // Currency symbol

// Bank List //
const bankList = [
  {
    bank: "First Bank of Nigeria",
    customers: [
      { accNo: 2001, name: "Alice Ogunjimi", bal: 8500, type: "Savings" },
      { accNo: 2002, name: "John Bello", bal: 3200, type: "Current" },
    ],
  },
  {
    bank: "Zenith Bank",
    customers: [
      { accNo: 3001, name: "Grace Eze", bal: 15000, type: "Savings" },
      { accNo: 3002, name: "Bayo Adebayo", bal: 2500, type: "Current" },
    ],
  },
  {
    bank: "Access Bank",
    customers: [
      { accNo: 4001, name: "Ifeanyi Okoro", bal: 5200, type: "Savings" },
      { accNo: 4002, name: "Amaka Obi", bal: 7200, type: "Current" },
    ],
  },
];


// Find user account across all banks //

function findBank(userAccNo) {
  const foundBank = bankList.find((bank) =>
    bank.customers.find((cust) => cust.accNo === userAccNo)
  );
  if (!foundBank) return null;

  const account = foundBank.customers.find(
    (cust) => cust.accNo === userAccNo
  );
  return { bank: foundBank.bank, account };
}

// Check balance //
function checkBalance(accNo) {
  const result = findBank(accNo);
  if (result) {
    console.log(
      `[${result.bank}] ${result.account.name}'s balance is ${CURRENCY}${result.account.bal.toFixed(
        2
      )}`
    );
  } else {
    console.log("Account not found!");
  }
}

// Deposit money //
function deposit(accNo, amount) {
  const result = findBank(accNo);
  if (!result) return console.log("Account not found!");
  if (amount <= 0) return console.log("Deposit amount must be greater than zero.");

  result.account.bal += amount;
  console.log(
    `[${BANK_NAME}] Deposit of ${CURRENCY}${amount.toFixed(
      2
    )} successful for ${result.account.name} at ${result.bank}.`
  );
  console.log(`New balance: ${CURRENCY}${result.account.bal.toFixed(2)}`);
}

// Withdraw money //
function withdraw(accNo, amount) {
  const result = findBank(accNo);
  if (!result) return console.log("Account not found!");
  if (amount <= 0) return console.log("Withdrawal amount must be greater than zero.");

  const FEE_RATE = 0.01; // Local variable (1% fee)
  const fee = amount * FEE_RATE;

  if (amount + fee > result.account.bal) {
    console.log(`[${result.bank}] Insufficient funds for ${result.account.name}.`);
    console.log(
      `Tried to withdraw ${CURRENCY}${amount.toFixed(
        2
      )} + fee ${CURRENCY}${fee.toFixed(2)} but only has ${CURRENCY}${result.account.bal.toFixed(
        2
      )}.`
    );
  } else {
    result.account.bal -= amount + fee;
    console.log(
      `[${result.bank}] Withdrawal of ${CURRENCY}${amount.toFixed(
        2
      )} (Fee: ${CURRENCY}${fee.toFixed(
        2
      )}) successful for ${result.account.name}.`
    );
    console.log(`New balance: ${CURRENCY}${result.account.bal.toFixed(2)}`);
  }
}

// DEMONSTRATION SECTION //
console.log(`Welcome to ${BANK_NAME}`);
console.log("INITIAL BALANCES");
checkBalance(2001);
checkBalance(3001);
checkBalance(4002);

console.log("DEPOSIT");
deposit(2001, 2000); // Alice deposits ₦2000

console.log("WITHDRAWAL (SUCCESS)");
withdraw(3001, 5000); // Grace withdraws ₦5000

console.log("WITHDRAWAL (FAILURE)");
withdraw(4002, 20000); // Amaka tries to withdraw too much

console.log("FINAL BALANCES");
checkBalance(2001);
checkBalance(3001);
checkBalance(4002);

// SCOPE TEST //
console.log("SCOPE TEST");
try {
  console.log(FEE_RATE);
} catch (error) {
console.log("You no fit access FEE_RATE outside withdraw() — e dey local for that function only ");
}
