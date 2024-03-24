import { DownloadIcon } from '@/assets/SvgTsx/download'
import { useAuth } from '@/components/AuthContext'
import { SubjectType } from '@/types/tables'

function PdfDownloadButton({ item }: { item: SubjectType }) {
    const { Subjects } = useAuth()
    function download() {
        Subjects.download(item.syllabus_url).then(console.log)
    }
    return (
        <div className="flex justify-center items-center">
            {item.syllabus_url ? <button className='flex justify-center items-center'
                onClick={download}>
                <DownloadIcon />
            </button> :
                ''
            }
        </div>
    )
}

export default PdfDownloadButton