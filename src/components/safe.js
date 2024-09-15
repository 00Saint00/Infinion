<div className="py-[20px] px-[85px]">
  '
  <div className="text-start py-[10px]">
    <h2 className="text-2xl leading-[28px] font-extrabold text-[#247B7B]">
      All Campaigns6
    </h2>
  </div>
  <div className="py-[10px] flex justify-between">
    <div className="flex gap-[16px]">
      <button className="border-2 border-[#247B7B] p-[10px] text-[14px] text-[#247B7B]">
        All ({data.nodes.length})
      </button>
      <button className="border-2 border-[#247B7B] p-[10px] text-[14px] text-[#247B7B]">
        All ({data.nodes.length})
      </button>
      <button className="border-2 border-[#247B7B] p-[10px] text-[14px] text-[#247B7B]">
        All ({data.nodes.length})
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
  '
  {data.nodes.length > 0 && (
    <CompactTable columns={COLUMNS} data={data} theme={theme} />
  )}
</div>;



//pagination

<div style={{ display: "flex", justifyContent: "space-between" }}>
<span>
  Page:{" "}
  {pagination.state.getPages(data.nodes).map((_, index) => {
    if (
      index === pagination.state.page ||
      index === pagination.state.page + 1 ||
      index === pagination.state.page + 2
    ) {
      return (
        <button
          key={index}
          type="button"
          style={{
            fontWeight:
              pagination.state.page === index ? "bold" : "normal",
          }}
          onClick={() => pagination.fns.onSetPage(index)}
        >
          {index + 1}
        </button>
      );
    } else if (
      index === 0 ||
      index === pagination.state.getTotalPages(data.nodes) - 1
    ) {
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
      index === pagination.state.page - 1 &&
      pagination.state.page > 2
    ) {
      return <span key={index}>...</span>;
    } else if (
      index === pagination.state.page + 3 &&
      pagination.state.page <
        pagination.state.getTotalPages(data.nodes) - 2
    ) {
      return <span key={index}>...</span>;
    }
    return null;
  })}
</span>

<span>showing result 10 of {data.nodes.length} results</span>
</div>  