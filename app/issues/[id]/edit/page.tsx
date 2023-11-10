import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import Loading from "./loading";
import { Flex, Select } from "@radix-ui/themes";
import SelectStatus from "@/app/issues/[id]/edit/SelectStatus";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <Loading />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Flex justify="between">
      <IssueForm issue={issue} />
      <SelectStatus issue={issue} />
    </Flex>
  );
};

export default EditIssuePage;
