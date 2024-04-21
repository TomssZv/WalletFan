import { BalanceStoreProvider } from "@/providers/balanceStoreProvider";
import Balance from "../balance/balance";

const TopBar: React.FC = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance/get`);

  if (response.status === 500) {

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/balance/set`,
      {
        method: "POST"
      }
    )
  }

  let balance = await response.json();

  if (typeof balance === "object") {
    balance = null;
  }

  return (
    <div>
      <BalanceStoreProvider>
        {balance ?
          <Balance
            balance={balance}
          /> :
          <span>Loading...</span>
        }
      </BalanceStoreProvider>
    </div>
  )
}

export default TopBar;