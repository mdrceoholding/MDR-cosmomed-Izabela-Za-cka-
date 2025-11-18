import { SidebarItem } from '../types';
import { classNames } from '../utils/helpers';

interface SidebarProps {
  current: string;
  setCurrent: (name: string) => void;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: "fa-gauge" },
  { name: "Cap Table", icon: "fa-layer-group" },
  { name: "Emisje", icon: "fa-coins" },
  { name: "Transakcje", icon: "fa-arrow-right-arrow-left" },
  { name: "WZA/Głosowania", icon: "fa-users-between-lines" },
  { name: "Dokumenty", icon: "fa-folder-open" },
  { name: "Wzory dokumentów", icon: "fa-file-invoice", highlight: true },
  { name: "Akcjonariusze", icon: "fa-users" },
  { name: "KYC/AML", icon: "fa-shield" },
  { name: "Audyt", icon: "fa-magnifying-glass" },
  { name: "Ustawienia", icon: "fa-gear" }
];

export default function Sidebar({ current, setCurrent }: SidebarProps) {
  return (
    <nav className="fixed inset-y-0 left-0 w-64 bg-slate-800 flex flex-col text-slate-100 z-10 transition-all">
      <div className="flex items-center gap-3 h-20 px-6 border-b-2 border-slate-700 font-bold text-2xl tracking-tight">
        <span className="text-blue-400">
          <i className="fa-solid fa-building-columns"></i>
        </span>
        Rejestr PSA
      </div>
      <ul className="flex-1 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {sidebarItems.map((item, i) => (
          <li key={i}>
            <a
              onClick={() => setCurrent(item.name)}
              className={classNames(
                "flex items-center gap-4 px-6 py-3 rounded-lg cursor-pointer group transition",
                item.highlight
                  ? "text-blue-400"
                  : "hover:bg-slate-700 hover:text-blue-400",
                current === item.name && "bg-slate-700 !text-blue-400"
              )}
            >
              <i className={`fa-solid ${item.icon} text-lg w-6`}></i>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="px-6 py-4 text-xs text-slate-400 border-t border-slate-700">
        © {new Date().getFullYear()} TechStart PSA.
        <br />
        All rights reserved.
      </div>
    </nav>
  );
}
