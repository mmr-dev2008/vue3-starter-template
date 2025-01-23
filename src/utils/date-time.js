import Pasoonate from 'pasoonate';

import DateTimeConstants from '@/constants/date-time';

class DateTime {
    /**
     * @type {CalendarManager}
     * @private
     */
    _date;

    constructor(timestamp) {
        this._date = Pasoonate.make(timestamp);
    }

    // Static

    static make(timestamp) {
        return new DateTime(timestamp).jalali();
    }

    static today() {
        return DateTime.make();
    }

    // Public

    calendar() {
        return this._date.name();
    }

    setCalendar(calendar) {
        switch (calendar) {
            case DateTimeConstants.Jalali:
                this.jalali();
                break;

            case DateTimeConstants.Gregorian:
                this.gregorian();
                break;

            case DateTimeConstants.Islamic:
                this.islamic();
                break;

            default:
                throw new TypeError(`Unexpected calendar name "${calendar}".`);
        }

        return this;
    }

    gregorian() {
        this._date.gregorian();
        return this;
    }

    jalali() {
        this._date.jalali();
        return this;
    }

    islamic() {
        this._date.islamic();
        return this;
    }

    parse(pattern, value) {
        // Because of the Pasoonate bug
        this._date.startOfMonth();

        this._date.parse(pattern, value);
        return this;
    }

    format(pattern) {
        return this._date.format(pattern);
    }

    clone() {
        const date = DateTime.make(this.getTimestamp());
        date.setCalendar(this.calendar());

        return date;
    }

    // Base

    setTimestamp(timestamp) {
        this._date.setTimestamp(timestamp);
        return this;
    }

    getTimestamp() {
        return this._date.getTimestamp();
    }

    getNativeDate() {
        return new Date(this.getTimestamp() * 1000);
    }

    getDay() {
        return this._date.getDay();
    }

    setDay(day) {
        return this._date.setDay(day);
    }

    getMonth() {
        return this._date.getMonth();
    }

    setMonth(month) {
        return this._date.setMonth(month);
    }

    getYear() {
        return this._date.getYear();
    }

    setYear(year) {
        return this._date.setYear(year);
    }

    dayOfWeek() {
        return this._date.dayOfWeek();
    }

    // Addition and subtraction

    addDay(count) {
        this._date.addDay(count);
        return this;
    }

    subDay(count) {
        this._date.subDay(count);
        return this;
    }

    addMonth(count) {
        this._date.addMonth(count);
        return this;
    }

    subMonth(count) {
        this._date.subMonth(count);
        return this;
    }

    addYear(count) {
        this._date.addYear(count);
        return this;
    }

    subYear(count) {
        this._date.subYear(count);
        return this;
    }

    // Difference

    age(instance) {
        const newInstance = Pasoonate.make(instance.getTimestamp());
        return this._date.age(newInstance);
    }

    diffInDays(instance) {
        const diffInSeconds = instance.getTimestamp() - this.getTimestamp();

        if (Math.abs(diffInSeconds) < DateTimeConstants.DayInSeconds) {
            return 0;
        }

        return Math.trunc(diffInSeconds / DateTimeConstants.DayInSeconds);
    }

    diffInMonths(instance) {
        const diffInSeconds = instance.getTimestamp() - this.getTimestamp();

        if (Math.abs(diffInSeconds) < DateTimeConstants.MonthInSeconds) {
            return 0;
        }

        return Math.trunc(diffInSeconds / DateTimeConstants.MonthInSeconds);
    }

    // Comparison

    isWeekend() {
        return this._date.isWeekend();
    }

    isPastInDay() {
        const today = DateTime.today();
        return today.diffInDays(this) < 0;
    }

    // Modifiers

    startOfDay() {
        this._date.startOfDay();
        return this;
    }

    startOfWeek() {
        this._date.startOfWeek();
        return this;
    }

    startOfMonth() {
        this._date.startOfMonth();
        return this;
    }

    endOfMonth() {
        this._date.endOfMonth();
        return this;
    }

    startOfYear() {
        this._date.startOfYear();
        return this;
    }

    endOfYear() {
        this._date.endOfYear();
        return this;
    }
}

export default DateTime;
