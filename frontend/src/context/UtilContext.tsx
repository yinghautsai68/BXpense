import { createContext, useContext } from "react";

type UtilContextType = {
    formatDate: (dateTime: string) => string,
    formatTime: (dateTime: string) => string,
    formatDateTime: (dateTime: string) => string
};

export const UtilContext = createContext<UtilContextType | null>(null);

type UtilProviderType = {
    children: React.ReactNode
}
export const UtilProvider = ({ children }: UtilProviderType) => {
    const formatDate = (dateTime: string) => {
        if (!dateTime) {
            return "";
        }

        const dateObj = new Date(dateTime);
        const formatter = new Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        });

        return formatter.format(dateObj);
    };

    const formatTime = (dateTime: string) => {
        if (!dateTime) {
            return "";
        }

        const dateObj = new Date(dateTime);
        const formatter = new Intl.DateTimeFormat("zh-TW", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        return formatter.format(dateObj);
    }


    const formatDateTime = (dateTime: string) => {
        if (!dateTime) {
            return "";
        }
        const dateObj = new Date(dateTime);
        const formatter = new Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })

        return formatter.format(dateObj);
    };

    return (
        <UtilContext.Provider value={{ formatDate, formatTime, formatDateTime }}>
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