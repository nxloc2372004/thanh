import { del, get, patch, post } from "../utils/request";

export const login = async (email,password) => {
    const result =await get(`users?email=${email}&password=${password}`)
    return result;
}
export const register = async (option) => {
    const result =await post(`users`,option)
    return result;
}

export const checkExits = async (key,value) => {
    const result =await get(`users?${key}=${value}`)
    return result;
}
export const checkEmail = async (key,value) => {
    const result =await get(`infocustomer?${key}=${value}`)
    return result;
}

export const getCostumerList = async () => {
    const result =await get(`infocustomer`);
    return result;
}

export const editProfile = async (id, option) => {
    const result =await patch(`infocustomer/${id}`,option)
    return result;
}

export const createProfile = async (option) => {
    const result =await post(`infocustomer`,option)
    return result;
}
export const createTicket = async (option) => {
    const result =await post(`tickets`,option)
    return result;
}
export const createProject = async (option) => {
    const result =await post(`project`,option)
    return result;
}
export const createUpdateProject = async (option) => {
    const result =await post(`updateproject`,option)
    return result;
}
export const deleteCustomer = async (id) => {
    const result =await del(`infocustomer/${id}`)
    return result;
}
export const getCustomerItem = async (id) => {
    const result =await get(`infocustomer/${id}`)
    return result;
}
export const getProjectItem = async (id) => {
    const result =await get(`project/${id}`)
    return result;
}
export const getUpdateProject = async (id) => {
    const result =await get(`updateproject?idproject=${id}`)
    return result;
}
export const getTicketList = async () => {
    const result =await get(`tickets`);
    return result;
}
export const getAccountList = async () => {
    const result =await get(`users`);
    return result;
}
export const getProjectList = async () => {
    const result =await get(`project`);
    return result;
}
export const deleteAccount = async (id) => {
    const result =await del(`users/${id}`)
    return result;
}
export const deleteProject = async (id) => {
    const result =await del(`project/${id}`)
    return result;
}
export const editAccount = async (id, option) => {
    const result =await patch(`users/${id}`,option)
    return result;
}
export const editProject = async (id, option) => {
    const result =await patch(`project/${id}`,option)
    return result;
}
export const deleteTicket= async (id) => {
    const result =await del(`tickets/${id}`)
    return result;
}
export const responseTicket = async (id, option) => {
    const result =await patch(`tickets/${id}`,option)
    return result;
}
export const getTicketById = async (id) => {
    const result =await get(`tickets?idcustomer=${id}`)
    return result;
}
export const getCustomerById = async (id) => {
    const result =await get(`infocustomer?accountid=${id}`)
    return result;
}
