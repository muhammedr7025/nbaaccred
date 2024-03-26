import { DownloadIcon } from '@/assets/SvgTsx/download'
import { useAuth } from '@/components/AuthContext'
import { CalenderType } from '@/types/tables'

function PdfDownloadButton({ item }: { item: CalenderType }) {
    const { Calenders } = useAuth()
    function download() {
        Calenders.download(item.calender_url).then(console.log)
    }
    return (
        <div className="flex justify-center items-center">
            {item.calender_url ? <button className='flex justify-center items-center'
                onClick={download}>
                <DownloadIcon />
            </button> :
                ''
            }
        </div>
    )
}

export default PdfDownloadButton