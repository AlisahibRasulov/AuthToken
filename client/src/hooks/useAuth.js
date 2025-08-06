import { useSelector, useDispatch } from "react-redux";
import { login, logout, updateUser, setAuthStatus } from "../redux/authSlice";

export const useAuth = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    return{
    ...auth,
    login: (user, token, expiresAt) => dispatch(login({user, token, expiresAt})),
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser({user})),
    setAuthStatus: (status) => dispatch(setAuthStatus({status})),
};
};

