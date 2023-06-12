export interface Booking {
	chosenDays?: string[];
	pris: number;
	daysInterval: number;
}
export interface User {
	booking?: Booking | null;
	phoneNumber?: string;
	createdAt?: number;
}
