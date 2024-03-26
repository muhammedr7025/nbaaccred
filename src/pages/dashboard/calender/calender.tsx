import { BoxLayout } from '../boxLayout'
import { Helmet } from 'react-helmet'
import TopBarSection from './topbar'
import { CalenderTable } from './CalenderTable'

const Calender = () => {
    return (
        <>
            <BoxLayout
                topBar={<TopBarSection />}
                table={<CalenderTable />}
                pagination={<></>}
                modal={<></>}
            />
        </>
    )
}


export default Calender