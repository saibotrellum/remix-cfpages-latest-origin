import type { HTMLInputTypeAttribute } from "react";
import type React from "react";
import type { TTranslatedOptions } from "~/components/contacts/Helpers";

export interface FormProps {
  defaultValues: string[];
  onSubmit: (data: any) => void | any;
}

export enum InputTypes {
  female = "female",
  male = "male",
  other = "other",
}

export interface SharedFieldProps {
  name: string;
  type?: HTMLInputTypeAttribute | undefined;
  label?: string;
}

// Combine additional and default React Form Field options
// Makes "name" mandatory (by overwriting React default with Omit<> )
export interface InputProps
  extends SharedFieldProps,
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "name"
    > {}

export interface SelectProps
  extends SharedFieldProps,
    Omit<
      React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >,
      "name"
    > {
  options: TTranslatedOptions[];
}
