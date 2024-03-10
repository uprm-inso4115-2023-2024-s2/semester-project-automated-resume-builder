
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [globalUser, setGlobalUser] = useState({
            id: '', 
            name: '', 
            middle_initial: '', 
            frst_lst_name: '', 
            scnd_lst_name: '', 
            phone_num: 12345678,  
            profile: '', 
            usr_name:'', 
            email: '', 
            password:''
          });


    const logout = () => {
      localStorage.removeItem('userToken'); // Borrar el token
      setGlobalUser({
        id: '', 
        name: '', 
        middle_initial: '', 
        frst_lst_name: '', 
        scnd_lst_name: '', 
        phone_num: 12345678,  
        profile: '', 
        usr_name:'', 
        email: '', 
        password:''
      }); // Restablecer el estado global del usuario o establecer un estado inicial
      // Opcional: Redirigir al usuario a la página de inicio o de inicio de sesión
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');
            if (token) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setGlobalUser({
                          id: userData.user_id, 
                          name: userData.name, 
                          middle_initial: userData.middle_initial, 
                          frst_lst_name: userData.frst_lst_name, 
                          scnd_lst_name: userData.scnd_lst_name, 
                          phone_num: userData.phone_number,  
                          profile: userData.profile, 
                          usr_name: userData.name, 
                          email: userData.email, 
                          password: ""
                        });
                        console.log(userData);
                    } else {
                        // Si el token no es válido o hubo otro error, puedes manejarlo aquí
                        setGlobalUser({
                          id: '123', 
                          name: 'Fulano', 
                          middle_initial: 'Y', 
                          frst_lst_name: 'Fulanin', 
                          scnd_lst_name: 'Fulanon', 
                          phone_num: 12345678,  
                          profile: 'profileURL.com', 
                          usr_name:'Fululu', 
                          email: 'fulanin@email.com', 
                          password:'******'
                        });
                        console.error('Error al obtener los datos del usuario.');
                        localStorage.removeItem('userToken'); // Considera remover el token si es inválido
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ globalUser, setGlobalUser, logout  }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
