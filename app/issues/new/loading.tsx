import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1.8rem" className="mb-3" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
