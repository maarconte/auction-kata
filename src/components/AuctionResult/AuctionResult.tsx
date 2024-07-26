import "./AuctionResultStyle.css";

import { AuctionResultType } from "../../types";
import React from "react";

type Props = {
  result: AuctionResultType;
  restartAuction: () => void;
};

const AuctionResult = (props: Props) => {
  return (
    <div className="AuctionResult">
      <div className="content">
        <p>Winning Bidder:</p>
        <h2 className="winningBider">{props.result.winningBidder}</h2>
        <h3 className="price">{props.result.winningPrice} $</h3>
      </div>
      <button className="btn" onClick={() => props.restartAuction()}>
        Restart
      </button>
    </div>
  );
};

export default AuctionResult;
