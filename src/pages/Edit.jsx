import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import { useContext, useEffect, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  // 해당 id값 가져오는 커스텀 reacthook
  const curDiaryItem = useDiary(params.id);

  // 페이지 타이틀 변경
  usePageTitle(`${params.id}번 일기 수정`);

  // 삭제하기 버튼 클릭
  const onClickDelete = () => {
    // 팝업창 window 내장함수
    // 확인 버튼 : true / 취소 버튼 : false
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  // Editor 컴포넌트에서 일기 수정 작성완료 로 전송한 input값
  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
