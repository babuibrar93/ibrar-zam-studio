import React, { useState, useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import Category from "../../components/CategoryAndTopics/Category";
import Topics from "../../components/CategoryAndTopics/Topics";
import CategoryModal from "../../components/Modal/CategoryModal";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  addCategory,
  getAllCategory,
} from "../../redux/Action/category.action";
import { toast } from "react-toastify";
import { addTopic } from "../../redux/Action/topics.action";

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

const Home = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState();

  const token = useSelector((state) => state.auth.token);

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedOption, setselectedOption] = useState("");

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const hanldeToggleCategory = () => {
    setToggle(false);
  };

  const hanldeToggleTopics = () => {
    setToggle(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    toggle ? setOpen(true) : setOpen(true);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const response = await dispatch(addCategory(name, 1, token));
    console.log(response);
    setMessage(response?.code);
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      addTopic(name, selectedOption?.id, selectedOption?.label, 1, token)
    );
    console.log(response);
    setMessage(response?.code);
  };

  const getAllCategoryData = async () => {
    const response = await dispatch(getAllCategory("1", token));
    // console.log("getAllCategoryData", response);
    setCategories(response?.data?.data);
  };

  const categoryOptions = categories?.map((category) => {
    return { id: category.id, label: category.name };
  });

  const handleSelector = (option) => {
    console.log("Selected option", option);
    setselectedOption(option);
  };

  console.log("categories", categories);
  console.log("categoryOptions", categoryOptions);

  useEffect(() => {
    getAllCategoryData();
  }, [toggle]);

  return (
    <div>
      {message === 201 &&
        toast.info("Added successfully.", {
          position: "top-center",
          toastId: "",
        })}
      <div className="mainBar">
        <div onClick={hanldeToggleCategory}>Category</div>
        <div onClick={hanldeToggleTopics}>Topics</div>
        <div onClick={handleAdd}>Add {toggle ? "Topic" : "Category"}</div>
      </div>
      {toggle ? <Topics /> : <Category />}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="a-right">
            <form className="infoForm authForm">
              <h3>Add {toggle ? "Topic" : "Category"}</h3>

              <>
                {toggle ? (
                  <>
                    <Select
                      placeholder="Select"
                      options={categoryOptions}
                      onChange={handleSelector}
                      value={selectedOption}
                      style={{ width: "100% !importtant" }}
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
                        onClick={handleAddTopic}
                      >
                        Add Topic
                      </button>
                    </div>
                  </>
                ) : (
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
                      <input
                        type="password"
                        className="infoInput"
                        placeholder="Password"
                        name="password"
                      />
                    </div>

                    <div>
                      <button
                        className="button infoButton"
                        onClick={handleAddCategory}
                      >
                        Add Category
                      </button>
                    </div>
                  </>
                )}
              </>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
