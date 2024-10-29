import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/app/store";
import ExpenseItem from "../../components/expense/ExpenseItem";
import { ExpenseDocument } from "src/types/types";
import { getExpenses } from "../../features/expenses/expenseSlice";

const Transactions: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    console.log("transactions component rendered");

  useEffect(() => {
    dispatch(getExpenses({} as ExpenseDocument));
  }, [dispatch]);

  const { expenses } = useSelector(
    (state: RootState) => state.expenses,
  );
  console.log("expense ", expenses);


  const sortedExpenses = [...(expenses as ExpenseDocument[])].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  console.log("sorted expense", sortedExpenses);

  const handleReloadExpenses = () => {
    dispatch(getExpenses({} as ExpenseDocument));
    console.log("clicked");
  }

  return (
    <div>
      <button style={{
        position : "absolute", 
        top : "100px", 
        left : "100px", 
        zIndex : 100, 
        border : "2px solid black"
      }} onClick={handleReloadExpenses}>Reload</button>
      <p className="mb-2 ml-2">Recent Transactions</p>
      {sortedExpenses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {sortedExpenses.map((expense) => (
            <ExpenseItem key={expense._id} expense={expense} />
          ))}
          </ul>
          
          {/* {sortedExpenses.map((expense) => (
            <ExpenseItem key={expense._id} expense={expense} />
          ))} */}
        </div>
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};

export default Transactions;
