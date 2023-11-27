import { title } from "@/components/primitives";
import { AdminTabs } from "./adminTabs";


const AdminPage = () => {
  return (
    <>
      <div className="pb-8">
        <h1 className={title()}>Admin Dash.</h1>
        <p className="text-lg text-default-500">
          Hello admin, here you can manage users and campaigns.
        </p>
      </div>
      <AdminTabs />
    </>
  );
};

export default AdminPage;
