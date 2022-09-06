export interface SleepEntryFormInterface {
    sleepDate: string;
    sleepTime: string;
    wakeupTime: string
}
export interface SleepEntryDataInterface extends SleepEntryFormInterface{
    _id: string;
    id: string;
    sleepDuration: string;
    user: string;
}


 