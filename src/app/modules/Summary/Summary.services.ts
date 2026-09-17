import { getSummaryRepository } from "./Summary.repository";


export async function getSummaryServices() {
    return await getSummaryRepository()
}
