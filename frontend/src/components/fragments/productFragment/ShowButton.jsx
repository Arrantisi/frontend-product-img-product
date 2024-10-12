import PropType from "prop-types";

const ShowButton = ({ dataId, lengthData }) => {
  console.log();

  return (
    <div
      id={dataId}
      className={`absolute right-4 ${
        dataId > lengthData ? "bottom-12" : "top-12"
      } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
    >
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Show
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </a>
        </li>
      </ul>
      <div className="py-1">
        <a
          href="#"
          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Delete
        </a>
      </div>
    </div>
  );
};

ShowButton.propTypes = {
  dataId: PropType.number,
  lengthData: PropType.number,
};

export default ShowButton;
