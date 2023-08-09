import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "~/components/buttons/Button";
import Dashboard from "~/components/templates/Dashboard";
import { api } from "~/utils/api";

export default function Home() {
  const { data: session, status } = useSession();
  const createListMutation = api.lists.create.useMutation({
    onSuccess: () => {
      listsQuery.refetch();
    },
  });
  const deleteListMutation = api.lists.delete.useMutation({
    onSuccess: () => {
      listsQuery.refetch();
    },
  });
  // disable the query if the user is not logged in
  const listsQuery = api.lists.getAll.useQuery(undefined, {
    enabled: !!session,
  });

  return (
    <Dashboard>
      <div className="flex justify-between gap-3">
        <input
          type="text"
          id="name"
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Name of the new list"
        />
        <Button
          onClick={() => {
            const el = document.getElementById("name") as HTMLInputElement;
            createListMutation.mutate({ name: el.value });
            el.value = "";
          }}
        >
          Create
        </Button>
      </div>
      <ul role="list" className="gap-y-3 flex flex-col pt-3">
        {listsQuery.data?.map((list) => (
          <Link
            key={list.id}
            className="flex justify-between gap-x-6 py-5 hover:bg-gray-200 rounded px-3"
            href={`/lists/${list.id}`}
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-bold leading-6 text-gray-900">
                  {list.name}
                </p>
                <p className="text-sm leading-6 text-gray-600">
                  {list.creator.name}
                </p>
              </div>
            </div>
            <div className="ml-3 flex items-center gap-x-2 flex-row justify-center">
              <p className="text-sm leading-6 text-gray-600">
                <span className="font-bold">{list.items.length}</span> To-Do's
              </p>
              <Button
                onClick={() => {
                  deleteListMutation.mutate({ id: list.id });
                }}
                icon={TrashIcon}
                color="red"
              />
            </div>
          </Link>
        ))}
      </ul>
    </Dashboard>
  );
}
