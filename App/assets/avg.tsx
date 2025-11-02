export default function avg(arr: number[]) {
    let avg = 0
    for (const hit of arr) {
        avg += hit
    }
    return arr.length > 0 ? Math.floor(avg / arr.length) : 0;
}