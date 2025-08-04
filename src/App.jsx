import "./App.css";
import { useState, useReducer, useRef, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

function reducer(state, action) {
  // localStorage에 담기 위한 diary 데이터 값
  let nextState;
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

// 페이지 라우팅
// 1. "/" : 모든 일기를 조회하는 HOME 페이지
// 2. "/new" :  새로운 일기를 작성하는 NEW 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4. "./edit" : 일기를 수정하는 Edit 페이지
// 5. "*" :  whildcard(*) : 잘못된 페이지 조회시

// Context 활용하여 데이터 전달
// DiaryStateContext -> data
// DiaryDispatchContext -> onCreate, onUpdate, onDelete
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // 로딩상태 관리 (초기값 : true , 로딩중)
  const [isLoading, setIsLoading] = useState(true);
  // data : 일기데이터
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // App 컴포넌트가 mount될 때, localStorage에서 데이터 불러와서 data에 값 설정하기 위함
  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      // 로딩 완료
      setIsLoading(false);
      // JSON.parse() undefined 오류 방지
      return;
    }
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      // 로딩 완료
      setIsLoading(false);
      return;
    }
    // parsedData 데이터의 id중 가장 큰 값
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    // 새로운 일기 저장될 때 maxID +1
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    // 로딩 완료
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
