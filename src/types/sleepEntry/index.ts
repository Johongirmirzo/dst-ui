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
export interface SleepEntryListInterface{
    sleepEntries: SleepEntryDataInterface[]
}

export interface AverageCompProps  {
    sleepEntries: SleepEntryDataInterface[]
}
 