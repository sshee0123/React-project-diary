import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";

// 1. "/" : 모든 일기를 조회하는 HOME 페이지
// 2. "/new" :  새로운 일기를 작성하는 NEW 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "*" :  whildcard(*) : 잘못된 페이지 조회시
// Routes 컴포넌트 자식은 <Route>만 가능
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/new" element={<New></New>}></Route>
      <Route path="/diary" element={<Diary></Diary>}></Route>
      <Route path="*" element={<Notfound></Notfound>}></Route>
    </Routes>
  );
}

export default App;
