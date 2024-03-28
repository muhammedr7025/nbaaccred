import { DownloadIcon } from '@/assets/SvgTsx/download'
import { useAuth } from '@/components/AuthContext'
import { SubjectType } from '@/types/tables'

function PdfDownloadButton({ url, bucketName }: { url: string, bucketName: string }) {
    const { Departments } = useAuth()
    function download() {
        Departments.download(url, bucketName).then(console.log)
    }
    return (
        <div className="flex justify-center items-center">
            {url ? <button className='flex justify-center items-center'
                onClick={download}>
                <DownloadIcon />
            </button> :
                ''
            }
        </div>
    )
}

export default PdfDownloadButton