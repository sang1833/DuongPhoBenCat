import { Breadcrumb, TableThreeUser } from "@components";

const ManageUser = () => {
  return (
    <section className="relative">
      <Breadcrumb pageName="Quản lý nhân viên" />

      <div className="flex flex-col gap-10">
        <TableThreeUser />
      </div>
    </section>
  );
};

export default ManageUser;
