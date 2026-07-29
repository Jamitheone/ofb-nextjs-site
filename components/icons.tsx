// Icon surface for the whole site. Two jobs: one standard stroke weight, and a
// name -> component map so lib/services.ts can stay JSX-free (it is imported by
// generateMetadata and the sitemap, which cannot touch React elements).
//
// Uses lucide-react because it is already a dependency. Adding a second icon
// family for flavor would be a new dep for no user-visible gain at this scale.

import {
  Building2,
  Tag,
  Truck,
  Server,
  FileText,
  Globe,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CircleCheck,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Users,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

/** Every icon on the site draws at this weight. */
export const STROKE = 1.5;

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  building: Building2,
  tag: Tag,
  truck: Truck,
  server: Server,
  fileText: FileText,
  globe: Globe,
};

export {
  Building2,
  Tag,
  Truck,
  Server,
  FileText,
  Globe,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CircleCheck,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Users,
  ClipboardList,
};
export type { LucideIcon };
