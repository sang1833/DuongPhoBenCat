import { Breadcrumb, TableThree } from "@components";

const Street = () => {
  return (
    <section className="relative">
      <Breadcrumb pageName="Quản lý đường phố" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </section>
  );
};

export default Street;
