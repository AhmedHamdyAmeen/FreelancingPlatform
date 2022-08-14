import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import buttons from "../../FindProjects/buttons.module.css";

let token = localStorage.getItem("token");
export default function ProjectProposalForm() {
  const [proposal, setProposal] = useState({ text: "", files: [] });
  const [proposalErr, setProposalErr] = useState({ textErr: "", filesErr: "" });
  const params = useParams({});
  const history = useHistory();
  const [submit, setSubmit] = useState(false);
  const cancelHandler = () => {
    history.push("/project");
  };

  const changeHandler = (e) => {
    if (e.target.id === "text") {
      setProposal({ ...proposal, text: e.target.value });
    } else if (e.target.id === "files") {
      setProposal({ ...proposal, files: Array.from(e.target.files) });
    }
    // validationsHandler(e.target.id, proposal[e.target.id]);
  };

  const validationsHandler = (field, value) => {
    console.log(proposal[field]);

    switch (field) {
      case "text":
        setProposalErr({
          ...proposalErr,
          textErr:
            value.length === 0
              ? "this field is required"
              : value.length < 100
              ? "minimum length is 100 characters"
              : "",
        });
        break;
      case "files":
        setProposalErr({
          ...proposalErr,
          filesErr:
            value.length > 5
              ? "maximum 5 files"
              : !value.every((file) => file.name.match(/.(pdf|png|jpg|jpeg)$/))
              ? "incorrect file extension"
              : "",
        });
        break;
      default:
        setProposalErr({ ...proposalErr });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmit(true);

    // let values = Object.values(proposal).every((v) => v === "");
    let errors = Object.values(proposalErr).every((e) => e !== "");
    // console.log(errors, values);
    if (!errors) {
      const formData = new FormData();
      formData.append("text", proposal.text);
      formData.append("files", proposal.files);
      const api = axios({
        url: `http://localhost:8080/project/${params.id}/proposal`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      api
        .then((res) => {
          console.log(res);
          history.push(`/project`);
        })
        .catch((error) => {
          console.log(formData);
          console.log(error.code, error.message, error.response.data);
        });
    }
  };

  // let keys = Object.keys(proposal)
  // for (let key of keys){
  //   useEffect(() => {
  //     validationsHandler(key, proposal[key]);
  //   }, [proposal[key]]);
  // }

  useEffect(() => {
    let keys = Object.keys(proposal);
    console.log("proposal", proposal);
    console.log("submit", submit);
    for (let item of keys) {
      console.log("item", item);
      validationsHandler(item, proposal[item]);
    }
    console.log("proposalErr", proposalErr);
  }, [submit]);

  useEffect(() => {
    console.log(proposal);
    console.log(proposalErr);

    validationsHandler("text", proposal.text);
  }, [proposal.text]);

  useEffect(() => {
    console.log(proposal);
    console.log(proposalErr);

    validationsHandler("files", proposal.files);
  }, [proposal.files]);

  return (
    <form className="card p-3 w-50 m-auto" onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Proposal
        </label>
        <textarea
          className={`form-control ${proposalErr.textErr && "border-danger"}`}
          id="text"
          rows="10"
          placeholder="proposal text"
          onChange={changeHandler}
        ></textarea>
        <div className="form-text text-danger">{proposalErr.textErr}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="files" className="form-label">
          Files
        </label>
        <input
          className={`form-control ${proposalErr.filesErr && "border-danger"}`}
          type="file"
          id="files"
          multiple
          onChange={changeHandler}
        />
        <div className="form-text text-danger">{proposalErr.filesErr}</div>
      </div>
      <div className="d-flex justify-content-evenly">
        <button className={`btn ${buttons.submit}`} type="submit">
          submit Proposal
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
