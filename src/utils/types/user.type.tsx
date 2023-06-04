export default interface Booking{
    chosenDays?:string[],
    pris:number,
    daysInterval:number,
}
export default interface User{

    bookings?: Booking[] | [],
    phoneNumber?:string,
    createdAt?:number,

}