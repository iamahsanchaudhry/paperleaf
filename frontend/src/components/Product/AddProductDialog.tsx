import { useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  ProductCategory,
  ProductReq,
  StationerySubcategory,
} from "@/types/product.types";
import { stationerySubcategories } from "@/types/product.types";
import { createProduct } from "@/api/productApi";
import { toast } from "sonner";

interface AddProductDialogProps {
  trigger: React.ReactNode;
}

export function AddProductDialog({ trigger }: AddProductDialogProps) {
  const [formData, setFormData] = useState<Omit<ProductReq, "subcategory"> & {
    subcategory?: StationerySubcategory | "";
  }>({
    name: "",
    price: 0,
    description: "",
    image: "",
    availibity: true,
    featuredItem: false,
    category: "stationary",
    subcategory: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false); // control dialog open/close
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleCategoryChange = (value: ProductCategory) => {
    setFormData(prev => ({
      ...prev,
      category: value,
      subcategory: value === "stationary" ? prev.subcategory : undefined,
    }));
  };

  const handleSubCategoryChange = (value: StationerySubcategory) => {
    setFormData(prev => ({ ...prev, subcategory: value }));
  };

  const handleToggle = (checked: boolean) => setFormData(prev => ({ ...prev, availibity: checked }));
  const handleFeaturedToggle = (checked: boolean) => setFormData(prev => ({ ...prev, featuredItem: checked }));

const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }
};

const handleSubmit = async () => {
  setCreating(true);
  try {
    const token = localStorage.getItem("token") || "";

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("availibity", formData.availibity.toString());
    formDataToSend.append("featuredItem", formData.featuredItem.toString());
    formDataToSend.append("description", formData.description);
    formDataToSend.append("subcategory", formData.subcategory || "others");

    console.log(file);
    if (file) {
      console.log("file exists");
      formDataToSend.append("image", file); // append the actual file
    }

    await createProduct(formDataToSend,token);

    toast.success("Product Added!", {
      description: "New Product Added Successfully!",
    });

    setOpen(false); // close dialog
    setFormData({
      name: "",
      price: 0,
      description: "",
      image: "",
      availibity: true,
      featuredItem: false,
      category: "stationary",
      subcategory: "",
    });
    setPreviewUrl("");
    setFile(null); // reset file
  } catch (error) {
    console.error("Failed to create product:", error);
    toast.error("Failed to Add Product!", {
      description: "Cannot create product. Try again",
    });
  } finally {
    setCreating(false);
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in the details below to add a new product.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3 border rounded-md p-2 min-h-[80px]" />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stationary">Stationary</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="decor">Decor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subcategory */}
          {formData.category === "stationary" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subcategory" className="text-right">Subcategory</Label>
              <Select value={formData.subcategory || ""} onValueChange={handleSubCategoryChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {stationerySubcategories.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Image Upload */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="image" className="text-right">Product Image</Label>
            <div className="col-span-3 space-y-2">
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {previewUrl && <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />}
            </div>
          </div>

          {/* Availability & Featured */}
          <div className="flex flex-col gap-4 border-t pt-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="available" className="font-medium">Available</Label>
              <Switch id="available" checked={formData.availibity} onCheckedChange={handleToggle} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="font-medium">Featured Item</Label>
              <Switch id="featured" checked={formData.featuredItem} onCheckedChange={handleFeaturedToggle} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={creating}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={creating} variant="default">
            {creating ? <>Saving... <Spinner /></> : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
