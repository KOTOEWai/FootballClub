import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, {
        user: null 
    });

    useEffect(() => {
               axios.get("http://localhost:3000/user/secure/auth",
                { withCredentials: true })
               .then((res) => {
                if (res.data) {
                    dispatch({ type: "LOGIN", payload: res.data });
                } else {
                    dispatch({ type: "LOGOUT" });
                }
            })
            .catch((err) => {
                if(err.response && err.response.statusCode ===401){
                    console.log("Error: " + err.response);
                    alert("Authentication failed, please login again");
                    dispatch({ type: "LOGOUT" });
                }
            });
    }, []);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export  { AuthContext, AuthProvider };
