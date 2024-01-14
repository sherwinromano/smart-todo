import { Outlet } from "react-router-dom";
import Title from "./Title";
import { ThemeContext } from "@/App";
import { ComponentContext } from "../Layout/AppLayout";
import { useContext, useEffect, useState } from "react";
import { query, orderBy, DocumentData, getDocs } from "firebase/firestore";
import { dailyTask, important } from "@/firebase-config";
import { createContext } from "react";
import { ComponentProp } from "../Layout/AppLayout";
import { TaskNumberContext } from "@/app-components/Layout/AppLayout";

interface ListProp {
  options: [string, string, string];
  dailyTaskList: Data[];
  importantTask: Data[];
  listStatus: listStatus;
  isFetching: boolean;
  error: boolean;
  componentContext: ComponentProp | null;
}

interface listStatus {
  dailyTask: {
    active: Data[];
    completed: Data[];
  };
  important: {
    active: Data[];
    completed: Data[];
  };
}

export interface Data {
  id: string;
  description: string;
  isCompleted: boolean;
  isPrioritized: boolean;
}

export const ListContext = createContext<ListProp | null>(null);

const Content = () => {
  const [dailyTaskList, setDailyTaskList] = useState<Data[]>([]);
  const [importantTask, setImportantTask] = useState<Data[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const context = useContext(ThemeContext);
  const componentContext = useContext(ComponentContext);
  const taskNumber = useContext(TaskNumberContext);
  const options: [string, string, string] = [
    "Prioritized",
    "Finished",
    "Unfinished",
  ];

  const listStatus: listStatus = {
    dailyTask: {
      active: dailyTaskList.filter((item) => !item.isCompleted),
      completed: dailyTaskList.filter((item) => item.isCompleted),
    },
    important: {
      active: importantTask.filter((item) => !item.isCompleted),
      completed: importantTask.filter((item) => item.isCompleted),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = orderBy("timestamp", "desc");
        const request = {
          dailyTask: query(dailyTask, order),
          important: query(important, order),
        };
        const datas = {
          dailyTaskData: await getDocs(request.dailyTask),
          importantData: await getDocs(request.important),

          getDailyTask: () => {
            const dailyTaskList: Data[] = datas.dailyTaskData.docs.map(
              (doc: DocumentData) => {
                const dataObj = doc.data();
                const id = doc.id;
                dataObj.id = id; // Pushing list id's to dataObj

                return dataObj;
              }
            );

            return dailyTaskList;
          },

          getImportant: () => {
            const importantList: Data[] = datas.importantData.docs.map(
              (doc: DocumentData) => {
                const dataObj = doc.data();
                const id = doc.id;
                dataObj.id = id; // Pushing list id's to dataObj

                return dataObj;
              }
            );
            return importantList;
          },
        };

        setDailyTaskList(datas.getDailyTask());
        setImportantTask(datas.getImportant());
        taskNumber?.setTaskNumber([dailyTaskList.length, importantTask.length]);
      } catch (error) {
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [componentContext?.updateComponent, taskNumber?.taskNumber]);

  return (
    <div
      className={
        context?.theme == "dark"
          ? "bg-black basis-full flex flex-col xs:gap-5 sm:gap-4 xs:p-4 lg:p-[1.5rem] lg:pb-4"
          : "bg-white basis-full flex flex-col xs:gap-5 sm:gap-4 xs:p-4 lg:p-[1.5rem] lg:pb-4"
      }
    >
      <Title />
      <div className="h-full flex flex-col xs:gap-3 overflow-hidden">
        <ListContext.Provider
          value={{
            options,
            dailyTaskList,
            importantTask,
            listStatus,
            isFetching,
            error,
            componentContext,
          }}
        >
          <Outlet context={context} />
        </ListContext.Provider>
      </div>
    </div>
  );
};

export default Content;
