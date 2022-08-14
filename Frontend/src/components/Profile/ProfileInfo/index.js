import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";

import EditButton from "../../Buttons/EditButton";
import UpdateDetails from "../../UpdateModals/UpdateDetails";

export default function ProfileInfo({
  isPublic,
  userDetails,
  userType,
  isUser,
}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="row g-0 infoContainer w-100 align-items-center mt-1 mb-3 px-4 py-3">
      <section className="row g-0 justify-content-between w-100 align-items-center border-bottom border-1 mb-3 p-2">
        {userDetails.title && (
          <section className="col-12 col-md-5">
            <h3>{userDetails.title}</h3>
          </section>
        )}
        {(userDetails.phoneNumber ||
          userDetails.address ||
          userDetails.website) && (
          <section className="col-12 col-md">
            <h3>Contact Info</h3>
            {userDetails.phoneNumber && (
              <p className="col-12 col-md-5 d-inline">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ color: "var(--blue)" }}
                />
                <span>{" +2" + userDetails.phoneNumber}</span>
              </p>
            )}
            {userDetails.address && (
              <p className="col-12 col-md-5 d-inline offset-1">
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ color: "var(--blue)" }}
                />
                <span>
                  {" "}
                  {userDetails.address.city},{userDetails.address.state}
                  &nbsp; ({userDetails.address.postalCode})
                </span>
              </p>
            )}
            {userDetails.website && (
              <p className="col-12 col-md-5 d-inline offset-1">
                <FontAwesomeIcon
                  icon={faGlobe}
                  style={{ color: "var(--blue)" }}
                />
                <a href={userDetails.website} className="text-dark">
                  {" " + userDetails.website}
                </a>
              </p>
            )}
          </section>
        )}
      </section>
      <section>
        <section className="row g-0 justify-content-around">
          {userDetails.languages && (
            <section className="materialCard infoTags col-12 col-md mx-1 bg-light infoP p-2 mb-3">
              <p className="w-100 d-flex justify-content-between m-0">
                <span className="fw-bold">languages</span>
                {!isPublic && isUser && (
                  <EditButton
                    action={() => setModalShow(true)}
                    style={{
                      color: "var(--white)",
                      backgroundColor: "var(--beige)",
                    }}
                  />
                )}
              </p>
              <p className="d-flex m-0">
                {userDetails.languages.map((language) => (
                  <span key={language} className="mx-1 d-inline-block p-2 tags">
                    {language}
                  </span>
                ))}
              </p>
              <UpdateDetails
                show={modalShow}
                onHide={() => setModalShow(false)}
                editKey="languages"
                userLanguages={userDetails.languages}
              />
            </section>
          )}
          {userDetails.analytics ? (
            <table className="materialCard infoTags col-12 col-md mx-1 bg-light infoP mb-3">
              <thead>
                <tr>
                  {(userType === "freelancer" || userType === "team") && (
                    <>
                      <th className="p-2 text-center col-4">Earnings</th>
                      <th className="p-2 text-center col-4">Hours</th>
                    </>
                  )}
                  {(userType === "client" || userType === "company") && (
                    <th className="p-2 text-center col-4">Spent</th>
                  )}
                  <th className="p-2 text-center col-4">Jobs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {(userType === "freelancer" || userType === "team") && (
                    <>
                      <td className="text-center col-4">
                        {userDetails.analytics.earnings}$
                      </td>
                      <td className="text-center col-4">
                        {userDetails.analytics.hours}
                      </td>
                    </>
                  )}
                  {(userType === "client" || userType === "company") && (
                    <td className="text-center col-4">
                      {userDetails.analytics.spent}$
                    </td>
                  )}
                  <td className="text-center col-4">
                    {userDetails.analytics.jobs}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            ""
          )}
        </section>
        <section className="row g-0 justify-content-around">
          {userDetails.hourlyRate && (
            <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
              <span className="fw-bold">hourly rate</span>
              <br />
              <span>{userDetails.hourlyRate}$/hour</span>
            </p>
          )}
          {userDetails.hoursPerWeek && (
            <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
              <span className="fw-bold">hours/week</span> <br />
              <span>{userDetails.hoursPerWeek + " "}hours</span>
            </p>
          )}
          {userDetails.connects && !isPublic && isUser && (
            <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
              <span className="fw-bold">connects</span> <br />
              <span> {userDetails.connects + " "}</span>
            </p>
          )}
          {userDetails.wallet >= 0 && !isPublic && isUser && (
            <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
              <span className="fw-bold">wallet</span> <br />
              <span>{userDetails.wallet}$</span>
            </p>
          )}
        </section>
      </section>
    </div>
  );
}
