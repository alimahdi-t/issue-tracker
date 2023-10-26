import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1.8rem" className="mb-3" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
