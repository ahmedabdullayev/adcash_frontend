import Categories from "@/types/Categories";

export default interface Posts {
    id: number,
    content: string,
    categories_id: Categories[]
}