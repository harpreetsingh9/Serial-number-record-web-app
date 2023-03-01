import axios from "axios";
import React, { useState } from "react";
import moment from "moment";
import "moment-timezone";
const BASE_URL =`${import.meta.env.VITE_BASE_URL}`;

const FindNum = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [products, setProducts] = useState({});
  const [error, setError] = useState("");
  const [replaceClicked, setReplaceClicked] = useState(false);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [newSerialNumber, setNewSerialNumber] = useState("");

  const handleReplaceClick = (name, num) => {
    setSelectedName(name);
    setSelectedSerialNumber(num);
    setReplaceClicked(true);
  };

  const handleReplaceChange = (e) => {
    setNewSerialNumber(e.target.value);
  };
  // http://localhost:5000
  
  const handleReplaceSubmit = async () => {
    try {
      console.log(newSerialNumber);
      const response = await axios.put(
        `${BASE_URL}/api/products/${newSerialNumber}`,
        { selectedName, selectedSerialNumber }
      );
      console.log(response.data);
      let arr = [];
      arr.push(response.data);
      console.log(arr);
      setProducts(arr);
      console.log(products);
      setNewSerialNumber("");
      setSerialNumber("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setProducts({});
    }
    setReplaceClicked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serialNumber) {
      setError("Enter Compressor serial number");
      return;
    }
    setProducts({});
    setReplaceClicked(false);
    try {
      console.log(serialNumber);
      const response = await axios.get(
        `${BASE_URL}/api/products/${serialNumber}`
      );
      console.log(response);
      setProducts(response.data);
      console.log(products);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setProducts({});
    }
  };

  const handleChange = (e) => {
    setSerialNumber(e.target.value);
    setError("");
  };

  const formattedDate = (mongoDate) => {
    return moment.utc(mongoDate).tz("Asia/Kolkata").format("DD-MM-YYYY");
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold text-[#222328] text-[24px]">
          Find Compressor Record -
        </h1>
        <p className="mt-2 text-[#666375] text-[16px] max-w[500px]">
          Enter the Serial number of compressor
        </p>
      </div>

      <form>
        <div className="flex gap-4 flex-row items-center justify-start my-5">
          <label
            htmlFor="serialNumber"
            className="block text-md font-medium text-gray-900"
          >
            Number:
          </label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 
          text-md rounded-lg outline-none block w-2/3
          focus:ring-[#4649ff]
          focus:border-[#4649ff]
          p-3"
          />
          <button
            type="submit"
            className="text-white bg-[#6469ff] font-medium rounded-md
          text-sm sm:w-auto px-5 py-2.5 text-center"
            onClick={handleSubmit}
          >
            Find
          </button>
        </div>
      </form>

      {error && (
        <p
          className=" font-medium text-[20px] text-red-500 bg-slate-300 
      rounded-md p-1 text-center border border-slate-200"
        >
          {error}
        </p>
      )}

      {replaceClicked && (
        <div className="flex flex-col items-start justify-start">
          <div className="flex gap-4 flex-row items-center justify-start mt-2 ">
            <label
              htmlFor="serialNumber"
              className="block text-md font-medium text-gray-900"
            >
              Name:
            </label>
            <input
              type="text"
              value={selectedName}
              disabled
              className="bg-gray-200 border border-gray-400 text-gray-900 text-md 
            outline-none block p-3 rounded-lg w-[290px]"
            />
          </div>
          <div className="flex gap-4 flex-row items-center justify-start mt-2">
            <label
              htmlFor="serialNumber"
              className="block text-md font-medium text-gray-900"
            >
              Old serial number:
            </label>
            <input
              type="text"
              value={selectedSerialNumber}
              disabled
              className="bg-gray-200 border border-gray-400 text-gray-900 text-md 
            outline-none block p-2 w-[200px] rounded-lg"
            />
          </div>
          <div className="flex gap-3 flex-row items-center justify-start mt-2">
            <label
              htmlFor="serialNumber"
              className="block text-md font-medium text-gray-900"
            >
              New serial number:
            </label>
            <input
              type="text"
              placeholder="Enter new number"
              value={newSerialNumber}
              onChange={handleReplaceChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md 
            outline-none block p-2 w-[195px] rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={handleReplaceSubmit}
            className="text-[#6469ff] bg-[#fff] border border-gray-300 font-medium rounded-md
          text-md sm:w-auto px-2 py-2 text-center mb-4"
          >
            Replace
          </button>
        </div>
      )}

      <hr />

      {products.length > 0 && (
        <div>
          <h3 className="my-2 text-[#6469ff] text-[16px] max-w[500px]">
            Compressor Information
          </h3>

          <ul>
            {products.map((product) => (
              <li
                key={product.compDetails[0]._id}
                className="py-2 font-medium text-[20px]"
              >
                <strong>Name:</strong> {product.name} <br />
                <strong>Date:</strong> {formattedDate(product.date)} <br />
                {/* <br /> */}
                <strong>Model no: </strong>
                <strong>SNo: </strong>
                {/* <strong>
                  {product.compDetails[0].isReplace == true ? " REPLACED" : ""}
                </strong> */}
                {product.compDetails.map((compDetail) => (
                  <div className="flex gap-5 my-2 items-center">
                    <p className="">{compDetail.modelNumber}</p>
                    <p className="ml-4">{compDetail.serialNumber}</p>
                    <p className=" bg-red-400 rounded-md font-normal text-white">
                      {compDetail.isReplace == true ? "REPLACED" : ""}
                    </p>
                    <button
                      type="button"
                      className="text-white bg-[#6469ff] font-medium rounded-md
            text-sm sm:w-auto px-1 py-1 text-center"
                      onClick={() =>
                        handleReplaceClick(
                          product.name,
                          compDetail.serialNumber
                        )
                      }
                    >
                      Replace
                    </button>
                  </div>
                ))}
                <hr className="mt-2" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FindNum;
