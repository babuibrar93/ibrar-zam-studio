import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../../redux/Action/category.action";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

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

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  console.log("categories", message);

  const getAllCategoryData = async () => {
    const response = await dispatch(getAllCategory("1", token));
    // console.log("getAllCategoryData", response);
    setCategories(response?.data?.data);
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteCategory("delete", id, token));
    console.log("response", response);
    setMessage(response?.message);
  };

  const handleEdit = (category) => {
    setOpen(true);
    setName(category.name);
    setId(category.id);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      updateCategory("put", name, "1", id, token)
    );
    console.log(response);
    setMessage(response?.message);
  };

  useEffect(() => {
    getAllCategoryData();
  }, [message, open]);

  return (
    <>
      {message === "Compentence Category deleted successfully!"
        ? toast.info("Category deleted successfully!", {
            position: "top-center",
            toastId: "",
          })
        : message === "Compentence Category updated successfully!" &&
          toast.info("Category updated successfully!", {
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
                  <h3>Update Category</h3>

                  <>
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
                        onClick={handleUpdate}
                      >
                        Update Category
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
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Create Date</StyledTableCell>
              <StyledTableCell align="center">Update Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell component="th" scope="row">
                  {category.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.image ? (
                    <img src={category.image} style={{ height: "1rem" }} />
                  ) : (
                    "No Image"
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.created_at?.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.updated_at?.split("T")[0]}
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
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(category.id)}
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
