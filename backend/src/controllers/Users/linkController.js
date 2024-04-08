const addLinkController = async (req, res) => {
    const user = req.user;

    const linkName = req.params.linkName;
    const data = req.body;
    const { url } = data;

    // Check whether both linkType and url are present
    if (!url || !linkName) {
        return res.status(404).json({ message: "Enter all credentials" });
    }

    try {
        // Update the link URL for the specified linkType
    
        if (user[linkName] && user[linkName].url === url) {
            return res.status(401).json({ error: "Link already exists" });
        }
        user[linkName] = { url: url };
        
        await user.save();

        const id=user[linkName]._id

        res.status(201).json({
            message: "Link successfully added",
            linkName: linkName,
            linkUrl: url,
            id:id
        });

    } catch (err) {
        res.status(501).json({
            message: "Error while adding link",
            error:err
        });
        
    }
};

const deleteLinkController = async (req, res) => {
    const user = req.user;
    const linkName = req.params.linkName;
    // const id=req.params.id

    try {
        if (user[linkName]) {
            const deletedLink = user[linkName];
            user[linkName] = null
            await user.save()
            res.status(200).json({ 
                message: "Link successfully deleted",
                deletedLink: deletedLink
            });

            console.log(user)
        } else {
            res.status(404).json({
                error: "The link does not exist"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Deletion not successful",
            error: error
        });
    }
};

const acceessLinkController = async (req, res) => {
    try {
        const user = req.user;
        const linkNames={
            github:"",
            linkedIn:"",
            googleDrive:""
          }
    
        console.log(linkNames)
        const links = {};
        Object.keys(linkNames).forEach(linkName => {
            if (user[linkName]) {
                links[linkName] = user[linkName];
            }
        });
       
        
        if (Object.keys(links).length > 0) {
            res.status(201).json({
                links: links,
            });
        } else {
            res.status(401).json({
                error: "None of the requested linkNames exist"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({
            error: error,
            message:"Error"
        });
    }
};


module.exports ={ addLinkController,deleteLinkController,acceessLinkController};
