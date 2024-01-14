import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { SetStateAction } from "react";

interface DropdownProp {
  value: string | null;
  setValue: React.Dispatch<SetStateAction<string | null>>;
  selectTitle?: string;
  options: string[] | undefined;
  placeholder?: string | null;
  triggerStyles: string;
  contentStyles: string;
  itemStyles: string;
  sideOffset: number;
}

const SelectDropdown = ({
  value,
  setValue,
  selectTitle,
  options,
  placeholder,
  triggerStyles,
  contentStyles,
  itemStyles,
  sideOffset,
}: DropdownProp) => {
  return (
    <Select value={value ? value : undefined} onValueChange={setValue}>
      <SelectTrigger className={triggerStyles}>
        <SelectValue placeholder={placeholder} />
        {value == null ? <p className="w-full text-start">Sort by</p> : null}
      </SelectTrigger>
      <SelectContent className={contentStyles} sideOffset={sideOffset}>
        <SelectGroup className="bg-inherit">
          {selectTitle ? (
            <SelectLabel className="p-2">{selectTitle}</SelectLabel>
          ) : null}
          {options &&
            options.map((option) => (
              <SelectItem value={option} key={option} className={itemStyles}>
                {option}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
