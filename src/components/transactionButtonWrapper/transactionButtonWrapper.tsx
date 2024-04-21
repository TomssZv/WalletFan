import { ReactNode } from "react";

interface TransactionButtonWrapperProps {
  children: ReactNode
}

const TransactionButtonWrapper: React.FC<TransactionButtonWrapperProps> = ({ children }) => {
  return (
    <div className="border border-black rounded-full p-1 w-7 h-7 flex items-center justify-center">
      {children}
    </div>
  )
}

export default TransactionButtonWrapper;