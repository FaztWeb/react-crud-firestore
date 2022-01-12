import { useEffect, useState } from "react";
import LinksForm from "./LinksForm";
import { deleteTask, onGetLinks, saveLink, updateLink } from "../api/links";
import { toast } from "react-toastify";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getLinks = async () => {
    onGetLinks((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await deleteTask(id);
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await saveLink(linkObject);
        toast("New Link Added", {
          type: "success",
        });
      } else {
        await updateLink(currentId, linkObject);
        toast("Link Updated Successfully", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <LinksForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div
            className="card mb-3 card-website"
            key={link.id}
            onClick={() => setCurrentId(link.id)}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <button
                  className="btn btn-danger btn-sm d-flex align-items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLink(link.id);
                  }}
                >
                  <i className="material-icons">close</i>
                </button>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;
