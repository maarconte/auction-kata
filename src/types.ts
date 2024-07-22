export interface Bidder {
	name: string;
	bids: number[];
}

export interface AuctionResultType {
	winningBidder?: string;
	winningPrice?: number;
}

