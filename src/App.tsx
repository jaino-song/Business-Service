import '../assets/css/App.css'
import Greeting from './components/Greeting'
import PriceInfo from './components/PriceInfo'
import ReminderInfo from './components/ReminderInfo'
import ServiceInfo from './components/ServiceInfo'
import Thanks from './components/Thanks'
import logo from '../assets/images/logo/logo.png'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { loadBankAccountListJSON, loadVoucherJSON } from './store/loadData'

function App() {

  useEffect(() => {
    loadBankAccountListJSON();
    loadVoucherJSON();
}, []);

  return (
    <>
      <BrowserRouter>
        <header>
        <div className='logo-title'>
          {/* Must import logo using import */}
          <img className='logo' src={logo} alt="logo" />
          <h1 className='title'>인천 아이미래로</h1>
        </div>
          <nav>
            <Link className='nav-button' to="/greeting">첫인사</Link>
            <Link className='nav-button' to="/service-info">서비스 소개</Link>
            <Link className='nav-button' to="/price-info">금액 및 계좌번호</Link>
            <Link className='nav-button' to="/reminder-info">상담 후 리마인더</Link>
            <Link className='nav-button' to="/thanks">예약 완료</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/greeting" element={<Greeting />} />
            <Route path="/service-info" element={<ServiceInfo />} />
            <Route path="/price-info" element={<PriceInfo />} />
            <Route path="/reminder-info" element={<ReminderInfo />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </main>
        </BrowserRouter>
    </>
  )
}

export default App
