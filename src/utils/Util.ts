class Util {
    static getHoursAndMinutesFromMinutes(minutes: number): string {
        if (!minutes) {
            return `0 hours 0 minutes`;
        }
        
        let hours = Math.floor(minutes / 60);
        let leftMinutes = minutes % 60;


        let hourStringNotation = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        let minuteStringNotation = `${leftMinutes} ${leftMinutes === 1 ? 'minute' : 'minutes'}`;

        return `${hours ? hourStringNotation : ''} ${leftMinutes ? minuteStringNotation : ''}`;
    }
}

export default Util;