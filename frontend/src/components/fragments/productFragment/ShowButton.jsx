import PropType from "prop-types";
import { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import ShowProduct from "./ShowProduct";
import UpdateProduct from "./UpdateProduct";
import { useAtom } from "jotai";
import { activeButton } from "../../../jotai/atom";

const ShowButton = ({ dataIndex, lengthData, dataId }) => {
  const [destroy, setDestroy] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const close = useAtom(activeButton);

  return (
    <div
      id={dataIndex}
      className={`${close[0] ? "block" : "hidden"} absolute right-4 ${
        dataIndex > lengthData ? "bottom-12" : "top-12"
      } z-30 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
    >
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <a
            href="#"
            onClick={() => setShowProduct(!showProduct)}
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Show
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setEditProduct(!editProduct)}
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </a>
        </li>
      </ul>
      <div className="py-1">
        <a
          href="#"
          onClick={() => setDestroy(!destroy)}
          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Delete
        </a>
      </div>
      {destroy && <DeleteProduct dataId={dataId} />}
      {showProduct && <ShowProduct dataId={dataId} />}
      {editProduct && <UpdateProduct dataId={dataId} />}
    </div>
  );
};

ShowButton.propTypes = {
  dataId: PropType.number,
  dataIndex: PropType.number,
  lengthData: PropType.number,
};

export default ShowButton;
