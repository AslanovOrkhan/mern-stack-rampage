import * as React from "react";

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="bg-[#1F2937] text-white px-4 py-2 rounded-md border border-gray-500"
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const SelectTrigger = ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);
export const SelectValue = ({ placeholder }: { placeholder: string }) => (
  <span className="text-gray-400">{placeholder}</span>
);
export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
);
