import React from "react";
import classes from "./SideFAQ.module.css";

export default function SideFAQ() {
  return (
    <aside className={`col-3 card p-3 ${classes.card}`}>
      <h5>Need any help ?</h5>
      <p className={`${classes.p}`}>
        <b>Don't worry,</b> we collected everything you should know to deal with
        our application.
      </p>
      <div className={`text-center`}>
        <button className={`btn w-50 ${classes.btnFAQ}`}>Go to FAQ</button>
      </div>
    </aside>
  );
}
