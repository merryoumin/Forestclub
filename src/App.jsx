import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/detail";
import Mypage from "./pages/mypage";
import JoinIn from "./pages/joinIn";
import Team from "./pages/team";
import Main from "./pages/main";
import Header from "./components/Header";

function App() {
  const [account, setAccount] = useState("");
  const [start, setStart] = useState(0);
  return (
    <BrowserRouter>
      <div className="h-full flex  flex-col items-center justify-start">
        <video
          className="min-h-screen w-full object-cover relative"
          autoPlay
          muted
          loop
          src={`${process.env.PUBLIC_URL}/video/main.mp4`}
        />
        <div className=" absolute justify-center items-center">
          <Header account={account} setAccount={setAccount} />
          <Routes>
            <Route path="/main/:account" element={<Main account={account} />} />
            <Route
              path="/"
              element={
                <JoinIn
                  account={account}
                  setAccount={setAccount}
                  start={start}
                />
              }
            />
            <Route path="/detail/:tokenId" element={<Detail />} />
            <Route
              path="/mypage/:account"
              element={<Mypage account={account} />}
            />
            <Route path="/team/:teamId" element={<Team />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
