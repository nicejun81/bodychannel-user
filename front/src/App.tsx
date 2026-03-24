import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  ComponentsShowcasePage,
  MyPage,
  MembershipPage,
  LessonPage,
  ReservationPage,
  OnlineClassPage,
  ActivityPage,
  ShopPage,
  FavoritesPage,
  InvitePage,
  ReviewEventPage,
  AmbassadorPage,
  TrainerDetailPage,
  ClassDetailPage,
  MeetupDetailPage,
  ProductDetailPage,
  FeedDetailPage,
  GymDetailPage,
  GymProductsPage,
  ChatPage,
  ChatRoomPage,
} from './pages'

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
        <Route path="/online-class" element={<OnlineClassPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/review-event" element={<ReviewEventPage />} />
        <Route path="/ambassador" element={<AmbassadorPage />} />
        <Route path="/trainer/:id" element={<TrainerDetailPage />} />
        <Route path="/class/:id" element={<ClassDetailPage />} />
        <Route path="/meetup/:id" element={<MeetupDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/feed/:id" element={<FeedDetailPage />} />
        <Route path="/gym/:id" element={<GymDetailPage />} />
        <Route path="/gym/:id/products" element={<GymProductsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatRoomPage />} />
      </Routes>
    </BrowserRouter>
  )
}
