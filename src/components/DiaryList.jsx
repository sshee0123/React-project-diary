import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  // 페이지 이동 위한 useNavigate
  const nav = useNavigate();

  // 가변적 요소 useState : 정렬 타입
  const [sortType, setSortType] = useState("latest");

  // 정렬 핸들러
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // 정렬된 데이터 가져오는 함수
  const getSortedData = () => {
    // toSorted : 원본 배열은 수정하지 않고 정렬된 새로운 배열 반환
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  // 정렬된 데이터
  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신 순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav(`/new`)}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
