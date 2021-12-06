import Cluster from "./Cluster";
import { BsFileEarmark } from "react-icons/bs";
import { BiSubdirectoryRight } from "react-icons/bi";

const KMeans = ({ clusters }) => (
  <div>
    {clusters.map((cluster, index) => (
      <Cluster
        key={index}
        title={`Cluster ${cluster.id} (${cluster.blogs.length})`}
        defaultState={false}
      >
        <ul className="list-none ml-m">
          {cluster.blogs.map((blog, index) => (
            <li key={index} className="unselectable">
              <BiSubdirectoryRight />
              <BsFileEarmark />
              <span className="ml-s">{blog}</span>
            </li>
          ))}
        </ul>
      </Cluster>
    ))}
  </div>
);

export default KMeans;
