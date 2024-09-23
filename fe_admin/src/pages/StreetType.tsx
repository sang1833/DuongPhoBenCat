import { Breadcrumb, TableThreeSType } from "@components";

const StreetType = () => {
  return (
    <section className="relative">
      <Breadcrumb pageName="Quản lý loại tuyến đường" />

      <div className="flex flex-col gap-10">
        <TableThreeSType />
      </div>
    </section>
  );
};

export default StreetType;
