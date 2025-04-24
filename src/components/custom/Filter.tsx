import { Filter, X } from 'lucide-react'; // optional icons

const Filters = ({
  status,
  setStatus,
  category,
  setCategory,
  condition,
  setCondition,
  resetFilters,
}: {
  status: string;
  setStatus: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  condition: string;
  setCondition: (val: string) => void;
  resetFilters: () => void;
}) => {
  return (
<div className="w-full sm:flex sm:flex-wrap sm:items-center sm:gap-4 space-y-3 sm:space-y-0 mb-6 px-2">
  {/* Filter label */}
  <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
    <Filter className="w-4 h-4" />
    Filters
  </div>

  <select
    className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="">All Statuses</option>
    <option value="Available">Available</option>
    <option value="Sold">Sold</option>
  </select>

  <select
    className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Clothing">Clothing</option>
    <option value="Books">Books</option>
  </select>

  <select
    className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={condition}
    onChange={(e) => setCondition(e.target.value)}
  >
    <option value="">All Conditions</option>
    <option value="New">New</option>
    <option value="Used">Used</option>
    <option value="Refurbished">Refurbished</option>
  </select>

  <button
    onClick={resetFilters}
    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
  >
    <X className="w-4 h-4" />
    Reset
  </button>
</div>

  );
};

export default Filters;

