import "./AuctionResultStyle.css";

import { AuctionResultType } from "../../types";
import React from "react";

type Props = {
  result: AuctionResultType;
};

const AuctionResult = (props: Props) => {
  return (
    <div className="AuctionResult">
      <p>Winning Bidder:</p>
      <h2 className="AuctionResult__winningBider">
        {props.result.winningBidder}
      </h2>
      <h3 className="AuctionResult__price">{props.result.winningPrice} $</h3>
    </div>
  );
};

export default AuctionResult;
