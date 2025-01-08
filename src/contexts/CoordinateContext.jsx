import { createContext, useState } from "react";

export const CoordinateContext = createContext({
    defaultX: 340,
    defaultY: 180,
    setPosX: () => { },
    setPosY: () => { }
})

export function CoordinateProvider({ children }) {
    const [posX, setPosX] = useState(340);
    const [posY, setPosY] = useState(180);

    return <CoordinateContext.Provider
        value={{
            posX,
            posY,
            setPosX: setPosX,
            setPosY: setPosY,
        }}
    >
        {children}
    </CoordinateContext.Provider>
}