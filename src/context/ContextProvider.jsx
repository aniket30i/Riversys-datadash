import { createContext, useState } from "react";

export const ContextProvider = createContext();

export const DataProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  return (
    <ContextProvider.Provider
      value={{ searchQuery, setSearchQuery, dateRange, setDateRange }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
