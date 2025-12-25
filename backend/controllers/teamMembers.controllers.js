import TeamMember from "../models/teamMember.model.js"

// Create team member
export const createTeamMember = async (req, res) => {
    try {
        const { name, role } = req.body

        if (!name || !role) {
            return res.status(400).json({
                message: "Name and Role are required"
            })
        }

        const teamMember = new TeamMember(req.body)
        await teamMember.save()

        res.status(201).json({
            message: "Team member created successfully",
            teamMember
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Read all team members
export const readAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({})
        
        res.status(200).json({
            success: true,
            message: "All team members retrieved successfully",
            count: teamMembers.length,
            teamMembers: teamMembers
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Read single team member by ID
export const readTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params
        const teamMember = await TeamMember.findById(id)
        
        if (!teamMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }

        res.status(200).json({
            success: true,
            teamMember
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Update team member
export const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params
        const teamMember = await TeamMember.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )
        
        if (!teamMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            teamMember
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Delete team member
export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params
        const deletedMember = await TeamMember.findByIdAndDelete(id)
        
        if (!deletedMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Team member deleted successfully",
            deletedMember
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

