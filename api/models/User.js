const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password: { type: String, required: true },
    profilePic: { type: Boolean, default: false },
    isAdmin:{type:Boolean, default:false}
},
    { timestamps: true }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})



module.exports = mongoose.model("User", UserSchema)