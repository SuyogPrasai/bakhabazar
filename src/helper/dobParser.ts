import { Dob } from "@/types/signup-types";

export function parseDob({ day, month, year } : Dob): string {
    return `${year}-${month}-${day}`
}