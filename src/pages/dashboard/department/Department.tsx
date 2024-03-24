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
import { departmentType, getDepartmentsFromDB, useAuth } from "@/components/AuthContext";
import { supabase } from "@/utils/supbase/supabaseClient";
import { DownloadIcon } from "@/assets/SvgTsx/download";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet";
import { convertCsvToJson } from "@/utils/convertCsvToJson";
import { bulkImportdepartments } from "./bulkImport";

const header = [
  "Code",
  "Department",

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
  const { Modal: ModalImport, open: openImport, close: closeImport } = useModal({ fadeTime: 300, title: "Import Student Data" })

  function reload() {
    getDepartmentsFromDB().then(data => setDepartments(data as departmentType[]))
  }
  return (
    <TopBar name="Department">
      <Helmet>
        <title>Department</title>
        <meta name="description" content="Department List" />
      </Helmet>
      <Button onClick={reload}>Reload</Button>
      <Button onClick={openModal}>Add Department</Button>
      <Button onClick={openImport}>Import</Button>
      {createPortal(
        <ModalImport>
          <form onSubmit={(e) => {
            e.preventDefault()
            const file = e.currentTarget['import'].files[0]
            convertCsvToJson(file).then((data) => {
              bulkImportdepartments(data)
            })
          }} className='flex flex-col gap-3 pt-5'>
            <Input name='import' type="file" />
            <Button type='submit'>Import</Button>
          </form>
        </ModalImport>
        ,
        document.body
      )}
      {/* <Button className="flex gap-2">
        <DownloadIcon />
        CSV
      </Button>  */}
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
          <Button className="flex-1 hover:bg-green-500 hover:text-white active: " type="submit">
            Save
          </Button>
          <Button className="flex-1 hover:bg-red-500 hover:text-white " onClick={close}>
            Cancel
          </Button></div>
      </div>
    </form>
  );
};
const TableSection = () => {
  function downloadMission(url: string | null) {
    return () => {
      handleDownload('mission', url)
    }
  }
  function downloadVision(url: string | null) {
    return () => {
      handleDownload('vision', url)
    }
  }
  const { departments } = useAuth()
  const { Modal: ModalDelete, open: openDelete, close: closeDelete, } = useModal({ fadeTime: 300, title: "Delete S" })

  return (
    <Table>
      <Thead>
        <THeadRow>
          {header.map((item, index) => (
            <THeadCell key={index}>{item}</THeadCell>
          ))}
          <THeadCell>
            <div className="flex w-full items-center justify-center">
              Mission
            </div>
          </THeadCell>
          <THeadCell>
            <div className="flex w-full items-center justify-center">
              Vision
            </div>
          </THeadCell>
          <THeadCell>
            <div className="flex w-full items-center justify-center">
              Action
            </div>
          </THeadCell>
        </THeadRow>
      </Thead>
      <TBody>
        {departments?.map((item) => (
          <TBodyRow key={item?.id}>
            <TBodyCell className="">{item?.code}</TBodyCell>
            <TBodyCell className="">{item?.name}</TBodyCell>
            <TBodyCell >
              <div className="flex w-full items-center justify-center">

                {item?.mission_url ? <div className="cursor-pointer" onClick={downloadMission(item?.mission_url)}>
                  <DownloadIcon />
                </div> :
                  <UploadSection bucketName="mission" name={item?.name} code={item?.code} id={item?.id} />
                }
              </div>
            </TBodyCell>
            <TBodyCell >
              <div className="flex w-full items-center justify-center">

                {item?.vision_url ? <div className="cursor-pointer" onClick={downloadVision(item?.vision_url)}>
                  <DownloadIcon />
                </div> :
                  <UploadSection bucketName="vision" name={item?.name} code={item?.code} id={item?.id} />
                }
              </div>
            </TBodyCell>
            <TBodyCell >
              <div className="flex w-full items-center justify-center">
                <button className='cursor-pointer ' onClick={openDelete}>
                  <img src={deleteIcon} alt="edit" />
                </button>
              </div>
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
function UploadSection({ bucketName, name, code, id }: { bucketName: string, name: string | null, code: string | null, id: number | string }) {
  const { setDepartments } = useAuth()
  if (!bucketName && !name && !code && !id) return
  const [file, setFile] = useState<File | undefined>()
  const [start, setStart] = useState(false)
  function handleUploadButton() {
    if (!file) {
      setStart(!start)
    }
    else {
      const fileName = `${name}-${code}+${new Date().getTime()}`
      const data = getFilePath(file, fileName)
      const uploading = uploadFile(bucketName, file, data?.path as string)
      uploading.then(() => updateDepartment(data, bucketName))
    }
    function updateDepartment(data: { file: File | undefined, path: string } | null, bucketName: string) {
      const updateData = bucketName === 'mission' ? { mission_url: data?.path } : bucketName === 'vision' ? { vision_url: data?.path } : null
      if (updateData) {
        supabase.from('departments').update(updateData).eq('id', id).select('id')
          .then(updateView)
      }
    }
    function updateView() {
      getDepartmentsFromDB().then(data => setDepartments(data as departmentType[]))

    }
  }
  return (
    <div className="flex items-center gap-2">
      <button className="cursor-pointer w-fit" onClick={handleUploadButton} >
        {file ? 'Upload' :
          <div className="rotate-180">
            <DownloadIcon />
          </div>
        }
      </button>
      {start && <Input type="file" className=" h-10"
        onChange={(e) => setFile(e.target.files?.[0])}
      />}
    </div>
  )
}
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
    let missionUpload, visionUpload
    const promises = []
    if (mission) {
      departmentData.mission_url = mission.path
      missionUpload = uploadFile('mission', mission.file, mission.path)
      promises.push(missionUpload)
    }
    if (vision) {
      visionUpload = uploadFile('vision', vision.file, vision.path)
      departmentData.vision_url = vision.path
      promises.push(visionUpload)
    }

    Promise.all(promises).then(() => {
      supabase
        .from('departments')
        .insert(departmentData)
        .select('id')
        .then(() => closer())
    })
  }
}
export function getFilePath(file: File | undefined, name: string) {
  if (!file) return null
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

async function downloadImage(bucketName: string, path: string) {
  return supabase.storage.from(bucketName).download(path)
    .then(({ data, error }) => {
      if (error) {
        console.log(error)
      }
      else if (data) return URL.createObjectURL(data)
    })
    .catch((error) => {
      console.log('Error downloading image: ', error)
      return null
    })
}


function handleDownload(bucketName: string, path: string | null) {
  if (path) {
    console.log(path)
    downloadImage(bucketName, path).then(url => {
      if (url) {
        window.open(url)
      }
    })
  }
}
export function DeleteModal({ close, setValues = () => { }, id }: any) {
  const { setDepartments } = useAuth()
  function handleSubmit(e: any) {
    e.preventDefault();
    supabase
      .from('departments')
      .delete()
      .eq('id', id)
      .then((res: any) => {
        if (res.status === 204) {
          getDepartmentsFromDB().then((res) => setDepartments(res as departmentType[]))
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