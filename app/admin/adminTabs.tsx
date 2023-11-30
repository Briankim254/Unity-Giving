"use client";

import { UserTable } from "./userTable";
import { FaHandsHelping, FaUserShield } from "react-icons/fa";
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
          <Tab
            key="Campaigns"
            title={
              <div className="flex items-center space-x-2">
                <FaHandsHelping size={30} />
                <span>Campaigns</span>
              </div>
            }
          >
            <CampaignsTable />
          </Tab>
          <Tab
            key="users"
            title={
              <div className="flex items-center space-x-2">
                <FaUserShield size={30} />
                <span>Users</span>
              </div>
            }
          >
            <UserTable />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
