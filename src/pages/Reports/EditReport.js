import { useState, useEffect } from "react";
import instance from "../../components/Axios/Config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Response from "./Response";
import { UiActions } from "../../stores/UiSlice";
import { useDispatch, useSelector } from "react-redux";

export default function EditReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const reportId =
    location.pathname.split("/")[location.pathname.split("/").length - 2];
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.user.userType);
  const [errMsg, setErrMsg] = useState(null);

  const [ui, setUi] = useState({
    text: "Update Report",
    color: "#689425",
    disable: false,
  });

  const [data, setData] = useState({
    title: "",
    location: "",
    category: "",
    region: "",
    description: "",
    media: [],
    status: "",
    response: "",
  });

  useEffect(() => {
    setUi((prev) => ({ ...prev, disable: true }));

    instance
      .get(`/reports/${reportId}`)
      .then((result) => {
        setUi((prev) => ({ ...prev, disable: false }));
        const {
          title,
          location,
          category,
          description,
          region,
          media,
          status,
          response,
        } = result.data.report;
        setData({
          title,
          location,
          category,
          description,
          media,
          region,
          status,
          response,
        });
      })
      .catch((err) => {
        setUi({ text: "Update Report", color: "#689425", disable: false });

        if (!err.response) {
          return setErrMsg("Please check your connection and try again");
        }

        return setErrMsg(err.response.data.msg);
      });
  }, []);

  const dataUpdater = (e) => {
    const { name, value } = e.target;
    setErrMsg(null);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const fileUpload = (e) => {
    if (!e.target.files[0]) return;
    setErrMsg(null);
    setUi((prev) => ({ ...prev, disable: true }));
    const media = new FormData();

    if (e.target.files[0].type.startsWith("image"))
      media.append("image", e.target.files[0]);
    if (e.target.files[0].type.startsWith("video"))
      media.append("video", e.target.files[0]);

    instance({
      url: "/reports/upload-file",
      method: "post",
      data: media,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setData((prev) => ({ ...prev, media: [...prev.media, res.data.src] }));
        setUi((prev) => ({ ...prev, disable: false }));
      })
      .catch((err) => {
        if (!err.response)
          setErrMsg("Please check your internet connection and try again");
        setErrMsg(err.response.data.msg);
      });
  };

  const submitData = (e) => {
    e.preventDefault();
    setUi({ text: "Hold on...", color: "var(--lightBlue)", disable: true });
    setErrMsg(null);

    const reportData = {
      description: data.description,
      category: data.category,
      location: data.location,
      region: data.region,
    };
    if (data.title !== "") reportData.title = data.title;
    if (data.media.length > 0) reportData.media = data.media;

    instance({
      url: `/reports/${reportId}`,
      method: "patch",
      data: reportData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        dispatch(UiActions.getMessage());
        navigate(`/vms/reports/${reportId}`);
      })
      .catch((err) => {
        setUi({ text: "Update Report", color: "#689425", disable: false });

        if (!err.response) {
          return setErrMsg("Please check your connection and try again");
        }

        return setErrMsg(err.response.data.msg);
      });
  };

  const [dontHide, setHide] = useState(false);

  const imgRemove = (img) => {
    let tempState = data.media;

    tempState = tempState.filter((image) => image !== img);

    setData((prev) => ({ ...prev, media: tempState }));
  };

  return (
    <div className="edit-report">
      <h2>Edit Report</h2>
      <Link to="/vms">Back</Link>
      <form onSubmit={submitData}>
        <label htmlFor="title">Title</label>
        <input
          onChange={dataUpdater}
          value={data.title}
          type="text"
          name="title"
          id="title"
          placeholder="Add a title"
        />

        <label htmlFor="location">Location</label>
        <input
          onChange={dataUpdater}
          value={data.location}
          type="text"
          name="location"
          id="location"
          required
          placeholder="Add the location of the crime"
        />

        <select
          onChange={dataUpdater}
          value={data.category}
          name="category"
          id="category"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Sexual Assault">Sexual Assault</option>
          <option value="Domestic violence">Domestic Violence</option>
          <option value="Hate crime">Hate crime</option>
          <option value="Crime against morality">Crime against morality</option>
          <option value="Other">Other</option>
        </select>

        <select
          onChange={dataUpdater}
          value={data.region}
          name="region"
          id="region"
          required
        >
          <option value="" disabled>
            Select Region
          </option>
          <option value="Greater Accra">Greater Accra</option>
          <option value="Ashanti">Ashanti</option>
          <option value="Central Region">Central Region</option>
          <option value="Volta Region">Volta Region</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          onChange={dataUpdater}
          value={data.description}
          name="description"
          id="description"
          required
          placeholder="Describe the crime"
        ></textarea>

        <label htmlFor="media">Add any related Images</label>
        <input onChange={fileUpload} type="file" name="media" id="media" />
        {data.media.length > 0 && (
          <div className="forImage">
            {data.media.length > 0 &&
              data.media.map((img) => {
                return (
                  <div key={img}>
                    <span role="button" onClick={() => imgRemove(img)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        style={{ fill: "red" }}
                      >
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                      </svg>
                    </span>
                    <img src={img} alt="report" />
                  </div>
                );
              })}
          </div>
        )}

        <div>
          {
            <p style={{ color: "rgb(243, 40, 40)", textAlign: "center" }}>
              {errMsg}
            </p>
          }
          {data.status !== "responded" && userType === "admin" && (
            <p
              role="button"
              onClick={() => setHide(true)}
              className="add-response"
            >
              Add Response
            </p>
          )}
          {data.status !== "responded" && (
            <button
              disabled={ui.disable}
              style={{ background: ui.color }}
              type="submit"
            >
              {ui.text}
            </button>
          )}
        </div>
      </form>
      {dontHide && data.status !== "responded" ? (
        <Response
          prevStatus={data.status}
          prevResponse={data.response}
          hide={() => setHide(false)}
          reportId={reportId}
        />
      ) : null}
    </div>
  );
}
