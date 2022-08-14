import React, { useState } from "react";
import { useSelector } from "react-redux";

import DetailsCard from "../../DetailsCard";
import UpdateTestimonial from "../../UpdateModals/UpdateTestimonial";

export default function ProfileTestimonial({ isPublic, userDetails, isUser }) {
  const [modalShow, setModalShow] = useState(false);
  const [project, setProject] = useState(0);
  const [recruiter, setRecruiter] = useState("");
  const user = useSelector((state) => state.user);

  const handleSendTestimonial = (project, recruiter) => {
    setProject(project);
    setRecruiter(recruiter);
    setModalShow(true);
  };

  return (
    <section className="w-100 mb-3">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2>Testimonial</h2>
      </section>
      {userDetails.testimonials && userDetails.testimonials.length
        ? userDetails.testimonials.map((testimonial, index) => (
            <section key={index}>
              <DetailsCard
                isPublic={isPublic}
                isUser={isUser}
                button={true}
                buttonAction={() =>
                  handleSendTestimonial(
                    testimonial.project._id,
                    testimonial.project.recruiter.type
                  )
                }
                title={testimonial.project.title}
                subtitle={testimonial.project.category? testimonial.project.category.name: ""}
                showDate={true}
                startDate={testimonial.project.startTime}
                endDate={testimonial.project.endTime}
                description={testimonial.comment}
                rating={testimonial.rating}
              />
            </section>
          ))
        : "Nothing to show yet"}
      <UpdateTestimonial
        show={modalShow}
        onHide={() => setModalShow(false)}
        project={project}
        talent={user.role}
        recruiter={recruiter}
      />
    </section>
  );
}
