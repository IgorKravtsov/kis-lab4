import React from "react";
import { Route, Routes } from "react-router-dom";

import Task1 from "pages/Task1/Task1";
import Task2 from "pages/Task2/Task2";
import Task3 from "pages/Task3/Task3";
import Task4 from "pages/Task4/Task4";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Task1 />} />
      <Route path={"/task2"} element={<Task2 />} />
      <Route path={"/task3"} element={<Task3 />} />
      <Route path={"/task4"} element={<Task4 />} />
    </Routes>
  );
};
