import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ProjectProposals.module.css";
import buttons from "../../FindProjects/buttons.module.css";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
let token = localStorage.getItem("token");

export default function ProjectProposals() {
  const [project, setProject] = useState([]);
  const params = useParams();

  const selectProposalHandler = (e) => {
    axios({
      url: `http://localhost:8080/project/${params.id}/proposal`,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        talent: {
          id: project.proposals[e.target.id].talent.id,
          type: project.proposals[e.target.id].talent.type,
        },
      },
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  };

  useEffect(() => {
    axios({
      url: `http://localhost:8080/project/${params.id}/proposal`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res);
        setProject(res.data);
      })

      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);

  return (
    <div className="col-lg-3 pt-5">
      {project.recruiter && project.proposals.length > 0 ? (
        <div
          className="accordion accordion-flush my-5 py-5"
          id="accordionFlushExample"
        >
          {project.proposals.map((proposal, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${index}`}
                >
                  proposal #{index + 1}
                </button>
              </h2>
              <div
                id={`flush-collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <>
                    <h5 className={`${classes.talent}`}>
                      {proposal.name}
                      <span>({proposal.talent.type.replace("s", "")})</span>
                    </h5>
                  </>

                  <p className="w-100" style={{ wordBreak: "normal" }}>
                    {proposal.text}
                  </p>
                  {proposal.files.map((file, index) => (
                    <>
                      <Link
                        to={file.replace("./public", "")}
                        target="_blank"
                        download
                        key={index}
                      >
                        <p className="my-0">
                          <FaDownload className="me-1" />
                          {file.replace("./public/proposalsFiles/", "")}
                        </p>
                      </Link>
                      {/* <br /> */}
                    </>
                  ))}
                </div>
                {project.status === "posted" && (
                  <div className="text-center">
                    <button
                      className={`btn ${buttons.regularBeige} mb-2`}
                      onClick={selectProposalHandler}
                      id={index}
                    >
                      select proposal
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-5 py-5">
          <h6 className="my-5 py-5">no proposals yet</h6>
        </div>
      )}
    </div>
  );
}
