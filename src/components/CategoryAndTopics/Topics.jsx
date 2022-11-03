import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTopics,
  getAllTopics,
  updateTopic,
} from "../../redux/Action/topics.action";
import Select from "react-select";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { getAllCategory } from "../../redux/Action/category.action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CategoryAndToics() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOption, setselectedOption] = useState("");
  const [open, setOpen] = React.useState();
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  console.log("categories", categories);

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const getAllTopicsData = async () => {
    const response = await dispatch(getAllTopics("1", token));
    // console.log("getAllTopicsData", response);
    setTopics(response?.data?.data);
  };

  const getAllCategoryData = async () => {
    const response = await dispatch(getAllCategory("1", token));
    // console.log("getAllCategoryData", response);
    setCategories(response?.data?.data);
  };

  const topicOptions = categories?.map((category) => {
    return { id: category.id, label: category.name };
  });

  console.log("topicOptions", topicOptions);


  const handleSelector = (option) => {
    console.log("Selected option", option);
    setselectedOption(option);
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteTopics("delete", id, token));
    console.log("response", response);
    setMessage(response?.message);
  };

  const handleUpdateTopic = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      updateTopic("PUT", selectedOption.id, name, id, "1", token)
    );
    setMessage(response.message);
  };

  const handleEdit = (topic) => {
    console.log(topic.category.name);
    setOpen(true);
    setName(topic.name);
    setId(topic.id);
    setselectedOption(topic.category.name);
  };

  useEffect(() => {
    getAllTopicsData();
    getAllCategoryData();
  }, [message, open]);

  return (
    <>
      {message === "Topic deleted successfully!"
        ? toast.info(message, {
            position: "top-center",
            toastId: "",
          })
        : message === "Topic updated successfully!" &&
          toast.info(message, {
            position: "top-center",
            toastId: "",
          })}
      {open && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="a-right">
                <form className="infoForm authForm">
                  <h3>Update Topic</h3>

                  <>
                    <Select
                      placeholder="Select"
                      options={topicOptions}
                      onChange={handleSelector}
                      value={selectedOption}
                    />

                    <div>
                      <input
                        type="text"
                        placeholder="name"
                        className="infoInput"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div>
                      <button
                        className="button infoButton"
                        onClick={handleUpdateTopic}
                      >
                        Update Topic
                      </button>
                    </div>
                  </>
                </form>
              </div>
            </Box>
          </Modal>
        </>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Topic Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Create Date</StyledTableCell>
              <StyledTableCell align="center">Update Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics?.map((topic) => (
              <StyledTableRow key={topic.id}>
                <StyledTableCell component="th" scope="row">
                  {topic.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {topic.image ? (
                    <img src={topic.image} style={{ height: "1rem" }} />
                  ) : (
                    "No Image"
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {topic.created_at?.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {topic.updated_at?.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {<DeleteIcon /> | <EditIcon />} */}
                  <div
                    style={{
                      gap: "1rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(topic)}
                    >
                      Edit
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(topic.id)}
                    >
                      Delete
                    </span>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
