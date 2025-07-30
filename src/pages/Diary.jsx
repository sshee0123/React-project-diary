import { useParams } from "react-router-dom";

const Diary = () => {
  // useParams
  // 현재 브라우저가 명시한 파라미터값 가져오는 역할
  const params = useParams();

  return <div>{params.id}번 일기입니다.</div>;
};

export default Diary;
