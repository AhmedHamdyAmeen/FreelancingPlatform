import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import buttons from "../../FindProjects/buttons.module.css";
let token = localStorage.getItem("token");

export default function ProjectForm(props) {
  const wallet = 0;
  const { updateId } = props;
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    budget: 0,
    isInternship: false,
    duration: 0,
    connects: 1,
  });
  const [projectErr, setProjectErr] = useState({
    titleErr: "",
    descriptionErr: "",
    categoryErr: "",
    skillsErr: "",
    durationErr: "",
    // connectsErr: "",
  });
  const history = useHistory();

  const categoriesApi = axios({
    url: `http://localhost:8080/category`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const skillsApi = axios({
    url: `http://localhost:8080/skill`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const cancelHandler = () => {
    history.push("/project");
  };

  const changeHandler = (e) => {
    let value;
    if (e.target.id === "isInternship") {
      value = e.target.checked;
      console.log(value);
      if (e.target.checked) {
        e.target.parentElement.parentElement.children[0].children[1].disabled = true;
        e.target.parentElement.parentElement.children[0].children[1].value = "";
        // delete project.budget;
      } else
        e.target.parentElement.parentElement.children[0].children[1].disabled = false;
    } else if (e.target.id === "skills") {
      let selectedArray = [];
      for (let index = 0; index < e.target.options.length; index++) {
        if (e.target.options[index].selected) {
          selectedArray.push(e.target.options[index].value);
        }
      }
      value = selectedArray;
    } else {
      value = e.target.value;
    }
    setProject({
      ...project,
      [e.target.id]: value,
    });

    // validationHandler(e.target.id, project[e.target.id]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let values = Object.values(project).every((v) => v === "");
    let errors = Object.values(projectErr).every((e) => e !== "");
    console.log(errors, values);
    if (!errors && values) {
      let api;
      if (updateId) {
        api = axios({
          url: `http://localhost:8080/project/${updateId}`,
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: project,
        });
      } else {
        api = axios({
          url: `http://localhost:8080/project`,
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: project,
        });
      }
      api
        .then((res) => {
          console.log(res);
          history.push(`/project/${res.data.data}/private`);
        })
        .catch((error) => {
          console.log(error.code, error.message, error.response.data);
        });
    }
  };

  const validationHandler = (field, value) => {
    switch (field) {
      case "title":
        setProjectErr({
          ...projectErr,
          titleErr: value.length === 0 ? "project title is required" : "",
        });
        break;
      case "description":
        setProjectErr({
          ...projectErr,
          descriptionErr:
            value.length === 0
              ? "project description is requiured"
              : value.length < 100 || value.length > 1000
              ? "project description length should be between 100,1000"
              : "",
        });
        break;
      case "category":
        setProjectErr({
          ...projectErr,
          categoryErr: value.length === 0 ? "project category is required" : "",
        });
        break;
      case "budget":
        setProjectErr({
          ...projectErr,
          budgetErr: project.isInternship
            ? ""
            : value > wallet
            ? "you don't have enough money in your wallet"
            : value < 5
            ? "project budget should not be less than $5"
            : "",
        });
        break;
      // case "isInternship":
      //   setProjectErr({
      //     ...projectErr,
      //     budgetErr: value === true && "",
      //   });
      //   break;
      case "skills":
        setProjectErr({
          ...projectErr,
          skillsErr:
            value.length === 0
              ? "project skills are required"
              : value.length < 3 || value.length > 20
              ? "project skills should be between 3 and 20"
              : "",
        });
        break;
      case "duration":
        setProjectErr({
          ...projectErr,
          durationErr:
            value.length === 0
              ? "project duration are required"
              : value < 3 || value > 20
              ? "project duration should be between 3 and 20"
              : "",
        });
        break;
      case "connects":
        setProjectErr({
          ...projectErr,
          connectsErr:
            // value.length === 0
            //   ? "project connects are required"
            //   :
            value < 1 || value > 20
              ? "project connects should be between 1 and 20"
              : "",
        });
        break;
      default:
        setProjectErr({ ...projectErr });
    }
  };

  useEffect(() => {
    if (updateId) {
      axios({
        url: `http://localhost:8080/project/${updateId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((oldProject) => {
        setProject(oldProject.data);
      });
    }
    categoriesApi
      .then((res) => {
        setCategories(res.data);
        skillsApi.then((res) => {
          setSkills(res.data);
        });
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("title", project.title);
  }, [project.title]);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("description", project.description);
  }, [project.description]);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("category", project.category);
  }, [project.category]);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("skills", project.skills);
  }, [project.skills]);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("budget", project.budget);
  }, [project.budget, project.isInternship]);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("duration", project.duration);
  }, [project.duration]);

  useEffect(() => {
    console.log(project);
    console.log(projectErr);
    validationHandler("connects", project.connects);
  }, [project.connects]);

  return (
    <form className="card p-3 w-50 m-auto" onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={project.title}
          placeholder="project title"
          onChange={changeHandler}
        />
        <div className="form-text text-danger">{projectErr.titleErr}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          minLength="100"
          maxLength="1000"
          placeholder="description"
          value={project.description}
          onChange={changeHandler}
        ></textarea>
        <div className="form-text text-danger">{projectErr.descriptionErr}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select form-select-md mb-3"
          value={project.category ? project.category._id : "0"}
          id="category"
          onChange={changeHandler}
        >
          <option disabled value="0">
            select category
          </option>
          {categories.map((category, index) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="form-text text-danger">{projectErr.categoryErr}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="skills" className="form-label">
          Skills
        </label>
        <select
          multiple
          id="skills"
          className="form-select form-select-md mb-3"
          onChange={changeHandler}
        >
          {skills.map((skill, index) => (
            <option
              value={skill._id}
              key={index}
              selected={
                updateId &&
                project.skills &&
                project.skills.some((oldSkill) => oldSkill._id === skill._id)
              }
            >
              {skill.name}
            </option>
          ))}
        </select>
        <div className="form-text text-danger">{projectErr.skillsErr}</div>
      </div>
      <div className="row mb-2">
        <div className="col-8">
          <label htmlFor="budget" className="form-label">
            Budget (hourly rate)
          </label>
          <input
            type="number"
            className="form-control"
            id="budget"
            value={project.isInternship ? "" : project.budget}
            disabled={project.isInternship ? true : false}
            placeholder="project budget"
            onChange={changeHandler}
          />
          <div className="form-text text-danger">{projectErr.budgetErr}</div>
        </div>
        <div className="form-check col-4 my-auto pt-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="isInternship"
            disabled={!!updateId}
            checked={project.isInternship}
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            internship
          </label>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="duration" className="form-label">
            Duration (hours)
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            placeholder="duration"
            value={project.duration}
            onChange={changeHandler}
          />
          <div className="form-text text-danger">{projectErr.durationErr}</div>
        </div>
        <div className="col">
          <label htmlFor="connects" className="form-label">
            Connects
          </label>
          <input
            type="number"
            className="form-control"
            id="connects"
            value={project.connects}
            onChange={changeHandler}
          />
          <div className="form-text text-danger">{projectErr.connectsErr}</div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly">
        <button className={`btn ${buttons.submit}`} type="submit">
          {updateId ? "Update Project" : "Add Project"}
        </button>
        <button
          className={`btn ${buttons.cancel}`}
          type="button"
          onClick={cancelHandler}
        >
          cancel
        </button>
      </div>
    </form>
  );
}
