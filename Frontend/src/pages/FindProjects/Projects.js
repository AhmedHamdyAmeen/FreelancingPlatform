import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import SideSearch from "../../components/FindProjects/SideSearch/SideSearch";
import SideFAQ from "../../components/FindProjects/SideFAQ/SideFAQ";

import classes from "../../components/FindProjects/ProjectCard/ProjectCard.module.css";
import buttons from "../../components/FindProjects/buttons.module.css";
import RecommendedProjects from "./RecommendedProjects";
import SavedProjects from "./SavedProjects";

let token = localStorage.getItem("token");
let role = localStorage.getItem("role");

export default function Projects() {
  const [searchKey, setSearchKey] = useState("");
  const [categoryFilterKey, setCategoryFilterKey] = useState([]);
  const [skillFilterKey, setSkillFilterKey] = useState([]);
  const [budgetFilterKey, setBudgetFilterKey] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filtredProjects, setFiltredProjects] = useState([]);
  const [recommendedBtn, setRecommendedBtn] = useState(true);
  const [savedBtn, setSavedBtn] = useState(false);
  const history = useHistory();
  const savedProjects = useSelector(
    (state) => state.savedProjectsReducer.savedProjects
  );
  const filterProjects = (
    searchKey,
    categoryFilterKey,
    skillFilterKey,
    budgetFilterKey
  ) => {
    let filtred = [...projects];
    // filtred.map((project) => {
    //   let skillIds = [];
    //   for (let obj of project.skills) {
    //     skillIds.push(obj._id);
    //   }
    //   console.log("skillIds", skillIds);
    //   let obj = { ...project, skills: [...skillIds] };
    //   return obj;
    //   // console.log("project", project);
    // });
    console.log(filtred);

    if (searchKey.length !== 0) {
      setFiltredProjects(
        filtred.filter((project) => project.title.includes(searchKey))
      );
      filtred = filtred.filter((project) => project.title.includes(searchKey));
    }
    if (categoryFilterKey.length !== 0) {
      setFiltredProjects(
        filtred.filter((project) =>
          categoryFilterKey.includes(String(project.category._id))
        )
      );

      filtred = filtred.filter((project) =>
        categoryFilterKey.includes(String(project.category._id))
      );
    }
    // if (skillFilterKey.length !== 0) {
    //   setFiltredProjects(
    //     filtred.forEach((project) => {
    //       project.skills.forEach((skill) => skill._id);
    //     })
    // );
    if (budgetFilterKey.length !== 0) {
      // if (
      //   budgetFilterKey.includes("payed") &&
      //   budgetFilterKey.includes("internship")
      // ) {
      //   console.log("do nothing");

      // filtred = filtred.filter((project) => project.hasOwnProperty("budget"));
      // } else if (budgetFilterKey.includes("budget")) {
      for (let key of budgetFilterKey) {
        setFiltredProjects(filtred.filter((project) => project[key]));
      }
      // filtred = filtred.filter((project) => project.);
      // } else if (budgetFilterKey.includes("isInternship")) {
      //   setFiltredProjects(filtred.filter((project) => project.isInternship));
      //   filtred = filtred.filter((project) => project.isInternship);
      // }

      // filtred = filtred.filter((project) =>
      //   categoryFilterKey.includes(String(project.category._id))
      // );
    }
  };

  const api = axios({
    url: `http://localhost:8080/project`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    api
      .then((res) => {
        setProjects(res.data);
        setFiltredProjects(res.data);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);

  useEffect(() => {
    filterProjects(
      searchKey,
      categoryFilterKey,
      skillFilterKey,
      budgetFilterKey
    );
    console.log(filtredProjects);
  }, [searchKey, categoryFilterKey, skillFilterKey, budgetFilterKey]);

  return (
    <>
      <SideSearch
        setSearchKey={setSearchKey}
        setCategoryFilterKey={setCategoryFilterKey}
        setSkillFilterKey={setSkillFilterKey}
        setBudgetFilterKey={setBudgetFilterKey}
      />
      <main className="col-lg-6 px-3">
        <div className="d-flex justify-content-evenly my-3">
          <button
            className={`btn ${classes.projectsBtn} ${classes.projectsBtnActive}`}
            onClick={() => {
              setRecommendedBtn(true);
              setSavedBtn(false);
            }}
          >
            Recommended Projects
          </button>
          <button
            className={`btn ${classes.projectsBtn}`}
            onClick={() => {
              setRecommendedBtn(false);
              setSavedBtn(true);
            }}
          >
            Saved Projects
          </button>
          {(role === "client" || role === "company") && (
            <button
              className={`btn ${buttons.regularBeige}`}
              onClick={() => {
                history.push("/project/add");
              }}
            >
              Add your project
            </button>
          )}
        </div>
        {recommendedBtn && <RecommendedProjects projects={filtredProjects} />}
        {savedBtn && <SavedProjects projects={savedProjects} />}
      </main>
      <SideFAQ />
    </>
  );
}
