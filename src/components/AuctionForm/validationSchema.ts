import * as yup from 'yup';

const bidderSchema = yup.object().shape({
	name: yup.string().required("Bidder name is required"),
	bids: yup.array(
		yup.number().min(1, "Bid amount must be at least 1").required("Bid amount is required")
	),
});

export const auctionSchema = yup.object().shape({
	bidders: yup.array(bidderSchema),
	reservePrice: yup.number().required('Reserve Price is required').min(0, 'Reserve price cannot be negative'),
});
