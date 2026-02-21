import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const labelConfig = {
  new: { text: "NEW", className: "bg-accent text-accent-foreground" },
  popular: { text: "POPULAR", className: "bg-primary text-primary-foreground" },
  bestseller: { text: "BESTSELLER", className: "bg-destructive text-destructive-foreground" },
};

export function ProductCard({ product, lang = "en", isAdmin, onEdit }: { product: Product; lang?: Lang; isAdmin?: boolean; onEdit?: (product: Product) => void }) {
  const label = product.label ? labelConfig[product.label] : null;

  const displayName =
    (lang === "zh" && product.name_zh) ? product.name_zh :
    (lang === "vi" && product.name_vi) ? product.name_vi :
    product.name;

  const displayDesc =
    (lang === "zh" && product.description_zh) ? product.description_zh :
    (lang === "vi" && product.description_vi) ? product.description_vi :
    product.description;

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={displayName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {label && (
          <Badge className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${label.className} text-[8px] sm:text-[10px] tracking-widest font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg`}>
            {label.text}
          </Badge>
        )}
        {isAdmin && onEdit && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 h-7 w-7 sm:h-8 sm:w-8 shadow-lg"
            onClick={(e) => { e.stopPropagation(); onEdit(product); }}
          >
            <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
      <CardContent className="p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-lg leading-tight text-foreground truncate">{displayName}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">{displayDesc}</p>
          </div>
          <span className="text-base sm:text-xl font-bold text-primary whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
