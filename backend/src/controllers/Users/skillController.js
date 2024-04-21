const addSkillController=async(req,res)=>{
    try {
        const user=req.user
        const skill=req.body.skill

        const skillname=skill.name 
        const skillProficiency=skill.proficiency 
       
        if(!skillname||!skillProficiency)
        {
            res.status(401).json({
                messgae:"Enter all credentials"
            })
        }

        user.skills.push(skill)

        await user.save()

        const savedSkill = user.skills[user.skills.length - 1]; 
        const skillId = savedSkill._id;

        res.status(201).json({
            skillname,
            skillProficiency,
            message:"Successfully added",
            skillId
        })


        
    } catch (error) {
        res.status(401).json({
            message:"Error in adding skill",
            error:error
        })
    }
}

const editingSkillController = async (req, res) => {
    try {
        const user = req.user;
        const editSkill = req.body.skill; 
        const id = req.params.id;

        const skillIndex = user.skills.findIndex(skill => skill._id.toString() === id);

       
        if (skillIndex === -1) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        // Update the skill
        user.skills[skillIndex] = editSkill;

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: "Skill edited successfully",
            skillId: id ,
            skills:user.skills
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in editing skill",
            error: error.message
        });
    }
};


const deleteSkillController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;

       
        const skillIndex = user.skills.findIndex(skill => skill._id.toString() === id);

       
        if (skillIndex === -1) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        user.skills = user.skills.filter(skill => skill._id.toString() !== id);
        // console.log(user.skills)

    
        await user.save();

        res.status(200).json({
            message: "Skill deleted successfully",
            skills:user.skills
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in deleting skill",
            error: error.message
        });
    }
};


const accessSkillsController=async(req,res)=>{
    try {
        const user=req.user 
        const allSkills=user.skills 
        if(!allSkills)
        {
            res.status(501).json({
                message:"Not able to fetch all skills "
            })
        }

  
        

        res.status(201).json({
            skills:allSkills,
            message:"Skills loaded successfully"
        })
        
    } catch (error) {
        res.status(501).json({
            error:error,
            message:"Error while fetching skills"
        })
    }

}



module.exports={addSkillController,editingSkillController,deleteSkillController,accessSkillsController}