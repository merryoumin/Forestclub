import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ account, setAccount }) => {
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    onClickAccount();
  }, []);

  //   useEffect(()=>{
  //     const interval = setInterval(()=>{
  //         onChangeMsg(OPTION);
  //     }, WORD_TYPING_SPEED);
  //     return () => clearInterval(interval);
  // }, []);

  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between items-center font-bold">
      <div className="flex items-center">
        {account ? (
          <div className="flex items-center p-2 bg-gray-600 rounded-full ml-4">
            {account.substring(0, 4)}...
            {account.substring(account.length - 4)}
          </div>
        ) : (
          <button
            className="flex items-center  ml-4 p-2 bg-gray-600 rounded-full"
            onClick={onClickAccount}
          >
            <div className="ml-1">Connect</div>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
