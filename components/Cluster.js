import styles from "styles/Cluster.module.css";
import { useState } from "react";
import {
  BsCaretRight,
  BsCaretDownFill,
  BsFolder2,
  BsFolder2Open,
} from "react-icons/bs";

const Cluster = ({ children, title, defaultState }) => {
  const [open, setOpen] = useState(defaultState);

  return (
    <div>
      <div
        className={styles.directory + " unselectable"}
        onClick={() => setOpen(!open)}
      >
        {open ? <BsCaretDownFill /> : <BsCaretRight />}
        {open ? <BsFolder2Open /> : <BsFolder2 />}
        <span className="ml-s">{title}</span>
      </div>
      <div>{open && children}</div>
    </div>
  );
};

export default Cluster;
