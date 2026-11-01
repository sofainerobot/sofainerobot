declare module "lucide-react" {
  import { SVGProps } from "react";

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
    class?: string;
  }

  // Icons used across the Sofaine Robot site & admin panel
  export const ArrowRight: React.FC<LucideProps>;
  export const ArrowUp: React.FC<LucideProps>;
  export const Bot: React.FC<LucideProps>;
  export const Brain: React.FC<LucideProps>;
  export const ChevronDown: React.FC<LucideProps>;
  export const Clock: React.FC<LucideProps>;
  export const Edit: React.FC<LucideProps>;
  export const Facebook: React.FC<LucideProps>;
  export const Globe: React.FC<LucideProps>;
  export const Github: React.FC<LucideProps>;
  export const HelpCircle: React.FC<LucideProps>;
  export const Instagram: React.FC<LucideProps>;
  export const Lock: React.FC<LucideProps>;
  export const LogOut: React.FC<LucideProps>;
  export const Mail: React.FC<LucideProps>;
  export const Menu: React.FC<LucideProps>;
  export const Monitor: React.FC<LucideProps>;
  export const Plus: React.FC<LucideProps>;
  export const Save: React.FC<LucideProps>;
  export const Send: React.FC<LucideProps>;
  export const Settings: React.FC<LucideProps>;
  export const Shield: React.FC<LucideProps>;
  export const ShieldCheck: React.FC<LucideProps>;
  export const Smartphone: React.FC<LucideProps>;
  export const Sparkles: React.FC<LucideProps>;
  export const Trash2: React.FC<LucideProps>;
  export const Users: React.FC<LucideProps>;
  export const X: React.FC<LucideProps>;
  export const Youtube: React.FC<LucideProps>;
  export const Zap: React.FC<LucideProps>;
}
