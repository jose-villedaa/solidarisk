export const isUser = () => {
    return authUser("ROL_CLIENTE");
  };
  
  export const isDev = () => {
    return authUser("ROL_DEVELOPER");
  };
  
  export const isInstitucion = () => {
    return authUser("ROL_INSTITUCION");
  };
  
  export const isComunidad = () => {
    return authUser("ROL_COMUNIDAD");
  };

  export const isMedico = () => {
    return authUser("ROL_MEDICO");
  };
  
  export const authUser = (rol) => {
    const token = localStorage.getItem("token");
    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const userRole = decodedPayload.rol;
  
      if (userRole === rol) {
        return true;
      }
    }
    return false;
  };
  
  export const isUserAuthenticated = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  };
  