import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import DiaryItem from "../components/DiaryItem";

const Home = () => {
  return (
    <div>
      <Header
        title={"2025년 7월"}
        leftChild={<Button text={"<"} />}
        rightChild={<Button text={">"} />}
      />

      <DiaryList />
      <DiaryItem />
      <DiaryItem />
    </div>
  );
};

export default Home;
