import React, { createContext, useContext, useState } from "react";

/**
 * Provides the User Context for easy access of 
 * one user to the other components of the web page. 
 */
const UserContext = createContext();

// TEST These attributes values are here just for
// testing purposes TEST
// To clear the test just fill the attributes with ''
// To make them empty attributes

export const UserProvider = ({ children }) => {
	const [globalUser, setGlobalUser] = useState({
		id: '123',
		name: 'Fulano',
		middle_initial: 'Y',
		frst_lst_name: 'Fulanin',
		scnd_lst_name: 'Fulanon',
		phone_num: 12345678,
		profile: 'profileURL.com',
		usr_name: 'Fululu',
		email: 'fulanin@email.com',
		password: '******'
	});

	return (
		<UserContext.Provider value={{ globalUser, setGlobalUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);


