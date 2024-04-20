import React, { useState } from 'react';
import { Input, Button } from "@chakra-ui/react";

function SkillItem({ skill, index, deleteSkill, id, editSkill }) {
    const [skillName, setSkillName] = useState(skill.name);
    const [skillProficiency, setSkillProficiency] = useState(skill.proficiency);
    const [isEditable, setIsEditable] = useState(false);
    const [open, setOpen] = useState(false); // Added assignment operator "="
        // console.log(id);

    const handleEdit = () => {
        if (isEditable) {
            console.log("SkillItem", id);
            editSkill(id, index, skillName, skillProficiency);
        }
        setIsEditable(prev => !prev);
    };

    const handleDelete = () => {
        console.log("delete handler ",id)
        deleteSkill(id, index);
    };

    return (
            <div className={`flex w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black bg-[#ccbed7]"}`}>
                <Input
                    type="text"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    readOnly={!isEditable}
                    variant="outline"
                    className={`w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent select-none"}`}
                />
                <Input
                    type="text"
                    value={skillProficiency}
                    onChange={(e) => setSkillProficiency(e.target.value)}
                    readOnly={!isEditable}
                    variant="outline"
                    className={`w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent select-none"} ${skill.completed ? "line-through" : ""}`}
                />
                <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="inline-flex w-8 h-8 rounded-lg cursor-pointer text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                >
                    {isEditable ? "📁" : "✏️"}
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="inline-flex w-8 h-8 rounded-lg cursor-pointer text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                >
                    ❌
                </Button>
            </div>
      
    );
}

export default SkillItem;
