import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
