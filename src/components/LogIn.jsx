import { useState, useEffect } from "react";
import axios from "axios";
const LogIn = ({ account, setAccount }) => {
  const [wAccount, setWAccount] = useState("");
  const [dAccount, setDAccount] = useState("");
  const [user, setUser] = useState("");
  const [buttonText, setButtonText] = useState("Welcome Back!");
  const [buttonText2, setButtonText2] = useState("Hello, Stranger");
  const [interests, setInterests] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const encodedAccount = encodeURIComponent(wAccount);
  const [change, setChange] = useState("visible");
  const [change2, setChange2] = useState("hidden");

  const handleCheckboxChange = (e, tagName) => {
    if (e.target.checked) {
      setCheckedValues([...checkedValues, { tagName }]);
      console.log("checkedValues : ", checkedValues);
    } else {
      setCheckedValues(
        checkedValues.filter((item) => item.tagName !== tagName)
      );
    }
  };
  const getWAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWAccount(accounts[0]);
      console.log("wAccount:" + wAccount);
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmitCreateUser = async (e) => {
    e.preventDefault();
    getWAccount();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: wAccount,
          nickName,
          email,
          tags: checkedValues,
        }
      );

      setUser(response.data.user);
      // console.log("user: " + user);
      window.location.href = "/main/account=" + encodedAccount;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWAccount();
  }, []);

  const clickChange = () => {
    if (change === "visible") {
      setChange("hidden");
      setChange2("visible");
    }
  };

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);

      setWAccount(accounts[0]);
      console.log("wAccount : " + wAccount);

      // getDBAccount();
      console.log();

      // if (wAccount.toLowerCase().trim() === dAccount.toLowerCase().trim()) {
      //   setAccount(dAccount);

      //   // window.location.href = "/main?account=" + encodedAccount;
      // } else {
      //   alert("회원이 아닙니다.");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const moveMain = () => {
    if (wAccount.toLowerCase().trim() === dAccount.toLowerCase().trim()) {
      setAccount(dAccount);

      window.location.href = "/main/account=" + encodedAccount;
    } else {
      alert("회원이 아닙니다.");
    }
  };

  const getDBAccount = async () => {
    let address = `${process.env.REACT_APP_BACKEND_URL}/user/`;

    try {
      console.log("account :" + account);
      const response = await axios.get(address + account);
      console.log(response);
      setDAccount(response.data.user.account);

      moveMain();
    } catch (error) {
      console.error(error);
    }
  };
  const getInterests = async () => {
    let address = `${process.env.REACT_APP_BACKEND_URL}/tags/`;
    try {
      const response = await axios.get(address);
      setInterests(response.data.tags);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getInterests();
  }, []);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className={`${change} flex flex-row`}>
        <div
          onMouseOver={() => setButtonText("Log In")}
          onMouseOut={() => setButtonText("Welcome Back!")}
          className=" hover:bg-slate-50/70 hover:text-slate-900 text-white  w-56 h-20 flex justify-center items-center rounded-2xl border-2 border-zinc-200 rounded-2 p-8 mr-10"
        >
          <button
            className="  text-2xl font-bold flex items-center mt-2p-2"
            onClick={getWAccount}
          >
            {buttonText}
          </button>
        </div>
        <div
          onMouseOver={() => setButtonText2("Join In")}
          onMouseOut={() => setButtonText2("Hello, Stranger")}
          className=" hover:bg-slate-50/70 hover:text-slate-900 text-white  w-56 h-20 flex justify-center items-center rounded-2xl border-2 border-zinc-200 rounded-2 p-8 mr-10"
        >
          <button
            className=" text-2xl font-bold flex items-center mt-2p-2"
            onClick={clickChange}
          >
            {buttonText2}
          </button>
        </div>
      </div>
      <div
        className={`${change2} h-auto bg-white border-2 border-zinc-200 rounded-2xl p-8 mr-1`}
      >
        <form className=" mt-2 my-4" onSubmit={onSubmitCreateUser}>
          <div>Nickname</div>
          <input
            className="m-4 mx-10 grow border-2 border-gray-200 rounded-lg focus:outline-sky-400 px-2 py-1 text-lg"
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <div>Email</div>
          <input
            className="m-4 mx-10 grow border-2 border-gray-200 rounded-lg focus:outline-sky-400 px-2 py-1 text-lg"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            Interests
            <div className="p-4 grid grid-cols-5 flex justify-center">
              {interests.map((interest) => (
                <label key={interest.id} className="m-4">
                  <input
                    type="checkbox"
                    className="m-2"
                    value={interest.tagName}
                    onChange={(e) => handleCheckboxChange(e, interest.tagName)}
                  />
                  {interest.tagName}
                </label>
              ))}
            </div>
          </div>
          <input
            className="ml-4  px-2 py-1 bg-gray-400 rounded-lg text-gray-50 w-24"
            type="submit"
            value="계정 생성"
          />
        </form>
      </div>
    </div>
  );
};

export default LogIn;
