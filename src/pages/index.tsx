import { GetServerSidePropsContext } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const { data: session, status } = useSession();
  const createListMutation = api.lists.create.useMutation();
  const listsQuery = api.lists.getAll.useQuery();

  return (
    <>
    {
      !session ? (
        <button onClick={()=>{signIn('google')}}>login mit google</button>
      ) : (
        <button onClick={()=>{signOut()}}>logout</button>
      )
    }
    <input id="name"/>
    <button onClick={()=>{
      createListMutation.mutate({name:(document.getElementById("name") as HTMLInputElement).value})
    }}>Create</button>
      <ul role="list" className="divide-y divide-gray-100">
        {listsQuery.data?.map((list) => (
          <li key={list.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{list.name}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{list.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

