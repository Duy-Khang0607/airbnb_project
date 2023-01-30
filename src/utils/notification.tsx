// import "antd/dist/antd.css";
import { notification } from "antd";
import React, { ReactNode } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotificationWithIcon = (
  type: NotificationType,
  message: ReactNode,
  description: ReactNode
) => {
  notification[type]({
    message: message,
    description: description,
  });
};
