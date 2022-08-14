import React from "react";

export default function IconizedButton({ action, icon, children, style }) {
    return (
      <button onClick={action} className="button m-1 p-2" style={style}>
        {icon}
        <p className="mx-2 d-inline">
          {children}
        </p>
      </button>
    );    
}

