import classes from "./SideSearch.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

let token = localStorage.getItem("token");
export default function SideSearch(props) {
  const {
    setSearchKey,
    setCategoryFilterKey,
    setSkillFilterKey,
    setBudgetFilterKey,
  } = props;
  const [filterKey, setFilterKey] = useState({});
  const [categories, setCategories] = useState([]);
  // const [filteredCategories, setFilteredCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  // const [filteredSkills, setFilteredSkills] = useState([]);
  const [checkedSkills, setCheckedSkills] = useState([]);
  const [checkedBudgets, setCheckedBudgets] = useState([]);

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

  const searchHandler = (e) => {
    setFilterKey({ ...filterKey, searchKey: e.target.value });
    setSearchKey(e.target.value);
  };
  // const filterHandler = (e) => {
  //   if (e.target.id === "categoryFilter") {
  //     for (let el of e.target.parentElement.children) {
  //       if (
  //         !(
  //           el === e.target.parentElement.children[0] ||
  //           el === e.target.parentElement.children[1]
  //         )
  //       )
  //         console.log(el.children[0]);
  //     }
  //     setFilterKey({ ...filterKey, categoryKey: e.target.value });
  //     // setCategoryFilterKey([])
  //   } else if (e.target.id === "skillFilter") {
  //     setFilterKey({ ...filterKey, skillKey: e.target.value });
  //     // setSkillFilterKey([])
  //   }
  // };

  const checkHandler = (e) => {
    if (e.target.parentElement.id === "categories") {
      if (e.target.checked) {
        setCheckedCategories([...checkedCategories, e.target.value]);
      } else {
        setCheckedCategories([
          ...checkedCategories.filter(
            (category) => category !== e.target.value
          ),
        ]);
      }
    } else if (e.target.parentElement.id === "skills") {
      if (e.target.checked) {
        setCheckedSkills([...checkedSkills, e.target.value]);
      } else {
        setCheckedSkills([
          ...checkedSkills.filter((skill) => skill !== e.target.value),
        ]);
      }
    } else if (e.target.parentElement.parentElement.id === "budgets") {
      if (e.target.checked) {
        setCheckedBudgets([...checkedBudgets, e.target.value]);
      } else {
        setCheckedBudgets([
          ...checkedBudgets.filter((budget) => budget !== e.target.value),
        ]);
      }
    }
  };

  useEffect(() => {
    categoriesApi
      .then((res) => {
        setCategories(res.data);
        // setFilteredCategories(res.data);
        skillsApi.then((res) => {
          setSkills(res.data);
          // setFilteredSkills(res.data);
        });
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);

  useEffect(() => {
    console.log("checkedCategories", checkedCategories);
    console.log("checkedSkills", checkedSkills);
    console.log("checkedBudgets", checkedBudgets);
    setCategoryFilterKey(checkedCategories);
    setSkillFilterKey(checkedSkills);
    setBudgetFilterKey(checkedBudgets);
    // console.log(filterKey);
    // console.log(checkedCategories);
    // console.log(checkedSkills);
    // setFilteredCategories(
    //   categories.filter((category) =>
    //     category.name.includes(filterKey.categoryKey)
    //   )
    // );
    // setFilteredSkills(
    //   skills.filter((skill) => skill.name.includes(filterKey.skillKey))
    // );
    // setCategoryFilterKey([checkedCategories]);
    // setSkillFilterKey([checkedSkills]);
  }, [checkedCategories, checkedSkills, checkedBudgets]);
  return (
    <aside className={`card col-lg-3 mb-2 ${classes.card}`}>
      <div className={`card-body`}>
        <div className="d-flex justify-content-between">
          <h5 className={`card-title ${classes.cardTitle}`}>Filter</h5>
          {/* <a href="s" className="text-decoration-none">
            Clear
          </a> */}
        </div>
        <input
          className={`form-control my-2 ${classes.input}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={filterKey.searchKey}
          onChange={searchHandler}
        />
        <hr />
        <div>
          <h5 className={`card-title ${classes.cardTitle}`}>Category</h5>
          {/* <input
            className={`form-control my-2 ${classes.input}`}
            type="search"
            placeholder="filter"
            aria-label="Search"
            id="categoryFilter"
            onChange={filterHandler}
          /> */}
          {categories.map((category, index) => (
            <div
              className={`form-check ${classes.formCheck}`}
              key={index}
              id="categories"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={category._id}
                id={category._id}
                onChange={checkHandler}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <h5 className={`card-title ${classes.cardTitle}`}>Skills</h5>
          {/* <input
            className={`form-control my-2 ${classes.input}`}
            type="search"
            placeholder="filter"
            aria-label="Search"
            id="skillFilter"
            onChange={filterHandler}
          /> */}
          {skills.map((skill, index) => (
            <div
              className={`form-check ${classes.formCheck}`}
              key={index}
              id="skills"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={skill._id}
                onChange={checkHandler}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {skill.name}
              </label>
            </div>
          ))}
        </div>
        <hr />
        <div id="budgets">
          <h5 className={`card-title ${classes.cardTitle}`}>Type</h5>
          <div className={`form-check ${classes.formCheck}`}>
            <input
              className="form-check-input"
              type="checkbox"
              value="isInternship"
              onChange={checkHandler}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Internship
            </label>
          </div>
          <div className={`form-check ${classes.formCheck}`}>
            <input
              className="form-check-input"
              type="checkbox"
              value="budget"
              onChange={checkHandler}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Payed
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
