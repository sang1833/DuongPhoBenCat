import { Breadcrumb } from "@components";
import TableThreeSuggest from "@/components/Tables/TableThreeSuggest";

const Suggest = () => {
  return (
    <section className="relative">
      <Breadcrumb pageName="Quản lý phản hồi" />

      <div className="flex flex-col gap-10">
        <TableThreeSuggest />
      </div>
    </section>
  );
};

export default Suggest;
