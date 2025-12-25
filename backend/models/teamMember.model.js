import mongoose from "mongoose"

const teamMemberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Project Manager", "Developer"],
        required: true
    }
}, { timestamps: true })

const TeamMember = mongoose.model("TeamMember", teamMemberSchema, "teamMembers")

export default TeamMember

