import React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { ChevronsUpDown, CheckIcon } from "lucide-react";

import { Input } from "./Input";
import { Button } from "./Button";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

export const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={`flex w-full m-0 p-0 ${className}`}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      onChange={(value) => {
  if (value) onChange?.(value);
}}
      {...props}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    type="tel"
    className={`flex-1 ${className}`}
    {...props}
  />
));

InputComponent.displayName = "InputComponent";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: { label: string; value: RPNInput.Country | undefined }[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options,
  onChange,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const toggle = () => setOpen((prev) => !prev);
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative z-10">
      <Button
        type="button"
        onClick={toggle}
        disabled={disabled}
        variant="secondary"
        className="flex items-center w-full h-full px-3 py-2"
      >
        <FlagComponent country={selectedCountry} countryName={selectedCountry} />
        <ChevronsUpDown className="h-4 w-4 opacity-60" />
      </Button>

      {open && (
        <div className="absolute left-0 mt-2 max-h-72 w-64 overflow-y-auto bg-white shadow-md">
          <div className="p-2">
            <Input
              placeholder="Search country..."
              value={search}
              onChange={(e:any) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-500">No country found.</li>
            ) : (
              filtered.map(
                (option) =>
                  option.value && (
                    <li
                      key={option.value}
                      onClick={() => {
                        onChange(option.value!);
                        setOpen(false);
                      }}
                      className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-gray-100 ${
                        option.value === selectedCountry ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagComponent
                          country={option.value}
                          countryName={option.label}
                        />
                        {option.label}
                      </div>
                      <span className="text-xs text-gray-500">
                        +{RPNInput.getCountryCallingCode(option.value)}
                      </span>
                      {option.value === selectedCountry && (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      )}
                    </li>
                  )
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden bg-gray-200">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

