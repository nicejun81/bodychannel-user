import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, ComponentsShowcasePage, MyPage, MembershipPage, LessonPage, ReservationPage } from './pages'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentsShowcasePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </BrowserRouter>
  )
}
