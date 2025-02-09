import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { deleteExpense } from "../../features/expenses/expenseSlice";
import { ExpenseDocument } from "src/types/types";
import { formatCurrency } from "../../utils/currencyFormatter";
import { FaRupeeSign, FaRegEdit } from "react-icons/fa";

interface ExpenseItemProps {
  expense: ExpenseDocument;
  index : number;
  toggleEditTransactionPage: (expense: ExpenseDocument | null) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, index, toggleEditTransactionPage }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  const handleEdit = () => {
    toggleEditTransactionPage(expense); // Pass specific expense data
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
          {index + 1}.
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate ">
            {expense.text}
          </p>
          {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {expense.text}
          </p> */}
        </div>
        <div className={`inline-flex items-center text-base font-semibold  ${expense.type === "expense" ? "text-error" : "text-success"}`}>
        {expense.type === "expense" ? "-" : "+"}
        {formatCurrency(expense.amount)}
        </div>
        <div className="inline-flex items-center text-base font-semibold ">
        <button onClick={handleEdit} data-modal-target="crud-modal" data-modal-toggle="crud-modal"className=" btn btn-warning btn-sm mt-2 me-2">
            <FaRegEdit size={14} />
          </button> 
          <button onClick={handleDelete} className="btn btn-error btn-sm mt-2">
            <FaTrashCan size={14} />
          </button>
        </div>
      </div>
    </li>
  );
};


export default ExpenseItem;