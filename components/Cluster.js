import styles from "styles/Cluster.module.css";
import { useState } from "react";
import {
  BsCaretRight,
  BsCaretDownFill,
  BsFolder2,
  BsFolder2Open,
  BsFileEarmark,
} from "react-icons/bs";
import { BiSubdirectoryRight } from "react-icons/bi";

const Cluster = ({ data }) => {
  const { cluster, blogs } = data;
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-m">
      <div
        className={styles.directory + " unselectable"}
        onClick={() => setOpen(!open)}
      >
        {open ? <BsCaretDownFill /> : <BsCaretRight />}
        {open ? <BsFolder2Open /> : <BsFolder2 />}
        <span className="ml-s">
          Cluster {cluster} ({blogs.length})
        </span>
      </div>
      <ul className="list-none ml-m">
        {open &&
          blogs.map((blog, index) => (
            <li key={index} className="unselectable">
              <BiSubdirectoryRight />
              <BsFileEarmark />
              <span className="ml-s">{blog}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Cluster;
