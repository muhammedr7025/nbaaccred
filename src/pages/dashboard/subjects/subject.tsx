import { BoxLayout } from '../boxLayout'
import { Helmet } from 'react-helmet'
import TopBarSection from './topbar'
import { SubjectTable } from './SubjectTable'

const Subject = () => {
    return (
        <>
            <BoxLayout
                topBar={<TopBarSection />}
                table={<SubjectTable />}
                pagination={<></>}
                modal={<></>}
            />
        </>
    )
}


export default Subject