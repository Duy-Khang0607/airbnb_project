import requester from "../../api/api";
import { apiPath } from "../../api/apiPath";
import actions from "./type";

// GET API heThongRap
export const fetchProfilePageAction = (page = 1) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.PROFILE_PAGE,
        params: {
          skip: page,
          limit: 3,
        },
      });

      //     next({
      //       type: actions.SET_PROFILE,
      //       payload: res.data.content,
      //     });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};
