import { useState, useEffect } from "react";
import {
  Sliders,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const EcommercePage = () => {
  const [dresses, setDresses] = useState([]);
  const [filteredDresses, setFilteredDresses] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    color: [],
    size: [],
    type: [],
    priceRange: [0, 200],
  });
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDresses();
  }, []);

  useEffect(() => {
    if (dresses.length > 0) {
      applyFilters();
    }
  }, [dresses, filters, sortOption, sortDirection]);

  const fetchDresses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/dresses.json");
      if (!response.ok) {
        throw new Error("Failed to fetch dresses");
      }
      const data = await response.json();
      setDresses(data.dresses);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = dresses.filter(
      (dress) =>
        dress.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.color.length === 0 || filters.color.includes(dress.color)) &&
        (filters.size.length === 0 || filters.size.includes(dress.size)) &&
        (filters.type.length === 0 || filters.type.includes(dress.type)) &&
        dress.price >= filters.priceRange[0] &&
        dress.price <= filters.priceRange[1]
    );

    result.sort((a, b) => {
      if (a[sortOption] < b[sortOption])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortOption] > b[sortOption])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredDresses(result);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (category === "name") {
        updatedFilters.name = value;
      } else if (category === "priceRange") {
        updatedFilters.priceRange = value;
      } else {
        if (updatedFilters[category].includes(value)) {
          updatedFilters[category] = updatedFilters[category].filter(
            (item) => item !== value
          );
        } else {
          updatedFilters[category] = [...updatedFilters[category], value];
        }
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (option) => {
    if (option === sortOption) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  const FilterCheckbox = ({ category, value }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={filters[category].includes(value)}
        onChange={() => handleFilterChange(category, value)}
        className="form-checkbox text-blue-600"
      />
      <span>{value}</span>
    </label>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          {isSidebarOpen && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Sliders className="mr-2" size={20} />
                Filters
              </h2>

              {/* Name Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Name</h3>
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Search by name"
                />
              </div>

              {/* Color Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Color</h3>
                <FilterCheckbox category="color" value="Blue" />
                <FilterCheckbox category="color" value="Black" />
                <FilterCheckbox category="color" value="Green" />
                <FilterCheckbox category="color" value="Red" />
                <FilterCheckbox category="color" value="White" />
                <FilterCheckbox category="color" value="Navy" />
              </div>

              {/* Size Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Size</h3>
                <FilterCheckbox category="size" value="S" />
                <FilterCheckbox category="size" value="M" />
                <FilterCheckbox category="size" value="L" />
              </div>

              {/* Type Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Type</h3>
                <FilterCheckbox category="type" value="Casual" />
                <FilterCheckbox category="type" value="Formal" />
                <FilterCheckbox category="type" value="Semi-Formal" />
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex justify-between mb-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [
                      filters.priceRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="10"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [
                      parseInt(e.target.value),
                      filters.priceRange[1],
                    ])
                  }
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dresses Collection</h1>

        {/* Sort Options */}
        <div className="mb-4 flex justify-end">
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded p-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="ml-2 p-2 border rounded"
          >
            {sortDirection === "asc" ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDresses.map((dress) => (
            <div key={dress.id} className="bg-white rounded shadow p-4">
              <img
                src={`https://i.pinimg.com/736x/7d/a2/0c/7da20c4a27941504a8ee4502be1bff73.jpg`}
                alt={dress.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{dress.name}</h3>
              <p className="text-gray-600">${dress.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {dress.color} | {dress.size} | {dress.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;
