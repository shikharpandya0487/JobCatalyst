import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useTheme } from '../../Context/ThemeContext';




const ListUser = ({user,handleFunction}) => {
  const {theme}=useTheme()
  return (
        <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      className={theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-400"}
      _hover={{
        color: "white",
      }}
      w="100%"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
        <Avatar
         mr={2}
         size="sm"
         cursor="pointer"
         name={user.username}
         src={user.pic}
        />
        <Box>
        <Text>{user.username}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
        </Box>
    
    </Box>
  )
}

export default ListUser
