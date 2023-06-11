import { useState } from "react";

const Resource = ({ h3, p, links }) => {
  const [show, setShow] = useState(false)
    

  const clickHandler = () => {
    setShow((prev) => !prev);
  };
  return (
    <li>
      <span>
        <h3>{h3}</h3>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            onClick={clickHandler}
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            onClick={clickHandler}
          >
            <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
          </svg>
        )}
      </span>
      {show && <p>{p}</p>}

      {show && <br />}

      <p className="links" dangerouslySetInnerHTML={{ __html: links }} />
    </li>
  );
};
export default Resource;
