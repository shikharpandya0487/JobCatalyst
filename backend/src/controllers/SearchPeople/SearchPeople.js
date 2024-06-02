const { User } = require("../../models/user/User");

// Function to get searched people based on query parameters
const getSearchedPeople = async (req, res) => {
  try {
    const user = req.user;
    console.log("Authenticated user:", user.username);
 
    let { username, location, skill, profession } = req.query;

    // Check if at least one query parameter is provided
    if (!username && !location && !skill && !profession) {
      console.log("No data is provided");
      return res.status(400).json({ message: "Data not provided" });
    }

    // Build the search query object dynamically
    const searchQuery = {};

    if (username && typeof username === 'string') searchQuery.username = new RegExp(username, 'i');
    if (location && typeof location === 'string') searchQuery.location = new RegExp(location, 'i');
    if (skill && typeof skill === 'string') searchQuery['skills.name'] = new RegExp(skill, 'i');
    if (profession && typeof profession === 'string') searchQuery.profession = new RegExp(profession, 'i');

    console.log("Search query:", searchQuery);

    const users = await User.find(searchQuery);
    console.log("Users found:", users);

    if (!users || users.length === 0) {
      console.log("Users with details not found");
      return res.status(404).json({ message: "Users with the given details not found" });
    }

    // Return the found users
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error during user search:", error);
    return res.status(500).json({ error: "An error occurred while searching for users" });
  }
};

// Function to get all users
const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("All users:", users);

    res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching all users:", error);
    res.status(400).json({ error: "An error occurred while fetching users" });
  }
};

module.exports = { getSearchedPeople, getAll };
