import { useEffect, useState } from "react";
import { getWebsites } from "../firebase/api";
import { WebsiteCard } from "./WebsiteCard";

export const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getWebsites();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setWebsites(docs);
    // });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {websites.map((link) => (
        <div className="col-md-4" key={link.id}>
          <WebsiteCard link={link} />
        </div>
      ))}
    </>
  );
};
