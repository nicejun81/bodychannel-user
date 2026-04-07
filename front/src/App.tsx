import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import {
  HomePage,
  ComponentsShowcasePage,
  MyPage,
  MembershipPage,
  LessonPage,
  OnlineClassPage,
  ActivityPage,
  ShopPage,
  FavoritesPage,
  InvitePage,
  ReviewEventPage,
  AmbassadorPage,
  TrainerDetailPage,
  TrainerReviewsPage,
  ClassDetailPage,
  MeetupDetailPage,
  MeetupJoinPage,
  MeetupCreatePage,
  ReportPage,
  BlockedPage,
  FeedCreatePage,
  ProductDetailPage,
  FeedDetailPage,
  GymDetailPage,
  GymProductsPage,
  GymBeforeAfterPage,
  GymBeforeAfterDetailPage,
  GymReviewsPage,
  ChatPage,
  ChatRoomPage,
  CheckoutPage,
  AddOnsPage,
  CompletePage,
  PurchaseDocsPage,
  GroupLessonDetailPage,
  BranchSelectPage,
  ReservationPage,
  WalletPage,
} from './pages'

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentsShowcasePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/online-class" element={<OnlineClassPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/review-event" element={<ReviewEventPage />} />
        <Route path="/ambassador" element={<AmbassadorPage />} />
        <Route path="/trainer/:id" element={<TrainerDetailPage />} />
        <Route path="/trainer/:id/reviews" element={<TrainerReviewsPage />} />
        <Route path="/class/:id" element={<ClassDetailPage />} />
        <Route path="/meetup/new" element={<MeetupCreatePage />} />
        <Route path="/meetup/:id" element={<MeetupDetailPage />} />
        <Route path="/meetup/:id/join" element={<MeetupJoinPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/feed/new" element={<FeedCreatePage />} />
        <Route path="/feed/:id/edit" element={<FeedCreatePage />} />
        <Route path="/feed/:id" element={<FeedDetailPage />} />
        <Route path="/gym/:id" element={<GymDetailPage />} />
        <Route path="/gym/:id/products" element={<GymProductsPage />} />
        <Route path="/gym/:id/before-after" element={<GymBeforeAfterPage />} />
        <Route path="/gym/:id/before-after/:itemId" element={<GymBeforeAfterDetailPage />} />
        <Route path="/gym/:id/reviews" element={<GymReviewsPage />} />
        <Route path="/gym/:id/addons" element={<AddOnsPage />} />
        <Route path="/group-lesson/:id" element={<GroupLessonDetailPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatRoomPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/purchase/docs" element={<PurchaseDocsPage />} />
        <Route path="/branch" element={<BranchSelectPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/wallet/:type" element={<WalletPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/blocked" element={<BlockedPage />} />
      </Routes>
    </BrowserRouter>
  )
}
