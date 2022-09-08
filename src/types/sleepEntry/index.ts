export interface SleepEntryFormInterface {
    sleepDate: string;
    sleepTime: string;
    wakeupTime: string
}
export interface SleepEntryDataInterface extends SleepEntryFormInterface{
    _id: string;
    id: string;
    user: string;
    sleepDuration: string;
}


 