"use client";
import { FindUserResult } from "@/components/FindUserResult";
import { Loader } from "@/components/Loader";
import { postReq } from "@/components/Menu";
import { useDebounceWithCallback } from "@/hooks/useDebounceWithCallback";
import { RootState } from "@/redux/store";
import { User } from "@/storage/models/Users";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { modules } from "../../page";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedUser, setSelectedUser] = useState<[string, string] | null>(
    null
  );
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<User[] | null>(null);
  const { project, user } = useSelector(({ project, user }: RootState) => ({
    project,
    user,
  }));

  const [priority, setPriority] = useState("No");

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const debounce = useDebounceWithCallback("", 300, async (value) => {
    if (value.length >= 3) {
      setSearchLoading(true);
      const { users } = await postReq("searchProjectUser", {
        value,
        ProjectID: project.ProjectID,
      });
      setSearchResult(users);
      setSearchLoading(false);
    }
  });
  

  const addTask = async () => {
    if (selectedUser) {
      setLoading(true);
      const resp = await postReq("addTask", {
        CreatorID: user.UserID,
        AssigneeID: selectedUser[0],
        title,
        description,
        priority,
        estimate:date?.toDate().getTime(),
      });
      console.log(resp);
      setLoading(false);
    }
  };

  const calculatedHeight =
    (isSearchLoading ? 80 : searchResult ? searchResult.length * 45 : 20) +
    "px";

  return (
    <>
      {isLoading && <Loader />}
      <Button
        sx={{ color: "#2e7d32 !important;" }}
        variant="outlined"
        color="success"
        onClick={handleOpen}
      >
        Add Task +
      </Button>
      <Modal className="modal" open={open} onClose={handleClose}>
        <div className="modal__add-user h80">
          <h1 style={{ marginBottom: "30px" }}>Add task to the project</h1>
          <TextField
            sx={{ margin: "0 !important" }}
            label="Task Title"
            variant="outlined"
            className="modal__add-user--entry"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <section>
              <DatePicker
                sx={{ marginRight: "30px !important" }}
                className="date"
                minDate={dayjs(new Date())}
                label="Select estimate date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
              <FormControl className="date" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ background: "rgb(20,20,20)" }}>
                  Priotity
                </InputLabel>
                <Select value={priority} onChange={handleChange}>
                  <MenuItem value={"No"}>No</MenuItem>
                  <MenuItem value={"Low"}>low</MenuItem>
                  <MenuItem value={"Medium"}>Meduim</MenuItem>
                  <MenuItem value={"High"}> High</MenuItem>
                </Select>
              </FormControl>
            </section>
          </LocalizationProvider>
          <TextField
            sx={{ margin: "0 !important" }}
            label="Assignee"
            variant="outlined"
            className="modal__add-user--entry"
            onChange={(e) => debounce(e.target.value)}
          />
          <FindUserResult
            calculatedHeight={calculatedHeight}
            selectedUser={selectedUser}
            isSearchLoading={isSearchLoading}
            searchResult={searchResult}
            setSelectedUser={setSelectedUser}
          />
          <QuillWrapper
            modules={modules}
            className="modal__editor ml10"
            placeholder="Your description here..."
            theme="snow"
            value={description}
            onChange={setDescription}
          />
          <Button variant="outlined" color="success" onClick={addTask}>
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
}
