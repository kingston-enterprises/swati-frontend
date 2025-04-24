import React from "react";
import { Pencil, Trash2 } from "lucide-react";

type ItemCardProps = {
  item: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    condition: string;
    status: string;
  };
  onEdit?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
  onViewDetails?: (item: ItemCardProps["item"]) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="relative border rounded-lg shadow p-4 space-y-2 bg-white">
      {item.images.length > 0 && (
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-40 object-cover rounded"
        />
      )}

      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p className="text-gray-500">${item.price.toFixed(2)}</p>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="text-xs text-gray-500">
        {item.category} · {item.condition} · {item.status}
      </p>

      <div className="absolute top-2 right-2 flex space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(item._id)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(item._id)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        )}
      </div>

      {onViewDetails && (
        <button
          className="w-full mt-4 py-2 bg-primary text-white rounded hover:bg-accent"
          onClick={() => onViewDetails(item)}
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default ItemCard;

