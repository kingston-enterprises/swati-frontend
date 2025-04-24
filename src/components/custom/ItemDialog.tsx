import React from "react";
import Button from '@/components/Button';
type Item = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  condition: string;
  status: string;
};

type ItemDialogProps = {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onChat?: () => void;
};

const ItemDialog: React.FC<ItemDialogProps> = ({ open, item, onClose, onChat }) => {
  if (!open || !item) return null;

  return (
    <>
    <div id="detail-modal" class="bg-black opacity-25 fixed inset-0 flex  items-center justify-center z-10"></div>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className=" h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-primary text-4xl font-bold">{item.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <img
              src={item.images[0] || "https://via.placeholder.com/800x600"}
              alt={item.title}
              className="h-auto w-full rounded"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg text-black">{item.description}</p>
            <p className="text-xl font-semibold text-primary">E{item.price.toFixed(2)}</p>
            <p className="text-sm text-black">Category: {item.category}</p>
            <p className="text-sm text-black">Condition: {item.condition}</p>
            <p className="text-sm text-black">Status: {item.status}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          {onChat && (
            <Button variant="secondary" rounded="full" onClick={onChat}>Chat with Seller</Button>
          )}

            <Button variant="secondary" rounded="full" onClick={onClose}>close</Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ItemDialog;

