import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { deleteExpense } from "../../features/expenses/expenseSlice";
import { ExpenseDocument } from "src/types/types";
import { formatCurrency } from "../../utils/currencyFormatter";

interface ExpenseItemProps {
  expense: ExpenseDocument;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  // Determine which date to use
  const dateToUse = expense.customDate
    ? new Date(expense.customDate)
    : new Date(expense.createdAt);
  const isValidDate = !isNaN(dateToUse.getTime());

  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-1.jpg"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {expense.type}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {expense.text}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        {expense.type === "expense" ? "-" : "+"}
        {formatCurrency(expense.amount)}
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <button onClick={handleDelete} className="btn btn-error btn-sm mt-2">
            <FaTrashCan size={16} /> Delete
          </button>
        </div>
      </div>
    </li>
  );
};


export default ExpenseItem;