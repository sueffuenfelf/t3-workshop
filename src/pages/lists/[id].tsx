import { Item, List, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "~/components/buttons/Button";
import Dashboard from "~/components/templates/Dashboard";
import { api } from "~/utils/api";

// get list by id
export default function List() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const listId = router.query.id as string;
    const listQuery = api.lists.getOne.useQuery({ id: listId });
    const toggleDoneMutation = api.items.toggleDone.useMutation({
        onSuccess: () => {
            listQuery.refetch();
        }
    });
    const createItemMutation = api.items.create.useMutation({
        onSuccess: () => {
            listQuery.refetch();
        }
    });
    const deleteItemMutation = api.items.delete.useMutation({
        onSuccess: () => {
            listQuery.refetch();
        },
    });

    const items = listQuery.data?.items?.sort((a, b) => {
        if (a.done && !b.done) return 1;
        if (!a.done && b.done) return -1;
        return 0;
    });
    return (
        <Dashboard>
            <div className="flex flex-col gap-y-3">
                <div className="flex justify-between gap-x-3">
                    <h1 className="text-2xl font-bold">{listQuery.data?.name}</h1>
                    <p className="text-sm leading-6 text-gray-600">
                        <span className="font-bold">{items?.filter((item) => !item.done).length}</span> To-Do's
                    </p>
                </div>
                <ul role="list" className="gap-y-3 flex flex-col pt-3">
                    {items?.map((item) => (
                        <li
                            key={item.id}
                            className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 rounded px-3"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-bold leading-6 text-gray-900">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                            <div className="ml-3 flex items-center gap-x-2 flex-row justify-center">
                                <input
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={(e) => {
                                        toggleDoneMutation.mutate({
                                            id: item.id,
                                            done: e.target.checked,
                                        });
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        deleteItemMutation.mutate({
                                            id: item.id,
                                        });
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between gap-3">
                    <input
                        type="text"
                        id="name"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Name of the new item"
                    />
                    <Button
                        onClick={() => {
                            const el = document.getElementById("name") as HTMLInputElement;
                            if (listQuery.data) {
                                createItemMutation.mutate({
                                    name: el.value,
                                    listId: listQuery.data.id,
                                });
                            }
                            el.value = "";
                        }}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </Dashboard>
    );
}