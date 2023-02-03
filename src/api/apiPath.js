export const apiPath = {
  //---------------- User --------------
  REGISTER: "/api/auth/signup",
  LOGIN: "/api/auth/signin",
  LOCATION: "/api/phong-thue",
  LOCATIONBYID: "/api/phong-thue/",

  
  // 1) Quản lý vé
  DANH_SACH_VE: "/api/tickets",
  THONG_TIN_CHI_TIET_VE: "/api/tickets/60c3291e900ea640e0fe4e47",
  CAP_NHAT_THONG_TIN_VE: "/api/tickets/60c31b6f9145e66a3bb0985b",
  XOA_VE: "/api/tickets/60c3267a900ea640e0fe4e46",
  TAO_VE: "/api/tickets",
  LAY_DS_VE_NGUOI_DUNG: "/api/tickets/by-user?userId=60e2b055e22b6b3b70243098",
  LAY_DS_VE_PHONG: "/api/tickets/by-room?roomId=60e2b057e22b6b3b7024309c",
  // 2)
  //---------------- Admin --------------
  PROFILE_PAGE: "/api/users/pagination",
 
};
