"use client";
import { useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { NotificationType } from "@/redux/reducers/notificationReducer";
import { useCallback, useEffect } from "react";

type NotifiationProps = Omit<NotificationType, "date">;

export const Notification = ({ message, variant, id }: NotifiationProps) => {
  const dispatch = useDispatch();

  const deleteNotification = useCallback(() => {
    dispatch({ type: "THROW_NOTIFICATION", payload: {id} });
  }, [id, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "THROW_NOTIFICATION", payload: {id} });
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Alert
      onClose={deleteNotification}
      severity={variant as any}
      sx={{ width: "100%", minWidth: "400px", marginTop:"15px" }}
    >
      {message}
    </Alert>
  );
};
