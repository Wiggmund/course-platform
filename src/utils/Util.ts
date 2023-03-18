interface CourseDurationString {
    hours?: string;
    minutes?: string;
}

class Util {
    static getHoursAndMinutesFromMinutes(minutes: number): CourseDurationString {

        
        if (!minutes) {
            return {};
        }
        
        let hours = Math.floor(minutes / 60);
        let leftMinutes = minutes % 60;


        let hourStringNotation = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        let minuteStringNotation = `${leftMinutes} ${leftMinutes === 1 ? 'minute' : 'minutes'}`;

        return {
            hours: hours ? hourStringNotation : undefined,
            minutes: leftMinutes ? minuteStringNotation : undefined
        }
    }
}

export default Util;