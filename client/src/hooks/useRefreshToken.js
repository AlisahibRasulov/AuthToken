import { useCallback } from 'react'
import { useAuth } from './useAuth'
import axios from 'axios';

const useRefreshToken = () => {
    const { login, logout } = useAuth();
    const refreshAccessToken = useCallback(async () => {
        try {
            const response = await axios.post(
            "/api/auth/refresh",
            {},

            );
            const { user, accessToken, expiresAt } = response.data;
            if(response.status === 204) {
                logout();
            } else{
                login(user, accessToken, expiresAt);
            }          
        } catch (error) {
            logout();
        }
    }, [login, logout]);

  return refreshAccessToken;
}

export default useRefreshToken
