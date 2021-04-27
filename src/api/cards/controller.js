const Card = require("../../models/card.model");
const { cloudinary } = require('../../../utils/cloudinary');


const getCards = async (req, res) => {
	try {
		 const { resources } = await cloudinary.search
        .expression('folder:dev_setups')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getCardsInfo = async (req,res)=>{
	try {
		const cards = await Card.find();
		return res.status(200).json(cards);
	} catch (err) {
		return res.status(500).json(err);
	}
}

const editCards = async (req, res) => {
	const { id } = req.params;
	const { isEdit } = req.body;
	try {
		const editCard = await Card.updateOne(
			{ eventId: id },
			{ $set: { isEdit } },
		);
		if (editCard.ok) {
			res.status(200).json({ eventId: id, isEdit });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

const createCard = async (req, res) => {
	try {
		const {
			name,
			dateBirth,
			description,
			image,
		} = req.body;
		const userId = req.user._id;
		const newCard = new Card({
			name,
			dateBirth,
			description,
			image,
			isPublish:false,
			userId,
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const uploadImages = async(req,res)=>{
	try{
		const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        res.send({imageId:uploadResponse.public_id});
	}
	catch (err){
		console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
	}
}
module.exports = {
	editCards,
	createCard,
	uploadImages,
	getCards,
	getCardsInfo
};
