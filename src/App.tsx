import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./app-components/Layout/AppLayout";
import DailyTask from "./app-components/Content/outlets/DailyTask";
import Important from "./app-components/Content/outlets/Important";
import ErrorPage from "./app-components/Layout/ErrorPage";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<ContextProp | null>(null);

export interface ContextProp {
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
}

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/smart-todo/" element={<AppLayout />}>
        <Route index element={<DailyTask />} />
        <Route path="important" element={<Important />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const App = () => {
  const [theme, setTheme] = useState<string | null>("");

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={routes} />
    </ThemeContext.Provider>
  );
};

export default App;
