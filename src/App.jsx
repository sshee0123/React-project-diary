import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import Button from "./components/Button";
import Header from "./components/Header";

import { getEmotionImage } from "./util/get-emotion-image";

// 1. "/" : 모든 일기를 조회하는 HOME 페이지
// 2. "/new" :  새로운 일기를 작성하는 NEW 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "*" :  whildcard(*) : 잘못된 페이지 조회시
// Routes 컴포넌트 자식은 <Route>만 가능
function App() {
  // useNavigate
  // -> 페이지를 실제로 이동시키는 Navigate 함수 반환
  const nav = useNavigate();

  return (
    <>
      <Header
        title={"Header"}
        leftChild={<Button text={"Left"} />}
        rightChild={<Button text={"Right"} />}
      />
      <Button
        text={"123"}
        onClick={() => {
          console.log("123클릭");
        }}
      />
      <Button
        text={"123"}
        type={"POSITIVE"}
        onClick={() => {
          console.log("123클릭");
        }}
      />
      <Button
        text={"123"}
        type={"NEGATIVE"}
        onClick={() => {
          console.log("123클릭");
        }}
      />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/new" element={<New></New>}></Route>
        <Route path="/diary/:id" element={<Diary></Diary>}></Route>
        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>
    </>
  );
}

export default App;
