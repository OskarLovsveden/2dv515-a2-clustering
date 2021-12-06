import Cluster from "./Cluster";
import { BsFileEarmark } from "react-icons/bs";
import { BiSubdirectoryRight } from "react-icons/bi";

const Hierarchical = ({ cluster }) => {
  const { right, left } = cluster;

  return (
    <Cluster defaultState={true}>
      <ul className="list-none ml-m">
        {left &&
          (left.blog ? (
            <li className="unselectable">
              <BiSubdirectoryRight />
              <BsFileEarmark />
              <span className="ml-s">{left.blog.name}</span>
            </li>
          ) : (
            <li className="unselectable">
              <Hierarchical cluster={left} />
            </li>
          ))}
        {right &&
          (right.blog ? (
            <li className="unselectable">
              <BiSubdirectoryRight />
              <BsFileEarmark />
              <span className="ml-s">{right.blog.name}</span>
            </li>
          ) : (
            <li className="unselectable">
              <Hierarchical cluster={right} />
            </li>
          ))}
      </ul>
    </Cluster>
  );
};

export default Hierarchical;
