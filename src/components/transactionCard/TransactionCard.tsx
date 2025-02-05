import { useState } from "react";
import { transaction } from "../../common/types/global"
import formatDate from "../../helpers/formatDate/formatDate"
import DeleteTransactionButton from "../DeleteTransactionButton/DeleteTransactionButton";
import TransactionComment from "../TransactionComment/TransactionComment";
import Image from "next/image"
import { DayPickerModal } from "../DayPickerModal/DayPickerModal";

interface TransactionCardProps {
  transaction: transaction,
  editDate?: boolean
}

const TransactionCard: React.FC<TransactionCardProps> = (props: TransactionCardProps) => {
  const [showComment, setShowComment] = useState(false)

  const {transaction, editDate = true} = props;

  const handleShowComment = (value: boolean) => {
    setShowComment(value)
  }

  return (
    <div className="border p-1 rounded mb-2 border-black">
      <div className="flex justify-between">
        <div>
          {editDate ? <DayPickerModal transactionId={transaction.id}>
            <h4>{formatDate(transaction.createdAt)}</h4>
          </DayPickerModal> : <h4>{formatDate(transaction.createdAt)}</h4>}
        </div>
        <div className="flex items-center gap-2">
          {transaction.comment && 
            <div className="h-5">
              <button onClick={e => setShowComment(true)}>
                <Image
                  src="/icons/comment-icon.svg"
                  alt="Comment icon"
                  height={20}
                  width={20}
                />
              </button>
              <TransactionComment comment={transaction.comment} show={showComment} setCommentState={handleShowComment} />
            </div>}
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      </div>
      <span>{transaction.category.name}</span>
      <span>{transaction.deducted}</span>
      <p>Ammount: <span className={`${transaction.deducted ? "text-red-300" : "text-green-300"}`}>{transaction.deducted === false && "+"}{transaction.amount}$</span></p>
    </div>
  )
}

export default TransactionCard;