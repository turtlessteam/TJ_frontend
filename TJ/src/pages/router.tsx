import { Routes, Route } from "react-router-dom";
import { Main } from "@/pages/main/page";
import { Onboarding } from "./Onboarding/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Onboarding />} />
    </Routes>
  );
}
