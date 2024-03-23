// import { DownloadIcon } from "@/assets/SvgTsx/download";
import { Pagination } from "@/components/Pagination";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/buttons/default";
import deleteIcon from '@assets/svg/deleteIcon.svg'

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
import { Option, Select } from "@/components/select/select";
import { createPortal } from "react-dom";
import { batchType } from "@/types/tables";
import { Helmet } from "react-helmet";

const header = [
  "No.",
  "Batch",
];
const currentYear = new Date().getFullYear() as number
const startYears = Array.from({ length: 25 }, (_, i) => currentYear + 5 - i)
const endYears = Array.from({ length: 25 }, (_, i) => currentYear - 10 + i)
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
  const { setBatch } = useAuth()
  return (
    <TopBar name="Staff">
      <Helmet>
        <title>Batch</title>
        <meta name="description" content="Batch List" />
      </Helmet>
      <Button onClick={() => {
        getBatchFromDB().then(res => setBatch(res as batch['Row'][]))
      }}>Reload</Button>
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
          <Select header="Start Year" id="start" defaultValue={currentYear}>
            {startYears.map((item, index) => <Option key={index} value={item} >{item}</Option>)}
            {/* <Option></Option> */}
          </Select>
          <Select header="End Year" id="end" defaultValue={currentYear + 4}>
            {endYears.map((item, index) => <Option key={index} value={item} >{item}</Option>)}
            {/* <Option></Option> */}
          </Select>
        </div>

        <div className="flex w-full gap-3 py-7">
          <Button className="flex-1 hover:bg-green-500 hover:text-white active:" type="submit">
            Save
          </Button>
          <Button className="flex-1 hover:bg-red-500 hover:text-white " onClick={close}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
const TableSection = () => {
  const { batchs } = useAuth()
  const { Modal: ModalDelete, open: openDelete, close: closeDelete, } = useModal({ fadeTime: 300, title: "Delete S" })

  return (
    <Table>
      <Thead>
        <THeadRow>
          <THeadCell >No.</THeadCell>
          <THeadCell className=" text-center">Batch</THeadCell>
          <THeadCell className=" text-center">Action</THeadCell>
        </THeadRow>
      </Thead>
      <TBody>
        {batchs?.map((item, index) => (
          <TBodyRow key={index} >
            <TBodyCell>{index + 1}</TBodyCell>
            <TBodyCell className=" text-center">{item.start_year + " - " + item.end_year}</TBodyCell>
            <TBodyCell className="flex gap-2 justify-center">
              <button className='cursor-pointer' onClick={openDelete}>
                <img src={deleteIcon} alt="edit" />
              </button>
              {createPortal(
                <ModalDelete>
                  <DeleteModal close={closeDelete} id={item.id} />
                </ModalDelete>,
                document.body
              )}
            </TBodyCell>
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
      start_year: e.currentTarget['start'].options[e.currentTarget['start'].selectedIndex].value as string,
      end_year: e.currentTarget['end'].options[e.currentTarget['end'].selectedIndex].value as string,
    }
    supabase
      .from('batch')
      .insert(batchData)
      .select('id')
      .then(() => closer())
  }
}
export function DeleteModal({ close, setValues = () => { }, id }: any) {
  const { setBatch } = useAuth()
  function handleSubmit(e: any) {
    e.preventDefault();
    supabase
      .from('batch')
      .delete()
      .eq('id', id)
      .then((res: any) => {
        if (res.status === 204) {
          getBatchFromDB().then((res) => setBatch(res as batch['Row'][]))
          close()
        }
      })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row flex-wrap gap-4 w-[250px] justify-center mt-8">
        <div className='flex w-full  justify-center pb-3'>
          Do you want to delete?
        </div>
        <div className='flex w-full gap-3 '>
          <Button type='submit' className='flex-1 hover:bg-red-500 hover:text-white active: '>
            Delete
          </Button>
          <Button onClick={close} className='flex-1 hover:bg-green-500 hover:text-white '>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}