import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editCampaign, setEditCampaign] = useState({
    id: id,
    campaignName: "",
    campaignDescription: "",
    digestCampaign: "No",
    startDate: "",
    endDate: "",
    linkedKeywords: [],
    dailyDigest: "Daily",
  });

  useEffect(() => {
    fetch(`https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEditCampaign(data);
        console.log(data);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditCampaign((prevEditCampaign) => ({
      ...prevEditCampaign,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/campaign");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: id,
      campaignName: editCampaign.campaignName,
      campaignDescription: editCampaign.campaignDescription,
      digestCampaign: editCampaign.digestCampaign === "Yes",
      startDate: editCampaign.startDate,
      endDate: editCampaign.endDate,
      linkedKeywords: editCampaign.linkedKeywords,
      dailyDigest: editCampaign.dailyDigest,
    };

    console.log("Payload being sent:", payload);

    fetch(
      `https://infinion-test-int-test.azurewebsites.net/api/campaign/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `An error occurred... status: ${response.status}, body: ${response.statusText}`
          );
        }
        return response.status;
      })
      .then((data) => {
        if (data !== null) {
          setEditCampaign({ ...editCampaign, ...data });
          console.log("Response data:", data);
        }
        navigate("/");
      })
      .catch((error) => console.error("Submit error:", error));
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
        <h2 className="text-[#247B7B] font-bold text-[20px] m-0">
          Campaign Information
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="text-start">
          <p>Campaign Name</p>
          <input
            type="text"
            value={editCampaign.campaignName}
            onChange={handleChange}
            name="campaignName"
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
          />
        </div>

        <div className="text-start">
          <p>Campaign Description</p>
          <input
            type="text"
            value={editCampaign.campaignDescription}
            onChange={handleChange}
            name="campaignDescription"
            className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
          />
        </div>

        <div className="flex gap-[40px] text-start justify-between py-[24px]">
          <div className="w-[100%]">
            <p>Start Date</p>
            <input
              type="date"
              name="startDate"
              value={
                editCampaign.startDate
                  ? new Date(editCampaign.startDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
            />
          </div>
          <div className="w-[100%]">
            <p>End Date</p>
            <input
              type="date"
              name="endDate"
              value={
                editCampaign.endDate
                  ? new Date(editCampaign.endDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="p-[10px] border-1 text-[#999999] rounded-[4px] w-full"
            />
          </div>
        </div>

        <div className="text-start">
          <div className="w-[100%]">
            <p>Linked Keywords</p>
            <textarea
              className="border-1 px-[10px] pt-[10px] pb-[46px] w-full"
              value={editCampaign.linkedKeywords?.join("\n")}
              onChange={(e) =>
                setEditCampaign({
                  ...editCampaign,
                  linkedKeywords: e.target.value
                    .split("\n")
                    .filter((keyword) => keyword !== ""),
                })
              }
              name="linkedKeywords"
            ></textarea>
          </div>
        </div>

        <div className="text-start">
          <div className="w-[100%]">
            <p>Want to receive daily digest about the campaign?</p>
            <select
              name="digestCampaign"
              className="border-1 px-[10px] pt-[10px] pb-[10px] w-full"
              value={editCampaign.digestCampaign}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="text-start pt-4">
          <div className="w-[100%]">
            <p>Select the time to receive daily digest</p>
            <select
              name="dailyDigest"
              className="border-1 px-[10px] pt-[10px] pb-[10px] w-full"
              value={editCampaign.dailyDigest}
              onChange={handleChange}
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
            type="submit"
            className="border-2 text-black border-black py-[12px] px-[36px] rounded-[5px] text-[14px]"
          >
            Save Campaign
          </button>

          <button
            type="button"
            className="bg-[#990000] text-white py-[12px] px-[36px] rounded-[5px] text-[14px]"
            onClick={() => navigate(-1)}
          >
            Stop Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCampaign;
