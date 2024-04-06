import React, { useState } from 'react';
import { Button, Textarea } from "@chakra-ui/react";

function EducationItem({ data, index, deleteEducationItem, editEducationItem }) {
    const [educationDescription, setEducationDescription] = useState(data.data);
    const [isEditable, setIsEditable] = useState(false);

    const handleEdit = () => {
        if (isEditable) {
            editEducationItem(index, educationDescription);
        }
        setIsEditable(prev => !prev);
    };

    return (
        <div className={`flex w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black bg-[#c6e9a7] `}>
            <Textarea
                type="text"
                value={educationDescription}
                onChange={(e) => setEducationDescription(e.target.value)}
                readOnly={!isEditable}
                variant="outline"
                className={`w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent select-none"} `}
            />
            <Button
                onClick={handleEdit}
                variant="outline"
                className="inline-flex w-8 h-8 rounded-lg cursor-pointer text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            >
                {isEditable ? "📁" : "✏️"}
            </Button>
            <Button
                onClick={() => deleteEducationItem(index)}
                variant="outline"
                className="inline-flex w-8 h-8 rounded-lg cursor-pointer text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            >
                ❌
            </Button>
        </div>
    );
}

export default EducationItem;
