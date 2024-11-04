import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "src/app/store";
import {updateExpense } from "../../../features/expenses/expenseSlice";
import { Expense, ExpenseDocument } from "../../../types/types";
import { MdClose } from "react-icons/md";


interface EditTransactionProps {
    expense : ExpenseDocument;
    onClose: () => void;
}

type ExpenseDocumentForm = Pick<ExpenseDocument, 'text' | 'type' | 'amount' | 'customDate'>

const EditTransaction: React.FC<EditTransactionProps> = ({expense, onClose}) => {

    const [expenseForm, setExpenseForm] = useState<ExpenseDocumentForm>({
        text : expense.text, 
        type : expense.type, 
        customDate : expense.customDate, 
        amount : expense.amount
    })


    const dispatch = useDispatch<AppDispatch>();
    const n = useNavigate();
  
    const { settings } = useSelector((state: RootState) => state.settings);
  
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      let isoDate = "";
      if (expenseForm.customDate) {
        const parsedDate = new Date(expenseForm.customDate);
        if (!isNaN(parsedDate.getTime())) {
          isoDate = parsedDate.toISOString();
        } else {
          toast.error("Invalid date");
          return;
        }
      }
    
      const updatedExpenseData  : Expense = {
        ...expenseForm,
        customDate: isoDate,
        user : expense.user, 
      };
    
      try {
        await dispatch(
          updateExpense({ id: expense._id, expenseData: updatedExpenseData })
        ).unwrap();
        toast.success(`Updated ${expenseForm.type}: ${expenseForm.text}`);
        onClose(); // Close the modal after updating
      } catch (error) {
        toast.error("Failed to update expense");
      }
    };

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="absolute top-6 right-14 cursor-pointer" onClick={onClose}><MdClose/></div>
        <div className="w-full max-w-sm bg-base-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Expense
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="text"
                id="text"
                value={expenseForm.text}
                placeholder="Enter name"
                onChange={(e) => setExpenseForm(prev=>({...prev, text : e.target.value}))}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={expenseForm.amount || ""}
                onChange={(e) => setExpenseForm(prev=>({...prev, amount : Number(e.target.value)}))}
                placeholder={`Enter amount (${settings.currency})`}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Custom Date
              </label>
              <input
                id="default-datepicker"
                type="date"
                placeholder="Select date"
                value={expenseForm.customDate || ""}
                onChange={(e) => setExpenseForm(prev=>({...prev, customDate : e.target.value}))}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Type
              </label>
              <select
                name="type"
                id="type"
                value={expenseForm.type}
                onChange={(e) =>  setExpenseForm(prev=>({...prev, type : e.target.value as Expense["type"]}))}
                className="select select-bordered w-full max-w-xs"
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn w-full btn-primary"
              disabled={!expenseForm.text || !expenseForm.amount || !expenseForm.type}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
