import axios from "axios";
import { useAtom } from "jotai";
import PropType from "prop-types";
import { useEffect, useState } from "react";
import { activeButton } from "../../../jotai/atom";

const ShowProduct = ({ dataId }) => {
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([]);
  const [close, setClose] = useState(false);
  const [closeShow, setCloseShow] = useAtom(activeButton);

  useEffect(() => {
    fetchData(dataId);
  }, [dataId]);

  const fetchData = async (id) => {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    setData(response.data);
    setPicture(response.data.ImgProduct);
  };

  const currency = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
  });

  const handleButton = () => {
    setClose(true);
    setCloseShow(false);
  };

  return (
    <div
      id="readProductModal"
      aria-hidden="true"
      className={`${
        close && closeShow && "hidden"
      } flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between mb-4 rounded-t border-b border-gray-500 pb-3 sm:mb-5">
            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
              <h3 className="font-semibold first-letter:uppercase">
                {data.name}
              </h3>
              <p className="font-bold">{currency.format(data.price)}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={handleButton}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="readProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <div className="max-w-13 max-h-13 p-5 mb-3 border border-gray-700 rounded-lg flex justify-center items-center">
            <img src={picture.img_url} alt="product poto" />
          </div>
          <dl>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Details
            </dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              {data.description}
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Category
            </dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              {data.catagoty}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

ShowProduct.propTypes = {
  dataId: PropType.number,
};

export default ShowProduct;
