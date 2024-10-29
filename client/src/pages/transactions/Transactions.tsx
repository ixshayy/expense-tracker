import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import ExpenseItem from "../../components/ExpenseItem";
import { ExpenseDocument } from "src/types/types";

const Transactions: React.FC = () => {

    console.log("transactions component rendered");
    const { expenses } = useSelector(
        (state: RootState) => state.expenses,
      );

  const sortedExpenses = [...(expenses as ExpenseDocument[])].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  console.log("expense", sortedExpenses);

  return (
    <div>
      <p className="mb-2 ml-2">Recent Transactions</p>
      {sortedExpenses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedExpenses.map((expense) => (
            <ExpenseItem key={expense._id} expense={expense} />
          ))}
        </div>
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};

export default Transactions;
