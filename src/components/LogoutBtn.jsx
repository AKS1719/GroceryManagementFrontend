import React from "react";
import { useDispatch } from "react-redux";
import authService from "../Services/authService.js";
import { logout } from "../store/authSlice.js";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };
    return (
        <button
            className=" bg-black text-white inline-block px-6 py-2 duration-200 hover:bg-blue rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
