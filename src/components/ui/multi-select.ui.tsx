"use client";

import CheckIcon from "@/assets/icons/check.svg";
import ChevronIcon from "@/assets/icons/chevron.svg";
import CardBlock from "@/components/blocks/card.block";
import InputUI from "@/components/ui/input.ui";
import PopoverUI from "@/components/ui/popover.ui";
import { cn } from "@/lib/utils.lib";
import { useMemo, useState } from "react";

interface MultiSelectUiProps<T> {
  items: T[];
  selectedItems?: T[];
  uniqueKey: keyof T;
  displayKey: keyof T;
  refWrap?: React.ForwardedRef<HTMLDivElement>;
  onChange?: (value: T[]) => void;
}

const MultiSelectUi = <T extends { [key: string]: unknown }>({
  items,
  selectedItems,
  uniqueKey,
  displayKey,
  onChange,
}: MultiSelectUiProps<T>) => {
  const [isOpen, setOpen] = useState(false);

  const getCodesByValue = useMemo(
    () =>
      selectedItems
        ? selectedItems.map((item) => item[uniqueKey as keyof T])
        : [],
    [selectedItems, uniqueKey]
  );

  const selectItem = (selected: T) => {
    if (!onChange) return;

    const finedValue = selectedItems?.find(
      (item) => item[uniqueKey as keyof T] === selected[uniqueKey as keyof T]
    );
    const returnValue = finedValue
      ? selectedItems?.filter(
          (item) =>
            item[uniqueKey as keyof T] !== selected[uniqueKey as keyof T]
        )
      : [...(selectedItems ?? []), selected];

    onChange(returnValue ?? []);
  };

  return (
    <PopoverUI
      className="w-full"
      position="bottom"
      margin={0}
      isShow={isOpen}
      overlay={
        <CardBlock className="p-0 w-full z-10">
          {items.map((item) => (
            <div
              key={String(item[uniqueKey as keyof T])} // Преобразуем ключ в строку для key
              className={cn(
                "cursor-pointer p-1 group hover:bg-accent hover:text-text-secondary default-hover"
              )}
              onClick={() => selectItem(item)}
            >
              <div className="flex justify-between items-center px-2">
                <span>{String(item[displayKey as keyof T])}</span>{" "}
                {getCodesByValue.includes(item[uniqueKey as keyof T]) && (
                  <span>
                    <CheckIcon className="w-4 h-4fill-black group-hover:fill-text-secondary" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardBlock>
      }
    >
      <InputUI
        className="cursor-pointer caret-transparent "
        onClick={() => items.length && setOpen(!isOpen)}
        value={
          selectedItems
            ?.map((item) => String(item[displayKey as keyof T]))
            .join(", ") ?? ""
        }
        readOnly
        placeholder={items.length ? "Выберите пункт" : "Отсутствуют параметры"}
        rightIcon={
          items.length ? (
            <ChevronIcon
              className={cn("w-2 h-2", isOpen ? "-rotate-90" : "rotate-90")}
            />
          ) : null
        }
      />
    </PopoverUI>
  );
};

export default MultiSelectUi;
