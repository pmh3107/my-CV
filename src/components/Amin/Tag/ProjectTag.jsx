import React, { useState } from "react";

function Description({ data }) {
  return (
    <div className="admin__tag--description">
      <p className="admin__tag--title">{data.name}</p>
      <p className="admin__tag--desc">
        <small>PHONE: {data.phone}</small>
      </p>
      <p className="admin__tag--desc">
        <small>EMAIL: {data.email}</small>
      </p>
      <p className="admin__tag--desc">
        <strong>SUBJECT: {data.subject}</strong>
      </p>
      <p className="admin__tag--desc">
        <strong>MESSAGE: {data.message}</strong>
      </p>
    </div>
  );
}
function ProjectTag() {
  //   const [nodata, setNodata] = useState(false);
  //   if (nodata) {
  //     return (
  //       <div className="admin__inner">
  //         <div className="admin__tag">
  //           <h3 className="admin__tag--heading">Contact</h3>
  //           <p className="admin__tag--desc">
  //             <strong> No data found !</strong>
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   }
  return (
    <div className="admin__inner">
      <div className="admin__tag">
        <h3 className="admin__tag--heading">Project</h3>
        <Description data={""} />
      </div>
    </div>
  );
}
export default ProjectTag;
