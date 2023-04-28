import { GiFrogPrince } from "react-icons/gi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [metadata, setMetadata] = useState();

  const { tokenId } = useParams();

  const getNft = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
      );

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => console.log(metadata), [metadata]);
  useEffect(() => {
    getNft();
  }, []);

  return (
    <div className="rounded-t-2xl flex flex-col xl:flex-row justify-center items-center py-16">
      {metadata ? (
        <>
          <div className="max-w-[512px] rounded-t-2xl bg-gray-100  justify-center  rounded-b-2xl ">
            <img className="rounded-t-2xl" src={metadata.image} alt="NFT" />
            {metadata.name}
            <ul className="grid grid-cols-4 gap-8 py-8 bg-gray-100 rounded-b-2xl text-center">
              {metadata.attributes.map((v, i) => {
                return (
                  <li key={i} className="mx-4">
                    <div>{v.trait_type}</div>
                    <div className="mt-1 border-t-2 font-bold">{v.value}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <div>로딩중입니다...</div>
      )}
    </div>
  );
};
export default Detail;
