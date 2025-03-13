import { Routes, Route } from "react-router-dom";
import { Main } from "@/pages/main/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
