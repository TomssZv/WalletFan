import { useState, FormEvent } from "react";

interface GroupFormProps {
  isFormOpen: Function 
}

const GroupForm: React.FC<GroupFormProps> = ({ isFormOpen }) => {``
  const [groupName, setGroupName] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!groupName) {
      console.error("No Group name provided")
      return;
    }

    const createGroup = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: groupName
      })
    })

    const response = await createGroup.json();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="p-4 border rounded-lg border-black bg-neutral-200 bg-white">
      <input
        className="bg-transparent p-1"
        type="text"
        placeholder="Group name"
        value={groupName ?? ''}
        onChange={(e) => {setGroupName(e.target.value)}}
        required
      />
      <div className="flex gap-3 mt-3">
        <button type="submit">Create</button>
        <button
          className="text-red-500 "
          onClick={(e) => {
            e.preventDefault(), isFormOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
};

export default GroupForm;
