import { Item, List, User } from "@prisma/client";

// get list by id
export default function List(
    props: React.PropsWithChildren<{
        list: List & {
            creator: User;
            items: Item[];
        }
    }>
) {
    const items = props.list?.items?.sort((a, b) => {
        if (a.done && !b.done) return 1;
        if (!a.done && b.done) return -1;
        return 0;
    })
}