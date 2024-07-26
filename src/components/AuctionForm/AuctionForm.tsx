import "./AuctionFormStyle.css";

import { AuctionResultType, Bidder } from "../../types";
import { Field, Form, Formik } from "formik";
import Input, { InputType } from "../Input/Input";
import React, { useState } from "react";

import AuctionBidders from "../AuctionBidders/AuctionBidders";
import AuctionResult from "../AuctionResult/AuctionResult";
import { auctionSchema } from "./validationSchema";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

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

  const restartAuction = () => {
    window.location.reload();
  };

  const handleAddBidder = () => {
    setBidders([...bidders, { name: "", bids: [] }]);
  };
  const onSubmit = (values: { bidders: Bidder[]; reservePrice: number }) => {
    // Sort bidders by their highest bid in descending order
    const sortedBidders = [...values.bidders].sort((a, b) => {
      const aHighestBid = Math.max(...a.bids);
      const bHighestBid = Math.max(...b.bids);
      return bHighestBid - aHighestBid;
    });

    // Sort bids within each bidder from highest to lowest
    const sortedBiddersWithSortedBids = sortedBidders.map((bidder) => ({
      ...bidder,
      bids: bidder.bids.sort((a, b) => b - a),
    }));

    // Determine the winning bidder (the first in the sorted array)
    const winningBidder = sortedBiddersWithSortedBids[0];

    // Determine the second-highest bid (the second in the sorted array)
    const secondHighestBid =
      sortedBiddersWithSortedBids[1]?.bids[0] > values.reservePrice
        ? sortedBiddersWithSortedBids[1]?.bids[0]
        : values.reservePrice;

    // Determine the winning price (second highest bid)
    const winningPrice = secondHighestBid;

    setResult({
      winningBidder: winningBidder?.name,
      winningPrice,
    });
  };

  return (
    <div className="AuctionForm">
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
            <Input
              label="Reserve Price"
              id="reservePrice"
              type={InputType.NUMBER}
              onChange={handleChange}
              onBlur={handleBlur}
              icon={faDollarSign}
              name="reservePrice"
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
      {result && (
        <AuctionResult result={result} restartAuction={restartAuction} />
      )}
    </div>
  );
};

export default AuctionForm;
