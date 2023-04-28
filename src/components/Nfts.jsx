import axios from "axios";
import { useEffect, useState } from "react";
import NftCard from "./NftCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Nfts = ({ page, mintedNft }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nfts, setNfts] = useState();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여지는 슬라이드 개수
    slidesToScroll: 1, // 한 번 스크롤 시 이동할 슬라이드 개수
    initialSlide: 0,
  };

  const getNfts = async (p) => {
    //페이지 번호 받아줌
    try {
      let nftArray = []; //배열 초기화와 현재 페이지 메타데이터 저장
      setNfts();
      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;

        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
        );

        console.log("response" + response.data);

        nftArray.push({ tokenId, metadata: response.data });
      }

      setNfts(nftArray);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickPage = (p) => () => {
    setSelectedPage(p);
    getNfts(p);
  };
  const pageComp = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`ml-4 text-2xl font-bold hover:text-white ${
            i + 1 === selectedPage ? "text-white" : "text-gray-400"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1} <span className="text-base">페이지</span>
        </button>
      );
    }
    return pageArray;
  };

  useEffect(() => {
    // console.log("nfts : " + nfts);
  }, [nfts]);

  useEffect(() => {
    getNfts(1);
    console.log(nfts);
    console.log("dlsfj;aksdf");
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto pt-4">
      <div>{pageComp()}</div>
      <div className="mainSkill w-full pb-16 relative overflow-hidden">
        <Slider {...sliderSettings}>
          {nfts ? (
            nfts.map((v, i) => {
              return (
                <NftCard
                  key={i}
                  tokenId={v.tokenId}
                  metadata={v.metadata}
                  mintedNft={mintedNft}
                />
              );
            })
          ) : (
            <div>로딩중입니다...</div>
          )}
        </Slider>
      </div>
    </div>
  );
};
export default Nfts;
