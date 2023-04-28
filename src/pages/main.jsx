import { useState, useEffect } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";
import Nfts from "../components/Nfts";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

function Main({ account }) {
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);

  const getTotalNft = async () => {
    try {
      if (!contract) return;
      const response = await contract.methods.totalNft().call();

      setTotalNft(response);
      // console.log("totalNft" + response);
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNft = async () => {
    console.log("contract" + contract);
    console.log("account" + account);
    try {
      // if (!contract || !account) return; //balanceOf는 account도 필요함

      const response = await contract.methods.balanceOf(account).call();
      console.log("getMyNft" + response);
      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  // const checkLogin = async (req) => {
  //   const { account } = req.params;
  //   if (!account) return alert("Login plz");
  // };

  const getMintedNft = async () => {
    try {
      if (!contract) return;
      const response = await contract.methods.totalSupply().call(); //NFT 민팅된 총개수

      setMintedNft(response);
      console.log("setMintedNft" + response);
      setPage(parseInt((parseInt(response) - 1) / 10) + 1);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTotalNft();
    getMyNft();
    getMintedNft();
  }, []);

  return (
    <div className=" flex  flex-col  justify-center items-center h-screen ">
      <div className=" max-w-screen-xl  min-h-screen mx-auto  flex  flex-col  justify-start items-center mb-6">
        <div className=" text-slate-600/80  text-6xl font-bold m-0  ">
          Forest club
        </div>
        <h1 class="text-2xl  text-slate-900/90 font-bold">
          비밀을 가진 동물들이 사는 숲
        </h1>
        <div className=" bg-slate-50/70  text-sm max-w-screen-xl mx-auto p-2 flex justify-around items-center rounded-2xl ">
          때는 1999년 세계종말의 소문이 유행하던 시기, 그 소문들은 행성 출돌
          부터 전염병까지 다양했다. 어느 사람들은 전쟁이 일어나 학살이 일어날
          것이라고 단언 했다. 그들은 사람을 무서워 했다, 문제는 그들도
          사람이었다는 것이다. 문제를 해결 하기 위해 그들은 오지의 가장 깊은
          숲으로 가서 사람이 아니라 동물로 살아가기로 정했다. 그들은 최첨단
          기술을 사용해 동물과 가장 유사한 인형탈을 만들어 내는 대 성공했다.
          또한 그들의 행동 조차 동물처럼 행동하였다. 그들의 이야기는 2023년 한
          탐험가로 인해 세상에 나올 때까지 비밀로 붙여지고 있었다. 탐험가는
          그들이 인간의 모습으로 살아갈 당시의 모았던 막대한 재물들이 숲의 어느
          깊숙한 곳에 숨겨져 있다고 소문을 듣고 그 보물을 찾기 위해 탐험가는
          Forest club을 창시한다. 그들에게 가까이 다가가기 위해 숲의 구성원인척
          신분을 숨기고 숲으로 잠입을 계획한다. 탐험가와 Forest club의
          구성원들은 각각의 동물을 골라 인형탈을 만들고 그들에게 들키지 않기
          위해 동물들 별로 클럽을 만들어 체계적으로 관리하기로 한다. 그리고
          구성원들이 서로를 비밀리에 알아보기 위해 인증된 표식을 나누어가지고
          보물을 찾아 뿔뿔이 흩어졌다.
        </div>
        <div className="py-4 text-center flex ">
          <div>
            <div className="font-bold text-green-900">{totalNft}</div>
            <div className="text-gray-900">총 NFT</div>
          </div>
          <div className="ml-10">
            <div className="font-bold text-green-900">{mintedNft}</div>
            <div className="text-gray-900">발행된 NFT</div>
          </div>
          <div className="ml-10">
            <div className="font-bold text-green-900">{myNft}</div>
            <div className="text-gray-900">내 NFT</div>
          </div>
        </div>
        <div>
          <Nfts page={page} mintedNft={mintedNft} />
        </div>
      </div>
    </div>
  );
}

export default Main;
