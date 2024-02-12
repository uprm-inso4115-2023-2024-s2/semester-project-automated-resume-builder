import React from "react";
import {Text, Image} from 'react-native'
/**
 * Represents a user component.
 *
 * @param {object} props - The properties for the user component.
 * @param {number} props.id - The rating of the user.
 * @param {string} props.frst_name - The first name of the user.
 * @param {string} props.middle_initial - The middle name's initial of the user. (optional)
 * @param {string} props.frst_lst_name - The first lastname of the user.
 * @param {string} props.scnd_lst_name - The second last name of the user. (optional)
 * @param {number} props.phone_num - The phone number of the user.
 * @param {string} props.profile - The profile URL of the user. (optional)
 * @param {string} props.usr_name - The user_name of the user.
 * @param {string} props.email - The email of the user.
 * @param {number} props.password - The password of the user.

 */

const User = ({ id, frst_name, middle_initial, frst_lst_name, scnd_lst_name, phone_num, profile, usr_name, email, password }) => (
    <h1>
        <Text>{id}</Text>
        <Text>{frst_name}</Text>
        <Text>{middle_initial}</Text>
        <Text>{middle_initial}</Text>
        <Text>{frst_lst_name}</Text>
        <Text>{scnd_lst_name}</Text>
        <Text>{phone_num}</Text>
        <Text>{usr_name}</Text>
        <Text>{email}</Text>
        <Text>{password}</Text>
        <Image source={{uri: profile}}
        />
    </h1>
  );
  export default User;