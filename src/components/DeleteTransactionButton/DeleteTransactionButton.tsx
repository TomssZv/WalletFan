import Image from 'next/image';
import toast from 'react-hot-toast';

interface DeleteTransactionButtonProps {
  transactionId: number
}

const DeleteTransactionButton: React.FC<DeleteTransactionButtonProps> = ({ transactionId }) => {
  const handleClick = async () => {
    const deleteTransaction = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId: transactionId
      })
    })

    if (deleteTransaction.status === 200) {
      toast.success("Transaction succesfully deleted!")
      return
    }

    toast.error("Failed to delete transaction!")
  }

  return (
    <button onClick={handleClick}>
      <Image
        src="/icons/delete-icon.svg"
        alt='Delete icon'
        width={20}
        height={20}
      />
    </button>
  )
}

export default DeleteTransactionButton