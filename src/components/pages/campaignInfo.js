import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";

const CampaignInfo = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`)
      .then((response) => response.json())
      .then((data) => setCampaign(data));
  }, [id]);

  const handleBack = () => {
    navigate("/campaign");
  };

  const handleEdit = () => {
    navigate(`/edit-campaigns/${id}`);
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    fetch(
      `https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          setShowConfirm(false);
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/campaign");
          }, 2000);
        } else {
          console.error("Error deleting campaign:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting campaign:", error));
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="pt-[30px] px-[85px]">
      <>
        <button className="flex gap-2 items-center" onClick={handleBack}>
          <FaArrowLeft />
          Back
        </button>
      </>
      <div className="py-[16px] flex justify-between">
        <h2 className="text-[#247B7B] font-bold text-[20px] m-0 ">
          Campaign Information
        </h2>

        <div className="py-[8px] px-[18px] flex text-[14px] bg-[#EDF0F0] rounded-[4px]">
          <span className="border-r-2 mr-2 pr-2"> Campaign Status</span>
          <span
            className={`${
              campaign.campaignStatus?.toLowerCase() === "inactive"
                ? "text-red-500"
                : "text-green-500"
            } `}
          >
            {campaign.campaignStatus}
          </span>
        </div>
      </div>
      <div>
        <div className="text-start">
          <p>Campaign Name</p>
          <input
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
            value={campaign.campaignName || ""}
            disabled
          />
        </div>

        <div className="flex gap-[40px] text-start justify-between py-[24px]">
          <div className="w-[100%]">
            <p>Start Date</p>
            <input
              type="date"
              className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
              value={
                new Date(campaign.startDate).toLocaleDateString("en-CA") || ""
              }
              disabled
            />
          </div>
          <div className="w-[100%]">
            <p>End Date</p>
            <input
              type="date"
              className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
              value={
                new Date(campaign.endDate).toLocaleDateString("en-CA") || ""
              }
              disabled
            />
          </div>
        </div>
        <div className="text-start">
          <div className="w-[100%]">
            <p>Linked Keywords</p>
            <ul className="border-1 flex px-[10px] pt-[10px] pb-[46px] gap-2">
              {campaign.linkedKeywords?.map((keyword, index) => (
                <li
                  className="px-[11px] py-[5px] text-white bg-[#247B7B] rounded-[4px] w-[73px] text-center"
                  key={index}
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-start">
          <div className="w-[100%]">
            <p> Want to receive daily digest about the campaign?</p>
            <select
              className="border-1 px-[10px] pt-[10px] pb-[10px] w-full"
              value={campaign.digestCampaign}
              disabled
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div className="text-start mt-3">
          <div className="w-[100%]">
            <p> Kindly select the time you want tio receive daily digest</p>
            <select
              className="border-1 px-[10px] pt-[10px] pb-[10px] w-full"
              value={campaign.dailyDigest}
              disabled
            >
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
        </div>

        <div className="flex gap-[30px] my-[50px]">
          <button
            className="border-2 text-black border-black py-[12px] px-[36px] rounded-[5px] text-[14px]"
            onClick={handleEdit}
          >
            Edit Campaign
          </button>

          <button
            className="bg-[#990000] text-white py-[12px] px-[36px] rounded-[5px] text-[14px]"
            onClick={handleDelete}
          >
            Stop Campaign
          </button>
        </div>
        {showConfirm && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-[50px] w-[572px] h-[341px]">
              <div className="border-b-2 mb-4 pb-4 w-full">
                <div className="flex justify-center mb-[10px]">
                  <div className="bg-red-600 rounded-full p-[20px]">
                    <BiSolidErrorAlt className="text-white h-[50px] w-[50px]" />
                  </div>
                </div>
                <h2 className="text-[16px] font-semibold">Stop Campaign</h2>
              </div>

              <p className="test-[14px]">
                Are you sure you want to stop this campaign?
              </p>
              <div className="flex justify-center mt-4 gap-[20px]">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                  onClick={cancelDelete}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-[50px] w-[572px] h-[341px]">
              <div className="border-b-2 mb-4 pb-4 w-full">
                <div className="flex justify-center mb-[10px]">
                  <div className="bg-[#247B7B] rounded-full p-[20px]">
                    <FaCheck className="text-white h-[50px] w-[50px]" />
                  </div>
                </div>
                <h2 className="text-[16px] font-bold">
                  Campaign Stopped Successfully!
                </h2>
              </div>

              <p className="text-[14px]">
                Campaign has been stopped successfully. Redirecting to campaigns
                page...
              </p>
              <div className="flex justify-end mt-4">
                <i className="fa-solid fa-spinner fa-spin text-green-500"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignInfo;
