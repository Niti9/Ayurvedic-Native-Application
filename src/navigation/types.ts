export type ConsultationStackParamList = {
  DoctorList: undefined;
  DoctorDetail: { doctorId: string };
  Booking: { doctorId: string; slotId?: string };
  UpcomingBooking: undefined;
};

export type ShopStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Wishlist: undefined;
  Checkout: undefined;
};

export type RecordsStackParamList = {
  Timeline: undefined;
  RecordDetail: { recordId: string };
};

export type BottomTabParamList = {
  Consultation: undefined;
  Shop: undefined;
  Records: undefined;
  Profile: undefined;
};
