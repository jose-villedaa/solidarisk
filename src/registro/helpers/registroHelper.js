export const isUserRegistered = () => {
    if (localStorage.getItem("registered")) {
        return true;
    }
    return false;
};