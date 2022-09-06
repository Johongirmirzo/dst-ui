import ENDPOINTS from "../../config/endpoints";
import {baseURL} from "../index";

interface EntryData {
    sleepDate: string;
    sleepTime: string;
    wakeupTime: string;
  }

const getAllSleepEntries =  async ()=>{
    return await baseURL.get(ENDPOINTS.GET_ALL_SLEEP_ENTRIES);
}
const getSleepEntry = async (sleepEntryId: string)=>{
    return await baseURL.get(`${ENDPOINTS.GET_SLEEP_ENTRY}/${sleepEntryId}`)
}
const addSleepEntry = async (sleepEntryData: EntryData)=>{
    return await baseURL.post(ENDPOINTS.ADD_SLEEP_ENTRY, sleepEntryData);
}
const updateSleepEntry = async (sleepEntryId: string, sleepEntryData: EntryData)=>{
    return await baseURL.put(`${ENDPOINTS.EDIT_SLEEP_ENTRY}/${sleepEntryId}`, sleepEntryData);
}
const removeSleepEntry = async (sleepEntryId: string)=>{
    return await baseURL.delete(`${ENDPOINTS.DELETE_SLEEP_ENTRY}/${sleepEntryId}`);
}

export {
    getAllSleepEntries,
    getSleepEntry,
    updateSleepEntry,
    addSleepEntry,
    removeSleepEntry
}