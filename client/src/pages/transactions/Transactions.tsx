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
  }

  return (
    <div>
      {/* <button style={{
        position : "absolute", 
        top : "100px", 
        left : "100px", 
        zIndex : 100, 
        border : "2px solid black"
      }} onClick={handleReloadExpenses}>Reload</button> */}

      {sortedExpenses.length > 0 ? (
        <div className="flex justify-center items-center mt-24">
          <ul className="divide-y divide-gray-200 w-4/5 max-w-6xl  dark:divide-gray-700">
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
