"use client";
import { useState } from "react";

 const FilterMobileSearch =() =>{
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [possession, setPossession] = useState([]);
  const [subProperty, setSubProperty] = useState([]);
  const [salesType, setSalesType] = useState([]);
  const [postedBy, setPostedBy] = useState([]);

  const toggleSelection = (stateSetter, state, value) => {
    state.includes(value)
      ? stateSetter(state.filter((v) => v !== value))
      : stateSetter([...state, value]);
  };

  return (
    <div className="p-4 text-sm font-medium max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">Filters</h2>
        <button className="text-orange-500 text-sm">Reset</button>
      </div>

      {/* City/Locality */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-600">
          Select City/Localities
        </label>
        <input
          type="text"
          placeholder="+ Enter city , Location"
          className="w-full border rounded-md px-3 py-2 placeholder-gray-500"
        />
      </div>

      {/* Budget */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Budget</label>
        <div className="flex items-center gap-2 mb-2">
          <select
            className="border px-2 py-1 rounded-md w-full"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
          >
            <option>Min</option>
            <option>10L</option>
            <option>20L</option>
          </select>
          <span>to</span>
          <select
            className="border px-2 py-1 rounded-md w-full"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
          >
            <option>Max</option>
            <option>50L</option>
            <option>1Cr</option>
          </select>
        </div>
        <input type="range" className="w-full accent-orange-500" />
      </div>

      {/* Possession Status */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Possession Status</label>
        <div className="flex flex-wrap gap-2">
          {["Ready To Move", "Under Construction"].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(setPossession, possession, item)}
              className={`px-3 py-1 border rounded-full ${
                possession.includes(item)
                  ? "bg-orange-100 border-orange-500"
                  : ""
              }`}
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Property Types */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Sub Property Types</label>
        <div className="flex flex-wrap gap-2">
          {[
            "Flat",
            "House/ Villas",
            "Plot/Land",
            "Office",
            "Shop",
            "Farm House",
            "Godown",
            "Commercial",
            "Industrials Shed/Land",
          ].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(setSubProperty, subProperty, item)}
              className={`px-3 py-1 border rounded-full ${
                subProperty.includes(item)
                  ? "bg-orange-100 border-orange-500"
                  : ""
              }`}
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Sales Types */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Sales Types</label>
        <div className="flex flex-wrap gap-2">
          {["New", "Resale"].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(setSalesType, salesType, item)}
              className={`px-3 py-1 border rounded-full ${
                salesType.includes(item)
                  ? "bg-orange-100 border-orange-500"
                  : ""
              }`}
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Posted By */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Posted By</label>
        <div className="flex flex-wrap gap-2">
          {["Owner", "Broker", "Agent"].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(setPostedBy, postedBy, item)}
              className={`px-3 py-1 border rounded-full ${
                postedBy.includes(item) ? "bg-orange-100 border-orange-500" : ""
              }`}
            >
              + {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FilterMobileSearch