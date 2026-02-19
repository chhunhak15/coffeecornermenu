import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, saveProducts, isLoggedIn, logout } from "@/lib/store";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Coffee, Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "coffee",
  label: undefined,
};

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    setProducts(getProducts());
  }, [navigate]);

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }

    let updated: Product[];
    if (editing) {
      updated = products.map((p) => (p.id === editing.id ? { ...form, id: editing.id } : p));
      toast.success("Product updated!");
    } else {
      const newProduct: Product = { ...form, id: Date.now().toString() };
      updated = [...products, newProduct];
      toast.success("Product added!");
    }

    setProducts(updated);
    saveProducts(updated);
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyProduct);
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({ name: product.name, description: product.description, price: product.price, image: product.image, category: product.category, label: product.label });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
    toast.success("Product deleted!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <Coffee className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Menu
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">Products ({products.length})</h2>
          <Button onClick={() => { setEditing(null); setForm(emptyProduct); setDialogOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                    </TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="capitalize">{p.category}</TableCell>
                    <TableCell>
                      {p.label ? (
                        <Badge variant="secondary" className="capitalize text-xs">{p.label}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell>${p.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>Fill in the product details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Iced Americano" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Product["category"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="tea">Tea</SelectItem>
                    <SelectItem value="smoothie">Smoothie</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Label</Label>
              <Select value={form.label || "none"} onValueChange={(v) => setForm({ ...form, label: v === "none" ? undefined : v as Product["label"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No label</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="bestseller">Bestseller</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Save Changes" : "Add Product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
