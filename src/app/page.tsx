import CategoryGroupFormWrapper from "@/components/CategoryGroupFormWrapper/CategoryGroupFormWrapper";
import AddTransaction from "@/components/addTransaction/addTransaction";
import TransactionList from "@/components/transactionList/transactionList";

export default function Home() {
  return (
    <div>
      <AddTransaction />
      <CategoryGroupFormWrapper />
      <TransactionList />
    </div>
  );
}
