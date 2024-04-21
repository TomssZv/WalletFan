import { transactionApiItem } from "../../common/types/global"
import formatDate from "../../helpers/formatDate/formatDate"

interface TransactionCardProps {
  transaction: transactionApiItem
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => (
  <div className="border p-1 rounded mb-2 border-black">
    <h4>{formatDate(transaction.createdAt)}</h4>
    <span>{transaction.category.name}</span>
    <span>{transaction.deducted}</span>
    <p>Ammount: <span className={`${transaction.deducted ? "text-red-300" : "text-green-300"}`}>{transaction.deducted ? "-" : "+"}{transaction.amount}$</span></p>
  </div>
)

export default TransactionCard;