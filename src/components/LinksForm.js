import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getTask } from "../api/links";

const LinksForm = (props) => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.url))
      return toast("invalid url", { type: "warning", autoClose: 1000 });

    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await getTask(id);
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body bg-secondary">
      <label htmlFor="url">Paste your URL</label>
      <div className="input-group mb-3">
        <div className="input-group-text bg-dark">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.xyz"
          value={values.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>

      <label htmlFor="name">Website Name:</label>
      <div className="input-group">
        <div className="input-group-text bg-dark">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          value={values.name}
          name="name"
          placeholder="Website Name"
          className="form-control mb-3"
          onChange={handleInputChange}
        />
      </div>

      <label htmlFor="description">Write a Description:</label>
      <textarea
        rows="3"
        className="form-control mb-3"
        placeholder="Write a Description"
        name="description"
        value={values.description}
        onChange={handleInputChange}
      ></textarea>

      <button
        className="btn btn-primary btn-block"
        disabled={!values.url || !values.name}
      >
        {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinksForm;
