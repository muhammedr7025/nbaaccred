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
import { departmentType, getDepartmentsFromDB, useAuth } from "@/components/AuthContext";
import { supabase } from "@/utils/supbase/supabaseClient";

const header = [
  "Code",
  "Department",
  "Mission",
  "Vision",
  // "Action"
];
export const Department = () => {
  const { Modal, open, close } = useModal({ fadeTime: 300, title: "Add Department" });
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
  const { setDepartments } = useAuth()

  function reload() {
    getDepartmentsFromDB().then(data => setDepartments(data as departmentType[]))
  }
  return (
    <TopBar name="Staff">
      <Button onClick={reload}>Reload</Button>
      <Button onClick={openModal}>Add Department</Button>
      {/* <Button>Import</Button>
      <Button className="flex gap-2">
        <DownloadIcon />
        CSV
      </Button> */}
    </TopBar>
  );
};
const ModalBox = ({ close }: { close: () => void }) => {
  const { setDepartments } = useAuth()


  function closer() {
    close()
    getDepartmentsFromDB().then(data => setDepartments(data as departmentType[]))
  }
  return (
    <form onSubmit={handleSubmit(closer)}>
      <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
        <div className="flex w-full gap-3">
          <Input placeholder="Enter name" id="name">Name</Input>
          <Input placeholder="Enter name" id="code">Code</Input>
        </div>
        <div className="flex w-full gap-3">
          <Input type="file" id="mission">Mission</Input>
          <Input type="file" id="vision">Vision</Input>
        </div>
        <div className="flex w-full gap-3 py-7">
          <Button className="flex-1 hover:bg-green-500 hover:text-white active: ">
            Save
          </Button>
          <Button className="flex-1 hover:bg-red-500 hover:text-white ">
            Cancel
          </Button></div>
      </div>
    </form>
  );
};
const TableSection = () => {
  const { departments } = useAuth()
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
        {departments?.map((item, index) => (
          <TBodyRow key={index}>
            <TBodyCell className="">{item?.code}</TBodyCell>
            <TBodyCell className="">{item?.name}</TBodyCell>
            <TBodyCell className="">{''}</TBodyCell>
            <TBodyCell className="">{''}</TBodyCell>
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
    const departmentData = {
      name: e.currentTarget['name'].value as string,
      code: e.currentTarget['code'].value as string,
      mission_url: '',
      vision_url: ''
    }
    const fileName = `${departmentData?.name}-${departmentData?.code}+${new Date().getTime()}`
    const mission = getFilePath(e.currentTarget['mission'].files[0], fileName)
    const vision = getFilePath(e.currentTarget['vision'].files[0], fileName)
    departmentData.mission_url = mission.path
    departmentData.vision_url = vision.path
    const missionUpload = uploadFile('mission', mission.file, mission.path)
    const visionUpload = uploadFile('vision', vision.file, vision.path)
    Promise.all([missionUpload, visionUpload]).then(() => {
      supabase
        .from('departments')
        .insert(departmentData)
        .select('id')
        .then(() => closer())
    })
  }
}
export function getFilePath(file: File, name: string) {
  const fileExt = file.name.split('.').pop()
  return {
    file,
    path: `${name}.${fileExt}`
  }
}
async function uploadFile(bucketName: string, file: File, filePath: string) {
  return supabase.storage.from(bucketName).upload(filePath, file)
    .then(({ error: uploadError, data }) => {
      if (uploadError) {
        throw uploadError
      }
      else {
        console.log(data.path)
      }
    }).catch((error) => {
      console.log(error)
    })
}

