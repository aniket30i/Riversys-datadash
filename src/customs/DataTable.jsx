import { useState, useEffect } from "react";
import { useContext } from "react";
import { ContextProvider } from "../context/ContextProvider";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { data } from "../data/data";

const initialColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "Vendor", headerName: "Vendor", width: 130 },
  {
    field: "VendorCode",
    headerName: "Vendor Code",
    type: "number",
    width: 100,
  },
  {
    field: "POhash",
    headerName: "PO#",
    type: "number",
    width: 130,
  },
  {
    field: "PO Line",
    headerName: "PO Line",
    type: "number",
    width: 120,
  },
  {
    field: "Description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "PO Value-INR",
    headerName: "PO Value-INR",
    type: "number",
    width: 130,
  },
  {
    field: "Qty Ordered",
    headerName: "Qty Ordered",
    type: "number",
    width: 130,
  },
  {
    field: "Qty Shipped",
    headerName: "Qty Shipped",
    type: "number",
    width: 130,
  },
  {
    field: "GR Quantity",
    headerName: "GR Quantity",
    type: "number",
    width: 130,
  },
  {
    field: "UOM",
    headerName: "UOM",
    width: 100,
  },
  {
    field: "DueDate",
    headerName: "Due Date",
    width: 140,
  },
  {
    field: "Committed Date",
    headerName: "Committed Date",
    width: 140,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      let color;
      switch (params.value) {
        case "Accepted":
          color = "#367403";
          break;
        case "Rejected":
          color = "#da0c16";
          break;
        case "Review Req":
          color = "#c9960b";
          break;
        case "Delayed":
          color = "#3b1e1f";
          break;
        default:
          color = "#0c68e0";
      }
      return <span style={{ color }}>{params.value}</span>;
    },
  },
];

const initialRows = data.map((item) => ({
  id: item.id,
  Vendor: item.Vendor,
  VendorCode: item.VendorCode,
  POhash: item.POhash,
  "PO Line": item["PO Line"],
  Description: item.Description,
  "PO Value-INR": item["PO Value - INR"],
  "Qty Ordered": item["Qty Ordered"],
  "Qty Shipped": item["Qty Shipped"] || "-",
  "GR Quantity": item["GR Quantity"] || "-",
  UOM: item.UOM,
  DueDate: item.DueDate,
  "Committed Date": item["Committed Date"] || "-",
  Status: item.Status,
}));

export default function DataTable() {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);
  const { searchQuery } = useContext(ContextProvider);
  const [isQuery, setIsQuery] = useState(false);
  const [searchRow, setSearchRow] = useState([]);
  const { dateRange } = useContext(ContextProvider);

  const [filters, setFilters] = useState({
    statusOptions: "",
    vendorcode: "",
    pohash: "",
    UOM: "",
  });

  // Convert to 'yyyy-mm-dd'
  const convertDateFormat = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split(/[-/]/);
    // Split by '-' or '/'
    if (parts.length === 3) {
      // Handling dd/mm/yyyy or yyyy-mm-dd
      const [day, month, year] =
        parts.length === 3 && parts[0].length === 4
          ? [parts[2], parts[1], parts[0]] // yyyy-mm-dd
          : [parts[0], parts[1], parts[2]]; // dd/mm/yyyy
      return `${year}-${month}-${day}`;
      // Conversion to 'yyyy-mm-dd'
    }
    return null;
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applySearch = (rows, searchQuery) => {
    return rows.filter((row) => {
      const matchSearch = searchQuery
        ? row.Vendor?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchSearch;
    });
  };

  useEffect(() => {
    const searchResults = applySearch(rows, searchQuery);
    setSearchRow(searchResults);
    setIsQuery(searchQuery.length > 0);
  }, [searchQuery, rows]);

  useEffect(() => {
    if (isQuery) {
      setColumns([
        { field: "id", headerName: "ID", width: 70 },
        { field: "Vendor", headerName: "Vendor", width: 130 },
        {
          field: "VendorCode",
          headerName: "Vendor Code",
          type: "number",
          width: 150,
        },
        { field: "Description", headerName: "Description", width: 200 },
      ]);
    } else {
      setColumns(initialColumns);
    }
  }, [isQuery]);

  const applyFilters = (rows, filters) => {
    return rows.filter((row) => {
      /////// Vendor code filter
      const matchVendorCode = filters.vendorcode
        ? row.VendorCode?.toString().includes(filters.vendorcode.toString())
        : true;
      /////// PO# filter
      const matchPohash = filters.pohash
        ? row.POhash?.toString().includes(filters.pohash.toString())
        : true;

      ////// UOM filter
      const matchUOM = filters.UOM
        ? row.UOM?.toLowerCase().includes(filters.UOM.toLowerCase())
        : true;

      ////// Date filter
      const rowDate = row.DueDate;
      const rowDateFormatted = convertDateFormat(rowDate);

      const startDate = dateRange.start;
      const endDate = dateRange.end;

      ////// Status filter
      const matchStatus =
        filters.statusOptions === "Open"
          ? row.Status === "Open"
          : filters.statusOptions === "Accepted"
          ? row.Status === "Accepted"
          : filters.statusOptions === "Rejected"
          ? row.Status === "Rejected"
          : filters.statusOptions === "Review Req"
          ? row.Status === "Review Req"
          : filters.statusOptions === "GRN posted"
          ? row.Status === "GRN posted"
          : filters.statusOptions === "Delayed"
          ? row.Status === "Delayed"
          : filters.statusOptions === "Dispatched"
          ? row.Status === "Dispatched"
          : true;

      return (
        (!startDate || rowDateFormatted >= startDate) &&
        (!endDate || rowDateFormatted <= endDate) &&
        matchVendorCode &&
        matchPohash &&
        matchStatus &&
        matchUOM
      );
    });
  };

  const filteredRows = applyFilters(rows, filters);

  return (
    <div
      style={{
        height: 600,
        width: "100%",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "15px",
      }}
    >
      <div style={{ marginBottom: "10px", display: "flex" }}>
        {!isQuery && (
          <>
            <FormControl
              variant="outlined"
              sx={{ minWidth: 120, marginRight: "10px" }}
            >
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                name="statusOptions"
                label="Status"
                value={filters.statusOptions}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Open">Response Awaited</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Review Req">Review Requested</MenuItem>
                <MenuItem value="GRN posted">GRN posted</MenuItem>
                <MenuItem value="Delayed">Delayed</MenuItem>
                <MenuItem value="Dispatched">Dispatched</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="vendorcode"
              label="Vendor Code"
              variant="outlined"
              value={filters.vendorcode}
              onChange={handleFilterChange}
              style={{ marginRight: "10px" }}
            />
            <TextField
              name="pohash"
              label="PO#"
              variant="outlined"
              value={filters.pohash}
              onChange={handleFilterChange}
              style={{ marginRight: "10px" }}
            />
            <TextField
              name="UOM"
              label="UOM"
              variant="outlined"
              value={filters.UOM}
              onChange={handleFilterChange}
              style={{ marginRight: "10px" }}
            />
          </>
        )}
      </div>
      <DataGrid
        rows={isQuery ? searchRow : filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
