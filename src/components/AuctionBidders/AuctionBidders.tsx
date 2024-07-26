import "./AuctionBiddersStyle.css";

import { ErrorMessage, Field } from "formik";
import Input, { InputType } from "../Input/Input";
import { faDollarSign, faUser } from "@fortawesome/free-solid-svg-icons";

import { Bidder } from "../../types";
import React from "react";

type Props = {
  bidders: Bidder[];
  setBidders: React.Dispatch<React.SetStateAction<Bidder[]>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function AuctionBidders({
  setBidders,
  bidders,
  handleBlur,
  handleChange,
}: Props) {
  const handleAddBid = (index: number) => {
    // limit the number of bids to 4
    if (bidders[index].bids.length >= 5) {
      return;
    }
    const newBidders = [...bidders];
    newBidders[index].bids.push(0);
    setBidders(newBidders);
  };
  return (
    <div className="AuctionBidders">
      <div className="AuctionBidders__list flex gap-4">
        {bidders.map((bidder, index) => (
          <div
            key={index}
            className="AuctionBidders__list__item mb-4 flex flex-col gap-4"
          >
            <div>
              <Input
                label="Bidder Name"
                type={InputType.TEXT}
                icon={faUser}
                id={`bidderName-${index}`}
                name={`bidders[${index}].name`}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mb-4"
              />
              <ErrorMessage name={`bidders[${index}].name`} />
            </div>

            <div>
              {bidder?.bids.length > 0 ? (
                bidder.bids.map((_, bidIndex) => (
                  <div key={bidIndex} className="mb-4">
                    <Input
                      name={`bidders[${index}].bids[${bidIndex}]`}
                      type={InputType.NUMBER}
                      icon={faDollarSign}
                      onChange={handleChange}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center">No bids</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleAddBid(index)}
              disabled={bidder?.bids?.length === 5}
              className="btn btn--secondary mt-auto"
            >
              Add Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
