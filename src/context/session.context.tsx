import { createContext, useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { clearTokenStorage, isExpired, refresh } from '../api/app.api';
import { useNavigate } from 'react-router-dom';

export interface SessionUser {
    '_id': string
    firstName: string
    lastName: string
    username: string
}

export interface SessionContextUser {
    isLoggedIn: boolean
    user: SessionUser
}

export const initialSessionContext: SessionContextUser = {
    isLoggedIn: false,
    user: {
        '_id': '',
        firstName: '',
        lastName: '',
        username: '',
        workouts: [] as string[],
    } as SessionUser,
};

export const createSessionState = (isLoggedIn: boolean, data: SessionUser): SessionContextUser => {
    return {
        isLoggedIn,
        user: {
            '_id': data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
        } as SessionUser,
    };
};

export const sessionContextSetup = (): SessionContextUser => {
    const accessToken = localStorage.getItem('AccessToken');
    const refreshToken = localStorage.getItem('RefreshToken');
    if (!accessToken || !refreshToken) {
        clearTokenStorage();
        return initialSessionContext;
    }

    const accessTokenDecoded = jwt_decode(accessToken) as any;
    const accessTokenExpiration = parseInt(accessTokenDecoded.exp);
    if (!isExpired(accessTokenExpiration)) {
        return createSessionState(true, accessTokenDecoded);
    }

    const refreshTokenDecoded = jwt_decode(String(refreshToken)) as any;
    const refreshTokenExpiration = parseInt(refreshTokenDecoded.exp);
    if (!isExpired(refreshTokenExpiration)) {
        refresh();
        return createSessionState(true, refreshTokenDecoded);
    }

    clearTokenStorage();
    return initialSessionContext;
};

export const SessionContext = createContext({} as {
    user: SessionUser,
    isLoggedIn: boolean,
    setSession: (isLoggedIn: boolean, user: SessionUser) => void,
    startSession: () => void,
    refreshSession: () => void,
});

export const useSessionContext = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: any }) {

    const navigate = useNavigate();
    const [sessionState, setSessionState] = useState<SessionContextUser>(sessionContextSetup());

    const setSession = (isLoggedIn: boolean, data: SessionUser): void => {
        setSessionState({
            isLoggedIn,
            user: {
                '_id': data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
            } as SessionUser,
        });
    };

    const startSession = async () => {
        const accessToken = localStorage.getItem('AccessToken');
        const accessTokenDecoded = jwt_decode(String(accessToken)) as any;
        const accessTokenExpiration = parseInt(accessTokenDecoded.exp);

        if (!isExpired(accessTokenExpiration)) {
            const refreshedSession = createSessionState(true, {
                _id: accessTokenDecoded._id,
                firstName: accessTokenDecoded.firstName,
                lastName: accessTokenDecoded.lastName,
                username: accessTokenDecoded.username,
            });
            setSessionState(refreshedSession);
            navigate('/');
        } else {
            clearTokenStorage();
            navigate('/login');
        }
    };

    const refreshSession = async () => {
        const refreshToken = localStorage.getItem('RefreshToken');
        const refreshTokenDecoded = jwt_decode(String(refreshToken)) as any;
        const refreshTokenExpiration = parseInt(refreshTokenDecoded.exp);

        if (!isExpired(refreshTokenExpiration)) {
            const refreshed = await refresh();
            const refreshedUser = jwt_decode(refreshed) as SessionUser;
            const refreshedSession = createSessionState(true, {
                _id: refreshedUser._id,
                firstName: refreshedUser.firstName,
                lastName: refreshedUser.lastName,
                username: refreshedUser.username,
            });
            setSessionState(refreshedSession);
        } else {
            clearTokenStorage();
            navigate('/login');
        }
    };

    return (
        <SessionContext.Provider value={{ ...sessionState, setSession, startSession, refreshSession }}>
            {children}
        </SessionContext.Provider>
    );
};
