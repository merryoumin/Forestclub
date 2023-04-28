import { GiFrogPrince } from "react-icons/gi";
import { Link } from "react-router-dom";

const NftCard = ({ tokenId, metadata, mintedNft }) => {
  return (
    <div className="rounded-2xl bg-gray-800 pb-4 relative m-10 w-50">
      {parseInt(mintedNft) < tokenId && (
        <div className="absolute bg-black w-full h-full bg-opacity-50 flex justify-center items-center font-bold text-4xl rounded-xl">
          Not Minted
        </div>
      )}
      <img
        className=" rounded-t-2xl "
        src={metadata.image}
        alt={metadata.name}
      />
      <div className="mt-4 text-2xl font-bold text-gray-300 px-4">
        {metadata.name}
      </div>
      <div className="mt-4 text-xl flex justify-end px-4">
        <Link to={`/detail/${tokenId}`}>
          <button
            disabled={parseInt(mintedNft) < tokenId}
            className="bg-gray-50 text-gray-950 px-4 py-2 rounded-xl hover:bg-gray-500"
          >
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NftCard;
