import Cluster from "./Cluster";
import { BsFileEarmark } from "react-icons/bs";
import { BiSubdirectoryRight } from "react-icons/bi";

const Hierarchical = ({ cluster }) => {
  const { right, left, blog } = cluster;
  return (
    <Cluster defaultState={true}>
      <ul className="list-none ml-m">
        {blog && (
          <li className="unselectable">
            <BiSubdirectoryRight />
            <BsFileEarmark />
            <span className="ml-s">{blog.name}</span>
          </li>
        )}
        {right ? (
          right.blog ? (
            <li className="unselectable">
              <BiSubdirectoryRight />
              <BsFileEarmark />
              <span className="ml-s">{right.blog.name}</span>
            </li>
          ) : (
            <li>
              <Hierarchical cluster={right} />
            </li>
          )
        ) : null}
        {left ? (
          left.blog ? (
            <li className="unselectable">
              <BiSubdirectoryRight />
              <BsFileEarmark />
              <span className="ml-s">{left.blog.name}</span>
            </li>
          ) : (
            <li>
              <Hierarchical cluster={left} />
            </li>
          )
        ) : null}
      </ul>
    </Cluster>
  );
};

export default Hierarchical;
