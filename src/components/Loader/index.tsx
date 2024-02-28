import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => (
  <Backdrop className="loader" open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
