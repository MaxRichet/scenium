"use client";

import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import Image from "next/image";

type DatePickerProps = {
  name: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  style?: React.CSSProperties;
};

export default function DatePicker({
  name,
  value,
  onChange,
  className,
  style
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mb-[23px]" ref={ref}>
      <input
        type="hidden"
        name={name}
        value={value ? format(value, "yyyy-MM-dd") : ""}
      />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full
          text-left
          ${className}
          mb-0!
        `}
        style={style}
      >
        {value ? format(value, "dd/MM/yyyy") : "Date"}
      </button>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <Image
          src="/calendar.png"
          alt="Calendar Icon"
          width={20}
          height={20}
        />
      </span>

      {open && (
        <div
          className="
            absolute
            z-50
            mt-2
            rounded-xl
            border
            border-gray-700
            bg-neutral-900
            p-4
            shadow-xl
          "
        >
          <DayPicker
            animate
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            className="text-white"
            classNames={{
              caption: "flex justify-center mb-2",
              nav: "flex gap-2",
              nav_button:
                "h-8 w-8 rounded-md border border-gray-600 hover:bg-gray-700 text-[#1495EA]",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell:
                "text-gray-400 w-10 font-normal text-xs uppercase",
              row: "flex w-full mt-1",
              cell: "w-10 h-10 text-center",
              day: "rounded-md hover:bg-[#1495EA] hover:text-white",
              day_selected:
                "bg-[#1495EA] text-white hover:bg-[#1495EA] rounded-full",
              day_today:
                "border border-[#1495EA] text-[#1495EA] rounded-md",
            }}
          />
        </div>
      )}
    </div>
  );
}
