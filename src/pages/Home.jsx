import { useSearchParams } from "react-router-dom";

const Home = () => {
  // useSearchParams
  // useState처럼 활용 가능
  const [params, setParams] = useSearchParams();
  console.log(params.get("value")); // hello 출력
  return <div>Home</div>;
};

export default Home;
