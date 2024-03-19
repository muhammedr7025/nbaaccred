// import { DownloadIcon } from "@/assets/SvgTsx/download";
import { Pagination } from "@/components/Pagination";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/buttons/default";
import {
  TBody,
  TBodyCell,
  TBodyRow,
  THeadCell,
  THeadRow,
  Table,
  Thead,
} from "@/components/table/table";
import { BoxLayout } from "../boxLayout";
import { useModal } from "@/components/modal";
import { Input } from "@/components/inputs/input";
import { getBatchFromDB, useAuth } from "@/components/AuthContext";
import { batch } from "@/utils/supbase/supabase";
import { supabase } from "@/utils/supbase/supabaseClient";

const header = [
  "No.",
  "Batch",
  "", "", ""
];

export const Batch = () => {
  const { Modal, open, close } = useModal({ fadeTime: 300, title: "Add Batch" });
  function ModalLayout() {
    return (
      <Modal>
        <ModalBox close={close} />
      </Modal>
    );
  }
  return (
    <BoxLayout
      topBar={<TopBarSection openModal={open} />}
      table={<TableSection />}
      pagination={<Pagination start={1} total={5} />}
      modal={<ModalLayout />}
    />
  );
};
const TopBarSection = ({ openModal }: { openModal: () => void }) => {
  return (
    <TopBar name="Staff">
      <Button onClick={openModal}>Add Batch</Button>
      {/* <Button>Import</Button>
      <Button className="flex gap-2">
        <DownloadIcon />
        CSV
      </Button> */}
    </TopBar>
  );
};
const ModalBox = ({ close }: any) => {
  const { setBatch } = useAuth()
  function closer() {
    close()
    getBatchFromDB().then(data => setBatch(data as batch['Row'][]))
  }
  return (
    <form onSubmit={handleSubmit(closer)}>
      <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
        <div className="flex w-full gap-3">
          <Input id="start" placeholder="Enter name">Start Year</Input>
          <Input id='end' placeholder="Enter email">End Year</Input>
        </div>

        <div className="flex w-full gap-3 py-7">
          <Button className="flex-1 hover:bg-green-500 hover:text-white active: ">
            Save
          </Button>
          <Button className="flex-1 hover:bg-red-500 hover:text-white ">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
const TableSection = () => {
  const { batchs } = useAuth()
  return (
    <Table>
      <Thead>
        <THeadRow>
          {header.map((item, index) => (
            <THeadCell key={index}>{item}</THeadCell>
          ))}
        </THeadRow>
      </Thead>
      <TBody>
        {batchs?.map((item, index) => (
          <TBodyRow key={index} >
            <TBodyCell>{index + 1}</TBodyCell>
            <TBodyCell >{item.start_year + " - " + item.end_year}</TBodyCell>
            {/* <TBodyCell className="flex gap-2 ">
              <button onClick={item.edit}>Edit</button>
              <button onClick={item.delete}>Delete</button>
            </TBodyCell> */}
          </TBodyRow>
        ))}
      </TBody>
    </Table>
  );
};

function handleSubmit(closer: () => void) {
  return (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const e: any = event
    const batchData = {
      start_year: e.currentTarget['start'].value as string,
      end_year: e.currentTarget['end'].value as string
    }
    supabase
      .from('batch')
      .insert(batchData)
      .select('id')
      .then(() => closer())
  }
}