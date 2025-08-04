import { useEffect } from "react";

// 컴포넌트 mount되거나 title값 변경될 때 페이지 타이틀 변경하는 reacthook
const usePageTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
