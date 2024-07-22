import "./AuctionFormStyle.css";

import { AuctionResultType, Bidder } from "../../types";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import AuctionBidders from "../AuctionBidders/AuctionBidders";
import AuctionResult from "../AuctionResult/AuctionResult";
import { auctionSchema } from "./validationSchema";

const AuctionForm: React.FC = () => {
  const [result, setResult] = useState<AuctionResultType | null>(null);
  const [bidders, setBidders] = useState<Bidder[]>([
    { name: "", bids: [0] },
    { name: "", bids: [0] },
  ]);
  const initialValues = {
    bidders: bidders,
    reservePrice: 0,
  };
  const handleAddBidder = () => {
    setBidders([...bidders, { name: "", bids: [] }]);
  };
  const onSubmit = (values: { bidders: Bidder[]; reservePrice: number }) => {
    const highestBidAboveReserve = values.bidders.reduce(
      (highestBid, currentBidder) => {
        const bidderHighestBid = Math.max(...currentBidder.bids); // Find highest bid for this bidder
        return bidderHighestBid > values.reservePrice
          ? Math.max(highestBid, bidderHighestBid)
          : highestBid;
      },
      -Infinity
    ); // Initialize with negative infinity to ensure any positive bid wins

    // Find the winning bidder based on the highest bid
    const winningBidder = values.bidders.find(
      (bidder) => Math.max(...bidder.bids) === highestBidAboveReserve
    );

    // Determine the winning price
    const winningPrice =
      highestBidAboveReserve !== -Infinity
        ? highestBidAboveReserve
        : values.reservePrice;

    setResult({
      winningBidder: winningBidder?.name,
      winningPrice,
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={auctionSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          dirty,
          isValid,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h1 className="mb-4">Auction Kata</h1>
            <label htmlFor="reservePrice">Reserve Price:</label>
            <Field
              id="reservePrice"
              name="reservePrice"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              className="mb-4"
            />
            <AuctionBidders
              bidders={bidders}
              setBidders={setBidders}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddBidder}
                className="btn btn--secondary"
              >
                Add Bidder
              </button>
              <button
                type="submit"
                className="btn"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Run Auction
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {result && <AuctionResult result={result} />}
    </div>
  );
};

export default AuctionForm;
