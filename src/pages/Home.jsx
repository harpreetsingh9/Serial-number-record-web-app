import React, { useState } from "react";
import axios from "axios";
import Status from "../components/Status";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const Home = () => {
  const [name, setName] = useState("");
  const [serialNumbers, setSerialNumbers] = useState([""]);
  const [modelNumbers, setModelNumbers] = useState(["LG42"]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNameChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const handleSerialNumberChange = (e, index) => {
    const newSerialNumbers = [...serialNumbers];
    newSerialNumbers[index] = e.target.value;
    setSerialNumbers(newSerialNumbers);
  };

  const handleModelNumberChange = (e, index) => {
    const newModelNumbers = [...modelNumbers];
    newModelNumbers[index] = e.target.value;
    setModelNumbers(newModelNumbers);
  };

  const handleAddSerialNumber = () => {
    setSerialNumbers([...serialNumbers, ""]);
    setModelNumbers([...modelNumbers, "LG42"]);
  };

  const handleRemoveSerialNumber = () => {
    setSerialNumbers(serialNumbers.slice(0, -1));
    setModelNumbers(modelNumbers.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Enter fields correctly");
      return;
    }
    await axios
      .post(`${BASE_URL}/api/products`, {
        name,
        serialNumbers,
        modelNumbers,
      })
      .then((res) => {
        setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
    setName("");
    setSerialNumbers([""]);
    setModelNumbers(["LG42"]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold text-[#222328] text-[32px] mb-4">
        Add Compressors -
      </h1>

      {error && <Status msg={error} color_text="text-red-500" />}

      {success && <Status msg={success} color_text="text-green-500" />}

      <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-3">
        <div className="flex gap-4 flex-row items-center justify-start">
          <label className="block text-sm font-medium text-gray-900">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg outline-none block w-2/3
            focus:ring-[#4649ff]
          focus:border-[#4649ff]
        p-3"
          />
        </div>
        {serialNumbers.map((serialNumber, index) => (
          <div
            key={index}
            className="flex gap-3 flex-row items-center justify-start"
          >
            <label className="block text-sm font-medium text-gray-900 w-[60px]">
              SNo - {index + 1}:
            </label>
            <input
              type="text"
              value={serialNumber}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleSerialNumberChange(e, index)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg outline-none block w-1/2
              focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
            />
            <input
              type="text"
              value={modelNumbers[index]}
              onChange={(e) => handleModelNumberChange(e, index)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg outline-none block w-1/4
              focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
            />
            {serialNumbers.length - 1 == [index] && (
              <button
                type="button"
                onClick={
                  serialNumbers[index] == "" && index != 0
                    ? handleRemoveSerialNumber
                    : handleAddSerialNumber
                }
                className=" text-indigo-600 bg-white  font-normal rounded-md
                text-sm  sm:w-auto px-2.5 py-2 text-center border border-gray-300"
              >
                {serialNumbers[index] == "" && index != 0 ? "X" : "+"}
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-row gap-6 my-2">
          <button
            type="submit"
            className="text-white bg-[#6469ff] font-medium rounded-md
          text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
