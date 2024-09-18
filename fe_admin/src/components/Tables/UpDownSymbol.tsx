import { ArrowDown, ArrowUp } from "lucide-react";

const UpDownSymbol: React.FC<{ isDesc: boolean }> = ({ isDesc }) => {
  return <>{isDesc ? <ArrowDown /> : <ArrowUp />}</>;
};

export default UpDownSymbol;
