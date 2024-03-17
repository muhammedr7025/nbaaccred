import { DownloadIcon } from "@/assets/SvgTsx/download";
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
import { staffHeaderType, staffType } from "@/types/tables";
import { BoxLayout } from "../boxLayout";
import { useModal } from "@/components/modal";
import { Input } from "@/components/inputs/input";
import { Option, Select } from "@/components/select/select";

const header: staffHeaderType[] = [
  "Department",
  "Name",
  "Mobile",
  "Email",
  "Advisor",
  "Batch",
  "Action",
];
const data: staffType[] = [
  {
    department: "Physics",
    name: "Dr. A. K. Singh",
    mobile: "9876543210",
    email: "aksingh@example.com",
    advisor: true,
    batch: 2023,
    edit: () => {},
    delete: () => {},
  },
];
export const Department = () => {
  const { Modal, open } = useModal({ fadeTime: 300, title: "Add Staff" });
  function ModalLayout() {
    return (
      <Modal>
        <ModalBox />
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
      <Button onClick={openModal}>Add Staff</Button>
      <Button>Import</Button>
      <Button className="flex gap-2">
        <DownloadIcon />
        CSV
      </Button>
    </TopBar>
  );
};
const ModalBox = () => {
  return (
    <form>
      <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
        <div className="flex w-full gap-3">
          <Input placeholder="Enter name">Name</Input>
          <Input placeholder="Enter email">Email</Input>
        </div>
        <div className="flex w-full gap-3">
          <Input placeholder="Enter mobile">Mobile</Input>
          <Select header="Gender">
            <Option>Male</Option>
            <Option>Female</Option>
            <Option>Other</Option>
          </Select>
        </div>
        <div className="flex w-full gap-3">
          <Select header="Department">
            <Option>Department</Option>
            <Option>Physics</Option>
          </Select>
          <Select header="Batch">
            <Option>Department</Option>
            <Option>Physics</Option>
          </Select>
        </div>
        <div className="flex w-full gap-3">
          <Select header="Is Advisor">
            <Option>Yes</Option>
            <Option>No</Option>
          </Select>
          <div className=" flex-1"></div>
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
        {data.map((item, index) => (
          <TBodyRow key={index}>
            <TBodyCell>{item.department}</TBodyCell>
            <TBodyCell className="font-semibold">{item.name}</TBodyCell>
            <TBodyCell>{item.mobile}</TBodyCell>
            <TBodyCell>{item.email}</TBodyCell>
            <TBodyCell>{item.advisor ? "Yes" : "No"}</TBodyCell>
            <TBodyCell>{item.batch}</TBodyCell>
            <TBodyCell className="flex gap-2 ">
              <button onClick={item.edit}>Edit</button>
              <button onClick={item.delete}>Delete</button>
            </TBodyCell>
          </TBodyRow>
        ))}
      </TBody>
    </Table>
  );
};
