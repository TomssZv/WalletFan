import { ReactNode, useEffect, useId, useRef, useState } from "react";
import toast from "react-hot-toast"
import { DayPicker } from "react-day-picker";
import { useTransactionStore } from "@/providers/transactionStoreProvider";
// @ts-ignore
import styles from "./DayPickerModal.css"

interface DayPickerModalChildren {
  children: ReactNode;
  transactionId: number,
}

export function DayPickerModal({ transactionId, children }: DayPickerModalChildren) {
  const { refech, refechTransactions } = useTransactionStore((state) => state,);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hold the dialog visibility in state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to toggle the dialog visibility
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const dialogStyle = {
    "rdp-caption": "display-flex"
  }

  // Hook to handle the body scroll behavior and focus trapping.
  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }
    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  /**
   * Function to handle the DayPicker select event: update the input value and
   * the selected date, and set the month.
   */
  const handleDayPickerSelect = async (date: Date) => {
    if (!date) {
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      const updateTransaction = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: transactionId,
          attribute: 'createdAt',
          value: date,
        })
      })
  
      if (updateTransaction.status === 200) {
        toast.success("Transaction succesfully added!")
        refechTransactions(!refech)
        dialogRef.current?.close();
        return
      }
  
      toast.error("Failed to add transaction!")
    }
    dialogRef.current?.close();
  };

  return (
    <div>
      <button
        style={{ fontSize: "inherit" }}
        onClick={toggleDialog}
        aria-controls="dialog"
        aria-haspopup="dialog"
        aria-expanded={isDialogOpen}
        aria-label="Open calendar to choose booking date"
      >
        {children}
      </button>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        onClose={() => setIsDialogOpen(false)}
      >
        <DayPicker
          month={month}
          classNames={styles}
          onMonthChange={setMonth}
          initialFocus
          mode="single"
          selected={selectedDate}
          // @ts-ignore
          onSelect={handleDayPickerSelect}
          footer={
            <p aria-live="assertive" aria-atomic="true">
              {selectedDate !== undefined && (
                <>Selected: {selectedDate.toDateString()}</>
              )}
            </p>
          }
        />
      </dialog>
    </div>
  );
}