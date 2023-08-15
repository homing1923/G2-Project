import { createContext, useContext, useState, useCallback } from 'react';

const G_uDocId = createContext(null)
const G_authId = createContext(null)
const G_lastId = createContext(null)

export function IdProvider({ children }) {
    const [uDocId, SetuDocId] = useState(null)
    const [authId, SetauthId] = useState(null)
    const [lastId, SetlastId] = useState(null)

    return (
        <G_uDocId.Provider value={{ uDocId, SetuDocId }}>
            <G_authId.Provider value={{ authId, SetauthId }}>
            <G_lastId.Provider value={{ lastId, SetlastId }}>
                {children}
                </G_lastId.Provider>
            </G_authId.Provider>
        </G_uDocId.Provider>

    );
}

export function useG_uDocId() {
    return useContext(G_uDocId);
}

export function useG_authId() {
    return useContext(G_authId);
}

export function useG_lastId(){
    return useContext(G_lastId);
}



