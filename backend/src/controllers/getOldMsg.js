 const getUserData=require('./getUserData.js')
 const Message=require('../models/message.models.js')
 
const getOldMsg=async (req, res) => {
        try {
          const userData = await getUserData(req);
          if(!userData)
          {
            console.log("Can't retrieve user Data");
          }
          console.log(userData);
      
          const userId = req.params.userId;
          console.log(userId);
      
          const ourUserId = userData.id;
          console.log(ourUserId);
      
          const messages = await Message.find({
            sender: { $in: [userId, ourUserId] },
            recipient: { $in: [userId, ourUserId] },
          }).sort({ createdAt: 1 }).exec();
          if(!messages)
          {
            console.log("no msg");
          }
      
          res.json(messages);
        } catch (error) {
          console.error('Error in fetching user data: dfaf', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

module.exports=getOldMsg