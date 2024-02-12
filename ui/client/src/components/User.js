import React from "react";
import {Text, Image} from 'react-native'
/**
 * Represents a user component.
 *
 * @param {number} User.id - The rating of the user.
 * @param {string} User.frst_name - The first name of the user.
 * @param {string} User.middle_initial - The middle name's initial of the user. (optional)
 * @param {string} User.frst_lst_name - The first lastname of the user.
 * @param {string} User.scnd_lst_name - The second last name of the user. (optional)
 * @param {number} User.phone_num - The phone number of the user.
 * @param {string} User.profile - The profile URL of the user. (optional)
 * @param {string} User.usr_name - The user_name of the user.
 * @param {string} User.email - The email of the user.
 * @param {number} User.password - The password of the user.

 */

class User{
    constructor(id, frst_name, middle_initial, frst_lst_name, scnd_lst_name, phone_num, profile, usr_name, email, password){
        this.id = id;
        this.frst_name = frst_name;
        this.middle_initial = middle_initial;
        this.frst_lst_name = frst_lst_name;
        this.scnd_lst_name = scnd_lst_name;
        this.phone_num = phone_num;
        this.profile = profile;
        this.usr_name = usr_name;
        this.email = email;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getFirstName() {
        return this.frst_name;
    }
    setFirstName(value) {
        this.frst_name = value;
    }
    getMiddleInitial() {
        return this.middle_initial;
    }
    setMiddleInitial(value) {
        this.middle_initial = value;
    }
    getFrstLstName() {
        return this.frst_lst_name;
    }
    setFrstLstName(value) {
        this.frst_lst_name = value;
    }
    getScndLstName() {
        return this.scnd_lst_name;
    }
    setScndLstName(value) {
        this.scnd_lst_name = value;
    }
    getPhoneNum() {
        return this.phone_num;
    }
    setPhoneNum(value) {
        this.phone_num = value;
    }
    getProfile() {
        return this.profile;
    }
    setProfile(value) {
        this.profile = value;
    }
    getUserName() {
        return this.usr_name;
    }
    setUserName(value) {
        this.usr_name = value;
    }
    getPassword() {
        return this.password;
    }
    setPassword(value) {
        this.password = this.password;
    }
};
  export default User;