import Content from "../Content/Content";
import Sidebar from "../Sidebar/Sidebar";
import { createContext, useState } from "react";

export interface ComponentProp {
  updateComponent: boolean;
  setUpdateComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TaskNumber {
  taskNumber: number[] | null;
  setTaskNumber: React.Dispatch<React.SetStateAction<number[] | null>>;
}

export const ComponentContext = createContext<ComponentProp | null>(null); // to fetch data again and update ui
export const TaskNumberContext = createContext<TaskNumber | null>(null); // gather number of task & display in the navlinks

const AppLayout = () => {
  const [updateComponent, setUpdateComponent] = useState(false);
  const [taskNumber, setTaskNumber] = useState<number[] | null>([]);
  return (
    <div className="h-screen max-h-screen flex">
      <ComponentContext.Provider
        value={{ updateComponent, setUpdateComponent }}
      >
        <TaskNumberContext.Provider value={{ taskNumber, setTaskNumber }}>
          <Sidebar />
          <Content />
        </TaskNumberContext.Provider>
      </ComponentContext.Provider>
    </div>
  );
};

export default AppLayout;
