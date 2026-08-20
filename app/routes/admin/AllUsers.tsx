import React from "react";
import { Header } from "../../../Components";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import { cn } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/AllUsers";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);
  return { users, total };
};
const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users, total } = loaderData;

  const mappedUsers: UserData[] = (users ?? []).map((user: any) => ({
    id: user.$id ?? user.id ?? "",
    name: user.name ?? "",
    email: user.email ?? "",
    dateJoined: user.joinedAt ?? user.dateJoined ?? "",
    imageUrl: user.imageUrl ?? "",
    itineraryCreated: user.itineraryCreated ?? 0,
    status: user.status ?? "user",
  }));

  return (
    <>
      <main className="all-users wrapper">
        <Header
          title={`Manage Users `}
          description="Filter, sort, and manage all users in the system"
        />
        All Users Page Content
        <GridComponent dataSource={mappedUsers} key={mappedUsers.length} gridLines="None">
          <ColumnsDirective>
            <ColumnDirective
              field="name"
              headerText="Name"
              width="200"
              textAlign="Left"
              template={(props: UserData) => (
                <div className="flex items-center gap-1.5">
                  <img
                    className="rounded-full size-8  aspect-square"
                    src={props?.imageUrl}
                    alt="user"
                  />
                  <span className="font-medium text-gray-900">
                    {props.name}
                  </span>
                </div>
              )}
            />

            <ColumnDirective
              field="email"
              headerText="Email Adress"
              width="150"
              textAlign="Left"
            />

            <ColumnDirective
              field="dateJoined"
              headerText="Date joined"
              width="120"
              textAlign="Left"
            />

            <ColumnDirective
              field="itineraryCreated"
              headerText="Trip Created"
              width="130"
              textAlign="Left"
            />
            <ColumnDirective
              field="status"
              headerText="Type"
              width="100"
              textAlign="Left"
              template={(status: UserData) => (
                <article
                  className={cn(
                    "status-column",
                    status.status === "user" ? "bg-success-50" : "bg-light-300",
                  )}
                >
                  <div
                    className={cn(
                      "size-1.5 rounded-full",
                      status.status === "user"
                        ? "bg-success-500"
                        : "bg-gray-500",
                    )}
                  />
                  <h3
                    className={cn(
                      "font-inter text-xs font-medium",
                      status.status === "user"
                        ? "text-success-700"
                        : "text-gray-700",
                    )}
                  >
                    {status.status}
                  </h3>
                </article>
              )}
            />
          </ColumnsDirective>
        </GridComponent>
      </main>
    </>
  );
};

export default AllUsers;
