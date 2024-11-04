import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/app/store";
import ExpenseItem from "../../components/expense/ExpenseItem";
import { ExpenseDocument } from "src/types/types";
import { getExpenses , reset} from "../../features/expenses/expenseSlice";
import EditTransaction from "../../components/transactions/edit/EditTransaction";
import { useNavigate } from "react-router-dom";


const Transactions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [editExpense, setEditExpense] = useState<ExpenseDocument | null>(null); // Track specific expense to edit
  const { user } = useSelector((state: RootState) => state.auth);

  const { expenses, isLoading, isError, message } = useSelector(
    (state: RootState) => state.expenses,
  );
  const navigate = useNavigate();

  useEffect(() => {

    if (!user) {
      navigate("/login");
    }
    dispatch(getExpenses({} as ExpenseDocument));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch, message]);




  const sortedExpenses = [...(expenses as ExpenseDocument[])].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  console.log("sorted expense", sortedExpenses);

  const handleReloadExpenses = () => {
    dispatch(getExpenses({} as ExpenseDocument));
  };

  const toggleEditTransactionPage = (expense: ExpenseDocument | null) => {
    setEditExpense(expense); // Set selected expense for editing
  };

  return (
    <>
      {sortedExpenses.length > 0 ? (
        <>
          <div className="flex justify-center items-center mt-24">
            <ul className="divide-y divide-gray-200 w-4/5 max-w-6xl  dark:divide-gray-700">
              {sortedExpenses.map((expense, index) => (
                
                  <ExpenseItem
                    key={expense._id}
                    expense={expense}
                    index={index}
                    toggleEditTransactionPage={toggleEditTransactionPage}
                  />
                
              ))}
            </ul>
          </div>
          {editExpense && (
            <EditTransaction
              expense={editExpense}
              onClose={() => setEditExpense(null)} // Close modal on cancel or save
            />
          )}
        </>
      ) : (
        <p>No expenses found</p>
      )}
    </>
  );
};

export default Transactions;
