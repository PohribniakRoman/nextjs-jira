"use client";
import { FindUserResult } from "@/components/FindUserResult";
import { Loader } from "@/components/Loader";
import { postReq } from "@/components/Menu";
import { useDebounceWithCallback } from "@/hooks/useDebounceWithCallback";
import { RootState } from "@/redux/store";
import { User } from "@/storage/models/Users";
import Avatar from "@mui/material/Avatar";
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
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { Task } from "@/storage/models/Tasks";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import moment from "moment";
import { hashCode, intToRGB } from "@/components/Navigation";
import { TaskComponent } from "@/components/Task";
import { ExportExel } from "@/components/ExportExel";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

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

const statusArr = ["To Do", "In Progress", "Testing", "Done"];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = (task: Task) => {
    setOpen1(true);
    setOpenedTask(task);
  };
  const handleClose1 = () => setOpen1(false);
  const [tasks, setTasts] = useState<Task[]>([]);
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

  const [openedTask, setOpenedTask] = useState<Task | null>(null);
  const [priority, setPriority] = useState("No");
  const [isEditing, setEditing] = useState(false);

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

  const [{ assignee, creator }, setACdata] = useState<{
    assignee: User | null;
    creator: User | null;
  }>({ assignee: null, creator: null });

  useEffect(() => {
    if (openedTask?.AssigneeID) {
      (async () => {
        const data = await postReq("getUserData", {
          AssigneeID: openedTask.AssigneeID,
          CreatorID: openedTask.CreatorID,
        });
        setACdata(data);
      })();
    }
  }, [openedTask?.TaskID]);

  const addTask = async () => {
    if (selectedUser) {
      setLoading(true);
      const { tasks } = await postReq("addTask", {
        CreatorID: user.UserID,
        AssigneeID: selectedUser[0],
        title,
        description,
        ProjectID: project.ProjectID,
        priority,
        estimate: date?.toDate().getTime(),
      });
      setLoading(false);
      setTasts(tasks);
      setOpen(false);
    }
  };

  const calculatedHeight =
    (isSearchLoading ? 80 : searchResult ? searchResult.length * 45 : 20) +
    "px";

  const fetchData = () => {
    if (project.ProjectID) {
      (async () => {
        const { tasks } = await postReq("getTasks", {
          ProjectID: project.ProjectID,
        });
        setTasts(tasks);
      })();
    }
  };

  useEffect(() => {
    fetchData();
  }, [project]);

  return (
    <>
      {isLoading && <Loader />}
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
                  <MenuItem value={"Medium"}>Medium </MenuItem>
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
      <div className="dashboard">
        <Button
          sx={{ color: "#2e7d32 !important;" }}
          variant="outlined"
          color="success"
          onClick={handleOpen}
        >
          Add Task +
        </Button>
        <ExportExel what={"Tasks"} json={tasks}/>
        <div className="dashboard__wrapper">
          {statusArr.map((status) => {
            return (
              <ul
                key={status}
                className="dashboard__tab"
                onDragOver={(e)=>e.preventDefault()}
                onDrop={async (e) => {
                  const {success} = await postReq("updateTaskStatus",{TaskID:e.dataTransfer.getData("Text"),status});
                  if(success){
                    fetchData();
                  }
                }}
              >
                <h1>{status}</h1>
                {tasks.map((task) =><TaskComponent status={status} key={task.TaskID} handleOpen1={handleOpen1} task={task}/>)}
              </ul>
            );
          })}
        </div>
      </div>
      <Modal className="modal" open={open1} onClose={handleClose1}>
        <div className="modal__project">
          <h1 style={{maxWidth:"70%",lineHeight:"36px"}}>{openedTask?.title}</h1>
          <div
            className="dashboard__tab--item-bage"
            style={{ top: "50px", right: "20px" }}
          >
            Priority {openedTask?.priority}
            {openedTask?.priority === "Low" && (
              <MdKeyboardArrowDown fill="orange" />
            )}
            {openedTask?.priority === "Medium" && (
              <MdKeyboardArrowUp fill="lightgreen" />
            )}
            {openedTask?.priority === "High" && (
              <MdKeyboardDoubleArrowUp fill="blue" />
            )}
          </div>
          <b>Estimate {moment(+openedTask?.estimate).fromNow()}</b>
          <i>
            Creator:
            <Avatar
              sx={{
                backgroundColor: intToRGB(
                  hashCode(
                    (creator?.name + " " + creator?.surname).toLowerCase()
                  )
                ),
              }}
            >
              {creator?.name[0]}
              {creator?.surname[0]}
            </Avatar>
            {creator?.name} {creator?.surname}
          </i>
          {user.UserID === creator?.UserID && (
            <Button
              sx={{ position: "absolute", right: "20px", top: "90px" }}
              color="error"
              variant="outlined"
              onClick={async () => {
                const { success } = await postReq("deleteTask", {
                  TaskID: openedTask?.TaskID,
                });
                if (success) {
                  fetchData();
                }
                setOpen1(false);
              }}
            >
              Delete Task
            </Button>
          )}
          {isEditing ? (
            <div className="edit">
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
              <Button
                variant="outlined"
                onClick={async () => {
                  if (selectedUser) {
                    const { success } = await postReq("updateTask", {
                      AssigneeID: selectedUser[0],
                      TaskID: openedTask?.TaskID,
                    });
                    if (success) {
                      const data = await postReq("getUserData", {
                        AssigneeID: selectedUser[0],
                        CreatorID: openedTask?.CreatorID,
                      });
                      setACdata(data);
                    }
                    setEditing(false);
                  }
                }}
              >
                Assign
              </Button>
            </div>
          ) : (
            <i>
              Assagnie:
              <Avatar
                sx={{
                  backgroundColor: intToRGB(
                    hashCode(
                      (assignee?.name + " " + assignee?.surname).toLowerCase()
                    )
                  ),
                }}
              >
                {assignee?.name[0]}
                {assignee?.surname[0]}
              </Avatar>
              {assignee?.name} {assignee?.surname}
              <Button variant="outlined" onClick={() => setEditing(true)}>
                Edit
              </Button>
            </i>
          )}
          <div className="modal__project--status">
            Status:
            <FormControl className="select" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ background: "rgb(20,20,20)" }}>
                  Priotity
                </InputLabel>
                <Select defaultValue={openedTask?.status} onChange={async ({target})=>{
                  const {success} = await postReq("updateTaskStatus",{TaskID:openedTask?.TaskID,status:target.value});
                  if(success){
                    fetchData();
                  }
                  }}>
                  <MenuItem value={"To Do"}>To Do</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Testing"}>Testing</MenuItem>
                  <MenuItem value={"Done"}> Done</MenuItem>
                </Select>
              </FormControl>
          </div>
          <div style={{lineHeight:"20px",fontSize:"16px"}} dangerouslySetInnerHTML={{ __html: openedTask?.description }} />
        </div>
      </Modal>
    </>
  );
}
