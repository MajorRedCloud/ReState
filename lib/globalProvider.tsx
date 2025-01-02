import { createContext, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface user {
    $id: string,
    name: string, 
    email: string,
    avatar: string,
}

interface GlobalContextType {
    isLoggedIn: boolean,
    user: user | null,
    loading: boolean,
    refetch: (newParams?: Record<string, string | number>) => Promise<void>,
}

const globalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ( {children}: {children: React.ReactNode}) => {
    
    const {data: user, loading, refetch} = useAppwrite(
        {fn: getCurrentUser}
    )

    const isLoggedIn = !!user

    return (
        <globalContext.Provider value={{isLoggedIn, user, loading, refetch}}>
            {children}
        </globalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(globalContext);
    if (!context)
      throw new Error("useGlobalContext must be used within a GlobalProvider");
  
    return context;
  };
  
  export default GlobalProvider;