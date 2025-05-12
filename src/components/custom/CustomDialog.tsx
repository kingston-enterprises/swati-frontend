import { Input }from "./Input";
import {Button }from "./Button";


export const CustomDialog = ({
  open,
  setOpen,
  form,
  setForm,
  editItem,
  handleSubmit,
  handleImageUpload,
  categoryOptions,
  conditionOptions,
  statusOptions,
}:any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-primary rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-6">
          {editItem ? "Edit Item" : "New Item"}
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e:any) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e:any) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e:any) => setForm({ ...form, price: e.target.value })}
          />
          <select
            className="w-full border border-accent p-2 rounded-md"
            value={form.category}
            onChange={(e:any) => setForm({ ...form, category: e.target.value })}
          >
            <option className="border border-accent bg-primary text-secondary" value="">Select Category</option>
            {categoryOptions.map((cat:any) => (
              <option className="border border-accent bg-primary text-secondary" key={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="w-full border border-accent p-2 rounded-md"
            value={form.condition}
            onChange={(e:any) => setForm({ ...form, condition: e.target.value })}
          >
            <option className="border border-accent bg-primary text-secondary" value="">Select Condition</option>
            {conditionOptions.map((cond:any) => (
              <option className="border border-accent bg-primary text-secondary" key={cond}>{cond}</option>
            ))}
          </select>
          <select
            className="w-full border border-accent p-2 rounded-md"
            value={form.status}
            onChange={(e:any) => setForm({ ...form, status: e.target.value })}
          >
            {statusOptions.map((s:any) => (
              <option className="border border-accent bg-primary text-secondary" key={s}>{s}</option>
            ))}
          </select>

          {/* Image Upload */}
          <div>
            <label>Images</label>
            <Input
              type="file"
              
              //accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {form.images.map((img:any, idx:any) => (
                <img
                  key={idx}
                  src={img}
                  alt={`preview-${idx}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {editItem ? "Save Changes" : "Add Item"}
          </Button>
        </div>
      </div>
    </div>
  );
};

