interface CourseDurationString {
	hours?: string;
	minutes?: string;
}

class Util {
	static getHoursAndMinutesFromMinutes(seconds: number): CourseDurationString {
		const minutes = Math.ceil(seconds / 60);
		if (!minutes) {
			return {};
		}

		const hours = Math.floor(minutes / 60);
		const leftMinutes = minutes % 60;

		const hourStringNotation = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
		const minuteStringNotation = `${leftMinutes} ${leftMinutes === 1 ? 'minute' : 'minutes'}`;

		return {
			hours: hours ? hourStringNotation : undefined,
			minutes: leftMinutes ? minuteStringNotation : undefined
		};
	}

	static getNumberRange(from: number, to: number): number[] {
		const result = [];
		for (let i = from; i <= to; i++) result.push(i);
		return result;
	}
}

export default Util;
