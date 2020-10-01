export default function convertHourToMinutes(time: string) {
    //8:00

    const [hour, minutes] = time.split(':').map(e => parseInt(e))
    const timeInMinutes = (hour * 60) + minutes
    return timeInMinutes
}