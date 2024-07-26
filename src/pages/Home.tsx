import AuctionForm from "../components/AuctionForm/AuctionForm";
import auction_logo from "../assets/img/auction.svg";
export default function Home() {
  return (
    <div className="Home">
      <div>
        <div className="flex gap-4 items-center justify-center mb-4">
          <img src={auction_logo} alt="Auction Kata" className="logo w-16" />
          <h1>Auction Kata</h1>
        </div>
        <AuctionForm />
      </div>
    </div>
  );
}
