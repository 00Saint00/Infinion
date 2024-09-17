import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";

const CampaignInfo = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [digestCampaign, setDigestCampaign] = useState(false);
  const [linkedKeywords, setLinkedKeywords] = useState([]);
  const [dailyDigest, setDailyDigest] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://infinion-test-int-test.azurewebsites.net/api/campaign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignName,
            campaignDescription,
            startDate,
            endDate,
            digestCampaign,
            linkedKeywords,
            dailyDigest,
          }),
        }
      );
      if (response.ok) {
        setModalOpen(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Error! Creating Campaign");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000); // Close the error modal after 3 seconds
      }
    } catch (error) {
      setErrorMessage("Error creating campaign: " + error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); // Close the error modal after 3 seconds
    }
  };

  const handleToggle = () => {
    setDailyDigest(!dailyDigest);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const isFormValid =
    campaignName &&
    campaignDescription &&
    startDate &&
    endDate &&
    dailyDigest &&
    linkedKeywords.length > 0;

  return (
    <div className="pt-[30px] px-[85px]">
      <div className="py-[16px] flex justify-between">
        <h2 className="text-[#247B7B] font-bold text-[20px] m-0 ">
          Create New Campaign
        </h2>
      </div>
      <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <div className="text-start">
          <p>Campaign Name</p>
          <input
            type="text"
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
          />
        </div>
        <div className="text-start">
          <p>Campaign Description</p>
          <textarea
            value={campaignDescription}
            onChange={(event) => setCampaignDescription(event.target.value)}
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
          />
        </div>
        <div className="flex justify-between py-[10px] gap-[26px]">
          <div className="text-start w-[100%]">
            <p>Start Date</p>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
            />
          </div>
          <div className="text-start w-[100%]">
            <p>End Date</p>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
            />
          </div>
        </div>

        <div className="text-start flex justify-between">
          <p>Want to receive daily digest about the campaign?</p>
          <div className="w-16 relative">
            <label
              htmlFor="daily-digest-toggle"
              className="bg-[#6E0080] rounded-full flex items-center cursor-pointer"
            >
              <span
                className={`${
                  dailyDigest ? "bg-white translate-x-full" : ""
                } bg-white w-[2rem] h-[2rem] inline-block flex items-center justify-center rounded-full transition-transform duration-300`}
              ></span>
            </label>
            <input
              id="daily-digest-toggle"
              type="checkbox"
              checked={dailyDigest}
              onChange={handleToggle}
              className="absolute opacity-0"
            />
          </div>
        </div>

        <div className="text-start">
          <p>Linked Keywords</p>
          <input
            type="text"
            value={linkedKeywords}
            onChange={(event) =>
              setLinkedKeywords(event.target.value.split(","))
            }
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
          />
        </div>
        <div className="text-start">
          <p>Daily Digest</p>
          <select
            value={dailyDigest}
            onChange={(event) => setDailyDigest(event.target.value)}
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-[155px] h-[40px]"
          >
            <option value="">Select</option>

            <option value="Hourly">Hourly</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        {/* <div className="text-start flex justify-between">
          <p>Daily Digest</p>
          <div className="w-16 relative">
            <label
              htmlFor="daily-digest-toggle"
              className="bg-[#6E0080] rounded-full flex items-center cursor-pointer"
            >
              <span
                className={`${
                  dailyDigest ? "bg-white translate-x-full" : ""
                } bg-white w-[2rem] h-[2rem] inline-block flex items-center justify-center rounded-full transition-transform duration-300`}
              ></span>
            </label>
            <input
              id="daily-digest-toggle"
              type="checkbox"
              checked={dailyDigest}
              onChange={handleToggle}
              className="absolute opacity-0"
            />
          </div>
        </div> */}

        <div className="flex gap-[20px]">
          <button
            type="submit"
            onClick={handleCancel}
            className="border-[#247B7B] border-1 w-[156px] p-[10px] px-[22px] flex justify-center rounded-[4px] my-[20px] text-[#247B7B] text-[14px] font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-[#247B7B] w-[196px] p-[10px] px-[32px] flex justify-center rounded-[4px] my-[20px] ${
              isFormValid ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            <span className="text-white text-[14px] font-semibold">
              Create Campaign
            </span>
          </button>
        </div>
      </form>
      {(modalOpen || errorMessage) && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000070] flex justify-center items-center">
          <div className="bg-white py-[72px] px-[78px] rounded-[10px]">
            {errorMessage ? (
              <>
                <div className="flex justify-center mb-[10px]">
                  <div className="bg-red-600 rounded-full p-[20px]">
                    <BiSolidErrorAlt className="text-white h-[50px] w-[50px]" />
                  </div>
                </div>
                <p>{errorMessage}</p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-[24px]">
                  <div className="bg-[#247B7B] rounded-full p-[20px]">
                    <FaCheck className="text-white h-[50px] w-[50px]" />
                  </div>
                </div>

                <div className="my-24px">
                  <p className="my-[24px]">Campaign created successfully.</p>
                  <button
                    className="bg-[#247B7B] text-white  py-[12px] px-[36px] rounded-[5px] text-[12px] "
                    onClick={() => {
                      setModalOpen(false);
                      setErrorMessage("");
                      navigate("/campaign");
                    }}
                  >
                    Back to Campaign List
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignInfo;
