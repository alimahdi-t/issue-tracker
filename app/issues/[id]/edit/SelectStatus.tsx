"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const SelectStatus = ({ issue }: Props) => {
  const statues: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => {
          axios
            .patch("/api/issues/" + issue.id, {
              status,
            })
            .then(() => {
              toast.success("Status Changed.");
            })
            .catch(() => {
              toast.error("Changes could not be saved.");
            });
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {statues.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default SelectStatus;
