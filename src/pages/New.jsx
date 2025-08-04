import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  // 페이지 뒤로 가기 nav(-1)
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  // 페이지 타이틀 변경
  usePageTitle("새 일기 쓰기");

  // Editor 컴포넌트에서 새로운 일기 작성완료 로 전송한 input값
  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    // 작성 완료 버튼 누르고 Home 페이지 가기
    // nav() replace : 뒤로 가기(다시 Edit페이지) 방지
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
