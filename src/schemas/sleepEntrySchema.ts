import {object, string} from "yup";

export const sleepEntrySchema = object({
    sleepDate: string().required("Sleep Date can't be empty"),
    sleepTime: string().required("Sleep time can't be empty"),
    wakeupTime: string().required("Wakeup time can't be empty")
})