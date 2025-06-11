"use client";

import { Issue, Status, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { statuses } from "../list/IssueStatusFilter";
import { useRouter } from "next/navigation";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const updateStatus = (status: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: status,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      })
      .then(() => {
        router.refresh()
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={updateStatus}
      >
        <Select.Trigger placeholder="Update status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Statuses</Select.Label>
            {statuses?.map((status) => (
                status.value && 
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
