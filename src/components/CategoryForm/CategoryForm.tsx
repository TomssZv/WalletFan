import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface CategoryFormProps {
  isFormOpen: Function 
}

const CategoryForm: React.FC<CategoryFormProps> = ({ isFormOpen }) => {
  const [categoryName, setCategoryName] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!categoryName) {
      toast.error("No category name provided")
      return;
    }

    const createCategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: categoryName
      })
    })

    const response = await createCategory.json();
  }

  return (
    <form
      className="p-4 border rounded-lg border-black bg-neutral-200 bg-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="bg-transparent p-1"
        type="text"
        placeholder="Category name"
        value={categoryName ?? ''}
        onChange={(e) => {setCategoryName(e.target.value)}}
        required
      />
      <div className="flex gap-3 mt-3">
        <button type="submit">Create</button>
        <button
          className="text-red-500"
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

export default CategoryForm;
