"use client";
import { Snackbar } from "@mui/material";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Notification } from "../Notification";

export const NotificationContainer = () => {
  const messages = useSelector(({ notification }: RootState) => notification);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={true}
    >
      <section className="notification-container">
        {messages.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            variant={notification.variant}
            id={notification.id}
          />
        ))}
      </section>
    </Snackbar>
  );
};
