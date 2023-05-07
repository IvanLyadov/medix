import moment from "moment";

export const formatDateTime = (dateTime: string): string => {
    const date = moment.utc(dateTime);
    const localDate = date.local();
    return localDate.format('YYYY-MM-DD HH:mm');
}

export const formatCalendarDateTime = (dateTime: string): Date => {
    const date = moment.utc(dateTime);
    const localDate = date.local();
    return new Date(localDate.toString());
}

export const formatDate = (dateTime: string): string => {
    const date = moment.utc(dateTime);
    const localDate = date.local();
    return localDate.format('YYYY-MM-DD');
}

export const formatDateToUtcString = (date: Date): string => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return utcDate.toISOString();
}
