import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from "@chakra-ui/react";

function InputDetails({ title, label, purpose, PlaceHolder, UserInformation, setUserInformation }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [inputValue, setInputValue] = useState({
        data:""
    });
    const [selectedSkill, setSelectedSkill] = useState({
        name: "",
        proficiency: ""
    });

    const onSumitHandler = () => {
        if (purpose === "education") {
            setUserInformation((data) => ({
                ...data,
                [purpose]: [...data[purpose],inputValue]
            }));
        } else {
            setUserInformation((data) => ({
                ...data,
                [purpose]: [...data[purpose], selectedSkill]
            }));
        }
        setInputValue({data:""});
        setSelectedSkill({ name: "", proficiency: "" }); 
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen}   variant="outline" colorScheme="blue">Add Info</Button>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>{label}</FormLabel>
                            {
                                purpose === "education" ?
                                <Textarea
                                ref={initialRef}
                                placeholder={PlaceHolder}
                                value={inputValue.data}
                                onChange={(e) => setInputValue({ ...inputValue, data: e.target.value })}
                                size="md"
                            />
                            
                                    :
                                    <div>
                                        <FormControl className='flex flex-col gap-2'>
                                            <Input
                                                ref={initialRef}
                                                placeholder='Enter Skill'
                                                value={selectedSkill.name}
                                                onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })}
                                                required
                                            />
                                            <Select
                                                placeholder='Select proficiency'
                                                value={selectedSkill.proficiency}
                                                onChange={(e) => setSelectedSkill({ ...selectedSkill, proficiency: e.target.value })}
                                                required
                                            >
                                                <option value='Beginner'>Beginner</option>
                                                <option value='Intermediate'>Intermediate</option>
                                                <option value='Advanced'>Advanced</option>
                                            </Select>
                                        </FormControl>
                                    </div>
                            }
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSumitHandler}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InputDetails;
