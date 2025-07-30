import { useSearchParams } from "react-router-dom";

const Home = () => {
  // useSearchParams
  // useState처럼 활용 가능
  const [params, setParams] = useSearchParams();
  return <div>Home</div>;
};

export default Home;
