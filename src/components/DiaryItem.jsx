import "./DiaryItem.css";
import { useContext } from "react";
import { DiaryStateContext } from "../App";
import Button from "./Button";
import { getEmotionImage } from "../util/get-emotion-image";

const DiaryItem = () => {
  const diaryItems = useContext(DiaryStateContext);
  console.log(diaryItems);

  const emotionId = 2;

  return (
    <div className="DiaryItem">
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div className="info_section">
        <div className="created_date">{new Date().toLocaleDateString()}</div>
        <div className="content">내용</div>
      </div>
      <div className="button_section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
