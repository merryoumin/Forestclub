import LogIn from "../components/LogIn";
import { useEffect } from "react";

function JoinIn({ account, setAccount, start }) {
  const checkLogin = () => {
    if (account) return alert("already frog");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className=" flex  flex-col  justify-center items-center h-screen ">
      <div className=" max-w-screen-xl  min-h-screen mx-auto  flex  flex-col  justify-center items-center mb-6">
        <div className=" text-slate-50/80  text-9xl font-bold m-0  ">
          Forest club
        </div>
        <h1 class="text-2xl  text-slate-900/90 font-bold">
          동물들이 사는 숲으로 당신으로 초대합니다.
        </h1>
        <div className=" bg-slate-400/50 max-w-screen-xl mx-auto p-10 flex justify-around items-center rounded-3xl ">
          <LogIn account={account} setAccount={setAccount} />
        </div>
      </div>
    </div>
  );
}
export default JoinIn;
