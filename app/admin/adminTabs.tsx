"use client";

import { UserTable } from "./userTable";
import { CampaignsTable } from "./campaignsTable";
import { Tabs, Tab } from "@nextui-org/react";

export const AdminTabs = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Dynamic Admin tabs"
          size="lg"
          color="primary"
          fullWidth
        >
          <Tab key="Campaigns" title="Campaigns">
            <CampaignsTable />
          </Tab>
          <Tab key="users" title="Users">
            <UserTable />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
