import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "@/app/issues/IssueActions";
import { Issue, Status } from "@prisma/client";
import { object } from "zod";
import {
  ArrowUpIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";
import { sort } from "next/dist/build/webpack/loaders/css-loader/src/utils";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; sort: "asc" | "desc" };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
    sort?: "asc" | "desc";
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const Statuses = Object.values(Status);

  const status = Statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =
    (columns.map((column) => column.value).includes(searchParams.orderBy) &&
      searchParams.sort === "asc") ||
    searchParams.sort === "desc"
      ? { [searchParams.orderBy]: searchParams.sort }
      : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sort:
                        searchParams.sort === "desc" || !searchParams.sort
                          ? "asc"
                          : "desc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy &&
                  searchParams.sort === "asc" && (
                    <TriangleUpIcon className="inline" />
                  )}
                {column.value === searchParams.orderBy &&
                  searchParams.sort === "desc" && (
                    <TriangleDownIcon className="inline" />
                  )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;
export default IssuesPage;
