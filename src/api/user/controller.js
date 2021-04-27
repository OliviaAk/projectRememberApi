const User = require("../../models/user.model");

const getUser = async (req, res) => {
	try {
		const userId = req.user._id;
		console.log(userId)
		const result = await User.findOne({ _id: userId });
		return res.status(200).json(result);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getUsers = async(req,res)=>{
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json(err);
	}
}
module.exports = { getUser,getUsers };
