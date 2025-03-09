import React, { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/accounts";
import NotFound from "@/app/not-found";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "./_components/transaction-table";
import { AccountChart } from "./_components/account-chart";
import Decimal from "decimal.js"; // Import Decimal.js to handle the Decimal type

const AccountPage = async ({ params }) => {
  const { id } = params;
  // Fetch account data with transactions
  const accountData = await getAccountWithTransactions(id);

  // If no account data is found, show a NotFound page
  if (!accountData) {
    return NotFound();
  }

  const { transactions, ...account } = accountData;

  // Convert Decimal amounts to Numbers in transactions
  const formattedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      amount: new Decimal(transaction.amount).toNumber(), // Convert the amount to a Number
    };
  });

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={formattedTransactions}></AccountChart>
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={formattedTransactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
