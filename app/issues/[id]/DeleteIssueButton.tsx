import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color={"red"}>
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
};

export default DeleteIssueButton;
