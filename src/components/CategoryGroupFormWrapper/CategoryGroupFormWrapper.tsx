'use client'

import { useState } from 'react'
import CategoryForm from '../CategoryForm/CategoryForm';
import GroupForm from '../GroupForm/GroupForm';

const CategoryGroupFormWrapper = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isGroupOpen, setIsGroupOpen] = useState(false)

    const setCategoryFrom = (value: boolean) => {
        setIsCategoryOpen(value)
    }

    const setGroupForm = (value: boolean) => {
        setIsGroupOpen(value)
    }

    const setOpenForms = (type: string) => {
        if (type === "group") {
            setIsCategoryOpen(false);
            setIsGroupOpen(!isGroupOpen);
            return;
        }

        setIsGroupOpen(false);
        setIsCategoryOpen(!isCategoryOpen);
    }

    return (
        <div className='my-3'>
            <div>
                <button className={`${isCategoryOpen && "underline"}`} onClick={() => setOpenForms("category")}>Category</button>
                <button className={`ml-2 ${isGroupOpen && "underline"}`} onClick={() => setOpenForms("group")}>Group</button>
            </div>
            {isCategoryOpen && 
                <CategoryForm isFormOpen={setCategoryFrom} />
            }
            {isGroupOpen &&
                <GroupForm isFormOpen={setGroupForm} />
            }
        </div>
    );
}

export default CategoryGroupFormWrapper;