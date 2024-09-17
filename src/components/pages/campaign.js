import React, { useEffect, useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Campaign = () => {
  const [data, setData] = useState({ nodes: [] });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const COLUMNS = [
    {
      label: "S/N",
      renderCell: (item) => item.index + 1,
    },
    {
      label: "Campaign Name",
      renderCell: (item) => item.campaignName,
    },
    {
      label: "Start Date",
      renderCell: (item) => new Date(item.startDate).toLocaleDateString(),
    },
    {
      label: "Status",
      renderCell: (item) => (
        <span
          className={`${
            item.campaignStatus.toLowerCase() === "inactive"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {item.campaignStatus.toUpperCase()}
        </span>
      ),
    },
    {
      label: "Actions",
      renderCell: (item) => (
        <div className="flex gap-4 font-semibold text-[16px]">
          <Link to={`/campaign/${item.campaignName}/${item.id}`}>
            <GoEye className="cursor-pointer" />
          </Link>

          <Link to={`/edit-Campaigns/${item.id}`}>
            <FiEdit className="cursor-pointer" />
          </Link>
          <FaTrashAlt
            className="cursor-pointer"
            onClick={() => handleDelete(item)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch("https://infinion-test-int-test.azurewebsites.net/api/campaign")
      .then((response) => response.json())
      .then((data) => {
        const nodesWithIndex = data.map((item, index) => ({ ...item, index }));
        setData({ nodes: nodesWithIndex });
      });
  }, []);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeletePopup(true);
  };

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const confirmDelete = () => {
    fetch(
      `https://infinion-test-int-test.azurewebsites.net/api/campaign/${itemToDelete.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted:", itemToDelete);
        setDeleteSuccess(true);
        setTimeout(() => {
          setShowDeletePopup(false);
          setDeleteSuccess(false);
          // Update the data state to reflect the deleted item
          setData((prevData) => {
            const updatedNodes = prevData.nodes.filter(
              (node) => node.id !== itemToDelete.id
            );
            return { nodes: updatedNodes };
          });
        }, 2000); // Show success message for 2 seconds
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: ` 
      background-color: #F0F4F4;
      border-radius: 10px !important;`,

      HeaderCell: `
      padding: 12px 10px;
      font-size: 12px !important;
      font-weight: 600;
      line-height: 16px !important;
      z-index: 0;
        `,

      Row: `
      text-align: left;
      padding-left: 0;
      font-size: 14px;
      padding: 16px !important;
      `,

      Cell: `
      padding: 15px 0 12px 0 !important;
    `,
      ActionCell: `
         border-radius: none !important;
      `,
    },
  ]);

  return (
    <div className="py-[20px] px-[85px]">
      <div className="text-start py-[10px]">
        <h2 className="text-2xl leading-[28px] font-extrabold text-[#247B7B]">
          All Campaigns
        </h2>
      </div>
      <div className="py-[10px] flex justify-between mb-[36px]">
        <div className="flex gap-[16px]">
          <button className="border-2 border-[#247B7B] p-[10px] text-[14px] text-[#247B7B] rounded-[4px]">
            All (90)
          </button>
          <button className="border-2 border-[#247B7B] p-[10px] text-[14px] text-[#247B7B] rounded-[4px]">
            Inactive (90)
          </button>
          <button className="border-2 border-[#247B7B] p-[10px] text-[14px] text-[#247B7B] rounded-[4px]">
            Active (90)
          </button>
        </div>
        <div className="flex gap-[28px]">
          <div className="flex border-2 w-[244px] p-[10px] justify-between gap-[30px] items-center ">
            <input
              placeholder="Search..."
              className="h-[16px] border-none outline-none text-[12px]"
            />
            <FaSearch className="text-[#666666]" />
          </div>
          <div className="flex border-2 w-[244px] p-[10px] justify-between gap-[30px] items-center">
            <input
              placeholder="filter by date"
              className="h-[16px] border-none outline-none text-[12px]"
            />
            <FaChevronDown className="text-[#666666]" />
          </div>
        </div>
      </div>
      {/* ... */}
      {data.nodes.length > 0 && (
        <CompactTable
          columns={COLUMNS}
          data={data}
          theme={theme}
          selected={false}
          pagination={pagination}
          className={`${showDeletePopup ? "bg-[#00000070]" : ""} py-[16px]`}
        />
      )}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000070] flex justify-center items-center">
          <div className="bg-white py-[72px] px-[78px] rounded-[10px]">
            {deleteSuccess ? (
              <div>
                <h2 className="text-[18px] font-bold mb-[10px]">
                  Deletion Successful!
                </h2>
                <p>Campaign deleted successfully.</p>
              </div>
            ) : (
              <div className="items-center text-center flex flex-col">
                <div className="border-b-2 mb-4 pb-4 w-full">
                  <h2 className="text-[16px] font-semibold mb-[10px]">
                    Stop Campaign
                  </h2>
                </div>
                <p className="w-[400px]">
                  Are you sure you want to delete "{itemToDelete.campaignName}"
                  campaign? This action cannot be undone.
                </p>
                <div className="flex gap-[10px] mt-[10px]">
                  <button
                    className="border-2 text-black border-black py-[12px] px-[36px]  rounded-[5px] text-[12px]"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#FF0000] text-white py-[12px] px-[16px] rounded-[5px] text-[12px]"
                    onClick={confirmDelete}
                  >
                    Delete Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-4">
        <div className="flex justify-between">
          {/* Pagination buttons container */}
          <span className="flex gap-[10px]">
            {/* Previous page button */}
            <button
              type="button"
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page - 1)
              }
              disabled={pagination.state.page === 0}
            >
              {"<"}
            </button>

            {/* Page number buttons */}
            {pagination.state.getPages(data.nodes).map((_, index) => {
              // Show current page and adjacent pages
              if (
                index === pagination.state.page - 1 || // previous page
                index === pagination.state.page || // current page
                index === pagination.state.page + 1 // next page
              ) {
                return (
                  <button
                    key={index}
                    type="button"
                    style={{
                      // Highlight current page
                      fontWeight:
                        pagination.state.page === index ? "bold" : "normal",
                      backgroundColor:
                        pagination.state.page === index
                          ? "green"
                          : "transparent",
                      color:
                        pagination.state.page === index ? "white" : "black",
                      borderRadius: "50%",
                      padding: "5px 10px",
                    }}
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                index === 0 || // first page
                index === pagination.state.getTotalPages(data.nodes) - 1 // last page
              ) {
                // Show first and last page buttons
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              } else if (
                index === pagination.state.page - 2 && // page before previous page
                pagination.state.page > 2
              ) {
                // Show ellipsis for skipped pages before current page
                return <span key={index}>...</span>;
              } else if (
                index === pagination.state.page + 2 && // page after next page
                pagination.state.page <
                  pagination.state.getTotalPages(data.nodes) - 2
              ) {
                // Show ellipsis for skipped pages after current page
                return <span key={index}>...</span>;
              }
              return null;
            })}

            {/* Next page button */}
            <button
              type="button"
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page + 1)
              }
              disabled={
                pagination.state.page ===
                pagination.state.getTotalPages(data.nodes) - 1
              }
            >
              {">"}
            </button>
          </span>

          {/* Showing results text */}
          <span>
            showing result {pagination.state.page * 10 + 1} -{" "}
            {Math.min((pagination.state.page + 1) * 10, data.nodes.length)} of{" "}
            {data.nodes.length} results
          </span>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
