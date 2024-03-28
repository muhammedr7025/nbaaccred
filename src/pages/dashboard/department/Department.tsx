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
import { BoxLayout, BoxLayout2 } from "../boxLayout";
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
import editIcon from '@assets/svg/editIcon.svg';
import TopBarSection from "./DepartmentTopBar";
import DepartmentTable from "./DepartmentTable";
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
    <BoxLayout2>
      <TopBarSection key="TopBar" />
      <DepartmentTable key="Table" />
    </BoxLayout2>

  );
};

const ModalBox = ({ close, data: dataReceived }: { close: () => void, data?: any }) => {
  const { setDepartments } = useAuth()


  function closer() {
    close()
    getDepartmentsFromDB().then(data => setDepartments(data as departmentType[]))
  }
  return (
    <form onSubmit={handleSubmit(closer, dataReceived)}>
      <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
        <div className="flex w-full gap-3">
          <Input placeholder="Enter name" defaultValue={dataReceived?.name} id="name">Name</Input>
          <Input placeholder="Enter name" defaultValue={dataReceived?.code} id="code">Code</Input>
        </div>
        <div className="flex w-full gap-3">
          <Input type="file" id="mission">{dataReceived?.mission_url ? 'Add New ' : ''}Mission</Input>
          <Input type="file" id="vision" >{dataReceived?.vision_url ? 'Add New ' : ''}Vision</Input>
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
// const TableSection = () => {
//   function downloadMission(url: string | null) {
//     return () => {
//       handleDownload('mission', url)
//     }
//   }
//   function downloadVision(url: string | null) {
//     return () => {
//       handleDownload('vision', url)
//     }
//   }
//   const { departments } = useAuth()
//   const { Modal: ModalDelete, open: openDelete, close: closeDelete, } = useModal({ fadeTime: 300, title: "Delete Department" })
//   const { Modal: ModalEdit, open: openEdit, close: closeEdit, } = useModal({ fadeTime: 300, title: "Edit Department" })
//   const [item, setItem] = useState({} as any)
//   return (
//     <>
//       <Table>
//         <Thead>
//           <THeadRow>
//             {header.map((item, index) => (
//               <THeadCell key={index}>{item}</THeadCell>
//             ))}
//             <THeadCell>
//               <div className="flex w-full items-center justify-center">
//                 Mission
//               </div>
//             </THeadCell>
//             <THeadCell>
//               <div className="flex w-full items-center justify-center">
//                 Vision
//               </div>
//             </THeadCell>
//             <THeadCell>
//               <div className="flex w-full items-center justify-center">
//                 Action
//               </div>
//             </THeadCell>
//           </THeadRow>
//         </Thead>
//         <TBody>
//           {departments?.map((item) => (
//             <TBodyRow key={item?.id}>
//               <TBodyCell className="">{item?.code}</TBodyCell>
//               <TBodyCell className="">{item?.name}</TBodyCell>
//               <TBodyCell >
//                 <div className="flex w-full items-center justify-center">

//                   {item?.mission_url ? <div className="cursor-pointer" onClick={downloadMission(item?.mission_url)}>
//                     <DownloadIcon />
//                   </div> :
//                     <UploadSection bucketName="mission" name={item?.name} code={item?.code} id={item?.id} />
//                   }
//                 </div>
//               </TBodyCell>
//               <TBodyCell >
//                 <div className="flex w-full items-center justify-center">

//                   {item?.vision_url ? <div className="cursor-pointer" onClick={downloadVision(item?.vision_url)}>
//                     <DownloadIcon />
//                   </div> :
//                     <UploadSection bucketName="vision" name={item?.name} code={item?.code} id={item?.id} />
//                   }
//                 </div>
//               </TBodyCell>
//               <TBodyCell >
//                 <div className="flex w-full items-center justify-center gap-5">
//                   <button className='cursor-pointer ' onClick={() => {
//                     setItem(item)
//                     openEdit()
//                   }}>
//                     <img src={editIcon} alt="edit" />
//                   </button>
//                   <button className='cursor-pointer ' onClick={() => {
//                     setItem(item)
//                     openDelete()
//                   }}>
//                     <img src={deleteIcon} alt="edit" />
//                   </button>

//                 </div>
//               </TBodyCell>
//             </TBodyRow>
//           ))}
//         </TBody>
//       </Table>

//       {createPortal(
//         <>
//           <ModalEdit>
//             <ModalBox close={closeEdit} data={item} />
//           </ModalEdit>
//           <ModalDelete>
//             <DeleteModal close={closeDelete} id={item.id} />
//           </ModalDelete>
//         </>
//         ,
//         document.body
//       )}
//     </>
//   );
// };
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
function handleSubmit(closer: () => void, data: any) {
  return async (event: React.FormEvent<HTMLFormElement>) => {
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
    if (data) {
      const currData = {
        name: departmentData?.name,
        code: departmentData?.code,
        mission_url: departmentData?.mission_url ?? null,
        vision_url: departmentData?.vision_url ?? null
      }
      const res = await supabase.from('departments').update(currData).eq('id', data.id)
      if (res.status === 204) {
        closer()
      }
    } else {
      Promise.all(promises).then(() => {
        supabase
          .from('departments')
          .insert(departmentData)
          .select('id')
          .then(() => closer())
      })
    }
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