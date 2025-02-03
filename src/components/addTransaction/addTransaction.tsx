"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import TransactionButtonWrapper from "../transactionButtonWrapper/transactionButtonWrapper"
import toast from "react-hot-toast"
import { useTransactionStore } from "@/providers/transactionStoreProvider"

const AddTransaction: React.FC = () => {
  const [amount, setAmount] = useState(0)
  const [deducted, setDeducted] = useState(true)
  const [categories, setCategories] = useState(Array())
  const [selectedCategory, setSelectedCategory] = useState<null | number | string>(null)
  const [selectedGroup, setSelectedGroup] = useState<null | number>(null)
  const [groups, setGroups] = useState(Array())
  const [comment, setComment] = useState<null | string>(null)

  const { transactionList, setTransactionList } = useTransactionStore(
    (state) => state,
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (selectedCategory === "-" || !selectedCategory) {
      toast.error("Select a category!")
      return;
    }

    if (amount === 0) {
      toast.error("Ammount can't be 0")
      return
    }

    const addTransaction = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deducted: deducted,
        amount: amount,
        categoryId: selectedCategory,
        comment: comment,
        groupId: selectedGroup
      })
    })

    if (addTransaction.status === 200) {
      const transaction = await addTransaction.json()
      setTransactionList([...transactionList, transaction])
      setComment(null)
      setAmount(0)
      toast.success("Transaction succesfully added!")
      return
    }

    toast.error("Failed to add transaction!")
  }

  const getCategories = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/getList`);

    const responseCategories = await response.json();

    if (responseCategories) {
      setCategories(responseCategories)
    }
  }

  const getGroups = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group/getList`);

    const responseGroup = await response.json();

    if (responseGroup) {
      setGroups(responseGroup)
    }
  }

  const handleSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value))
  }

  useEffect(() => {
    getCategories()
    getGroups()
  }, [])

  const handleSelectGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value !== "-" ? Number(event.target.value) : null;

    setSelectedGroup(value)
  }

  const inputTypeStyles = deducted ? "border-red-300" : "border-green-400";

  return (
    <div className="border rounded-lg p-4 border-black">
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <h3 className="font-bold font-xl">Add transaction</h3>
        <div className="mt-2">
          <span>Category: </span>
          <select onChange={e => handleSelectCategory(e)}>
          <option value={undefined}>-</option>
          {categories && categories.map((category) => {
            return (
              <option 
                key={category.id}
                value={category.id}
              >{category.name}</option>
            )
          })}
          </select>
          <span className="ml-2">
            <span>Group: </span>
            <select onChange={e => handleSelectGroup(e)}>
              <option value={undefined}>-</option>
              {groups && groups.map((group) => {
                return (
                  <option 
                    key={group.id}
                    value={group.id}
                  >{group.name}</option>
                )
              })}
            </select>
          </span>
        </div>
        <div className="mt-2">
          <p>Transaction comment</p>
          <textarea
            className="min-h-3 w-full border border-black rounded-md p-2"
            value={comment ?? ""}
            onChange={(e) => {setComment(e.target.value)}}
          ></textarea>
        </div>
        <div className="my-3">
          <span>Ammount: </span>
          <input
            className={`appearance-none border rounded-md p-1 outline-none ${inputTypeStyles}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setAmount(Number(e.target.value))}}
            value={amount} 
            type="number"
          />
        </div>
        <div className="flex gap-3">
          <TransactionButtonWrapper>
            <button
              className="w-full"
              onClick={(e) => {e.preventDefault(), setDeducted(deducted => true)}}
            >-</button>
          </TransactionButtonWrapper>
          <TransactionButtonWrapper>
            <button
              className="w-full"
              onClick={(e) => {e.preventDefault(), setDeducted(deducted => false)}}
            >+</button>
          </TransactionButtonWrapper>
        </div>
        <button className="border py-1 px-3 rounded mt-3 border-black" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddTransaction;