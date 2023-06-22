import React from "react";
import QueryContainer from "./QueryContainer";
import SideBarContainer from "./SideBarContainer";
import { useState, useEffect } from "react";
import DBModal from "~/components/modal/DBModal";
// import DBConnect from "~/components/DBConnect";
// import DashboardContainer from "./DashboardContainer";
import type { QueryLogItemObject } from "~/types/types";

const MainContainer: React.FC = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [queryLog, setQueryLog] = useState<QueryLogItemObject[]>([]);
  const [connection, setConnection] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    dbName: "",
    dbURI: "",
  });

  //for connecting to test DB
  const [testConnected, setTestConnected] = useState(false);
  const [activeQuery, setActiveQuery] = useState<QueryLogItemObject>({
    query: "",
    data: {},
    name: "",
  });

  //checking form validation on input changes for credentials
  useEffect(() => {
    const { dbName, dbURI } = formData;
    let isValid = false;
    if (dbName && dbURI) {
      isValid = true;
    }
    setIsFormValid(isValid);
  }, [formData]);

  // will only fire if isFormValid === true
  const handleConnect = () => {
    // console.log("Valid Form:", formData);
    // will send data to back end if validateData is true
    setConnection(true);
    setIsModalOpen(false);
  };

  //for connecting to test DB

  // function handleTestConnect() {
  //   // Perform the necessary actions to establish the connection
  //   setConnected(true);
  // }

  const editQueryLabel = (index: number, label: string): void => {
    setQueryLog((prevQueryLog) => {
      if (prevQueryLog.length > index) {
        const updatedQueryLog = [...prevQueryLog];
        updatedQueryLog[index].name = label; // functionality works but this linter is not being nice!
        return updatedQueryLog;
      }
      return prevQueryLog;
    });
  };

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-purple-900 to-white md:flex-row">
      {!isModalOpen ? (
        <></>
      ) : (
        <>
          <DBModal
            openModal={setIsModalOpen}
            setFormData={setFormData}
            formData={formData}
            isFormValid={isFormValid}
            handleConnect={handleConnect}
          />
        </>
      )}
      <SideBarContainer
        openModal={setIsModalOpen}
        connection={connection}
        setConnection={setConnection}
        setFormData={setFormData}
        formData={formData}
        queryLog={queryLog}
        setQueryLog={setQueryLog}
        editQueryLabel={editQueryLabel}
        testConnected={testConnected}
        setTestConnected={setTestConnected}
        activeQuery={activeQuery}
        setActiveQuery={setActiveQuery}
      />
      <QueryContainer
        setQueryLog={setQueryLog}
        setQuery={setQuery}
        query={query}
        testConnected={testConnected}
        activeQuery={activeQuery}
        setActiveQuery={setActiveQuery}
      />
    </div>
  );
};

export default MainContainer;
