import Blog from "models/Blog";

class Cluster {
  #parent = null;
  right = null;
  left = null;
  blog = null;
  #distance = 0;

  /**
   * Set the cluster parent.
   *
   * @param {Cluster | null} parent
   */
  setParent(parent) {
    this.#parent = parent;
  }

  /** @returns {Cluster | null} the parent cluster. */
  getParent() {
    return this.#parent;
  }

  /**
   * Set the right cluster.
   *
   * @param {Cluster | null} right
   */
  setRight(right) {
    this.right = right;
  }

  /** @returns {Cluster | null} the right cluster. */
  getRight() {
    return this.right;
  }

  /**
   * Set the left cluster.
   *
   * @param {Cluster | null} left
   */
  setLeft(left) {
    this.left = left;
  }

  /** @returns {Cluster | null} the left cluster. */
  getLeft() {
    return this.left;
  }

  /**
   * Sets the blog of the cluster.
   *
   * @param {Blog | null} blog
   */
  setBlog(blog) {
    this.blog = blog;
  }

  /** @returns {Blog | null} the cluster blog. */
  getBlog() {
    return this.blog;
  }

  /**
   * Sets the distance of the cluster.
   *
   * @param {Number} distance
   */
  setDistance(distance) {
    this.#distance = distance;
  }

  /** @returns {Number} the cluster distance. */
  getDistance() {
    return this.#distance;
  }
}

export default Cluster;
