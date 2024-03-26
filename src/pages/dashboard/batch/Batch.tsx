import { BoxLayout2 } from "../boxLayout";
import BatchTable from "./BatchTable";
import BatchTopbar from "./BatchTopbar";

export const Batch = () => {
  return (
    <BoxLayout2>
      <BatchTopbar key="TopBar" />
      <BatchTable key="Table" />
    </BoxLayout2>
  );
};
{/* <BoxLayout
topBar={<BatchTopbar />}
table={<BatchTable />}
pagination={<></>}
modal={<></>}
/> */}