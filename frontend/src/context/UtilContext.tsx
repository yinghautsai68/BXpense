import { createContext, useContext } from "react";

type UtilContextType = {
    formatDateTime: (dateTime: string) => string;
}

export const UtilContext = createContext<UtilContextType | null>(null);

type UtilProviderType = {
    children: React.ReactNode
}
export const UtilProvider = ({ children }: UtilProviderType) => {
    const formatDateTime = (dateTime: string) => {
        if (!dateTime) {
            return "";
        }
        const dateObj = new Date(dateTime);


        const formatter = new Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })



        return formatter.format(dateObj);
    };

    return (
        <UtilContext.Provider value={{ formatDateTime }}>
            {children}
        </UtilContext.Provider>
    );
};

export const useUtil = () => {
    const context = useContext(UtilContext);
    if (!context) {
        throw new Error("useUtil must be used inside UtilProvider");
    }
    return context;

}