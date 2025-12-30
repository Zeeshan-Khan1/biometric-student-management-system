import connectDB from "./database/database.js"
import User from "./models/user.model.js"

const seedAdmin = async () => {
    try {
        await connectDB()
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin123@gmail.com" })
        
        if (existingAdmin) {
            console.log("Admin user already exists!")
            process.exit(0)
        }
        
        // Create admin user
        const admin = new User({
            email: "admin123@gmail.com",
            password: "admin123"
        })
        
        await admin.save()
        console.log("Admin user created successfully!")
        console.log("Email: admin123@gmail.com")
        console.log("Password: admin123")
        process.exit(0)
    } catch (error) {
        console.error("Error seeding admin:", error)
        process.exit(1)
    }
}

seedAdmin()

