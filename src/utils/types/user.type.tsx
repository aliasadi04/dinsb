export interface Booking {
	chosenDays?: string[];
	pris: number;
	daysInterval: number;
}
export interface User {
	bookings?: Booking[] | [];
	phoneNumber?: string;
	createdAt?: number;
}
