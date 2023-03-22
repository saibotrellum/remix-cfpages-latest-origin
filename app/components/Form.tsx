import type { ReactNode } from "react";
import React, { useRef } from "react";
//import {FormProvider, useForm} from 'react-hook-form';
//import {recursiveMap} from "~/utils";
import classNames from "classnames";
import is from "@sindresorhus/is";
import type { InputProps, SelectProps } from "~/components/FormHelpers";
import type { TTranslatedOptions } from "~/lib/Helpers";
import { TSelects } from "~/lib/contexts/App";
import {
  useControlField,
  useField,
  useFormContext,
} from "remix-validated-form";
import { GetInputProps } from "remix-validated-form/browser/internal/getInputProps";
import { useIsSubmitting } from "remix-validated-form";
import { t } from "~/utils";
import { Button } from "react-bootstrap";
import type { ButtonProps } from "react-bootstrap/Button";
import type { InputActionMeta, Props as ReactSelectProps } from "react-select";
import ReactSelect from "react-select";
//import {Editor} from '@tinymce/tinymce-react';

/*export const Form: React.FC<FormProps> = function ({
                                                       defaultValues,
                                                       // @ts-ignore
                                                       children,
                                                       onSubmit,
                                                   }) {
    const methods = useForm({defaultValues});

    return (
        <FormProvider {...methods}>
            <Rform onSubmit={methods.handleSubmit(onSubmit)}>{children}</Rform>
        </FormProvider>
    );
};*/

interface FormattedFieldOptions {
  label?: ReactNode;
  selectOptions?: TTranslatedOptions[];
  opt: InputProps | SelectProps;
}

function _prepDefaultValues(
  opt: SelectProps | InputProps
): FormattedFieldOptions {
  let ret = { opt: {} };
  for (const [key, value] of Object.entries(opt)) {
    if (key == "label") {
      // @ts-ignore
      ret.label = <label htmlFor={opt.name}>{value}</label>;
    } else if (key == "options") {
      // @ts-ignore
      ret.selectOptions = opt.options;
    } else {
      // @ts-ignore
      ret.opt[key] = value;
    }
  }

  if (is.undefined(opt.id)) {
    // @ts-ignore
    ret.opt.id = opt.name;
  }
  // @ts-ignore
  if (is.undefined(opt.type)) {
    // @ts-ignore
    ret.opt.type = "text";
  }

  // @ts-ignore
  if (!is.undefined(opt.className)) {
    // @ts-ignore
    ret.opt.className = classNames("form-control", opt.className);
  } else {
    // @ts-ignore
    ret.opt.className = classNames("form-control");
  }
  return ret as FormattedFieldOptions;
}

export const MySubmitButton = ({
  formId,
  children,
  label = "Submit",
  submittingLabel = "Submitting...",
  showLabel = true,
  ...rest
}: ButtonProps & {
  formId?: string;
  children?: ReactNode | undefined;
  label?: string;
  submittingLabel?: string;
  showLabel?: boolean;
}) => {
  const form = useFormContext(formId);
  return (
    <Button
      disabled={form.isSubmitting}
      {...rest}
      onClick={(e) => {
        form.submit();
      }}
    >
      {children}
      {showLabel && form.isSubmitting ? t(submittingLabel) : t(label)}
    </Button>
  );
};
type MyInputProps = {
  name: string;
  label?: string | null;
  className?: classNames.ArgumentArray | string;
};

export const MyInput = ({
  name,
  label = null,
  id,
  className,
  defaultValue,
  ...rest
}: MyInputProps & JSX.IntrinsicElements["input"]) => {
  id = id ? id : name;
  className = classNames("form-control", className);
  const { error, getInputProps } = useField(name);

  const simpleInput = (
    <>
      <input {...getInputProps({ id: id })} {...rest} className={className} />
      {error && <span className="my-error-class">{error}</span>}
    </>
  );

  return !label ? (
    simpleInput
  ) : (
    <div>
      <label htmlFor={name}>{label}</label>
      {simpleInput}
    </div>
  );
};

export const MySelect = ({
  name,
  label = null,
  id,
  className,
  options,
  ...rest
}: MyInputProps & {
  options: TTranslatedOptions[];
} & JSX.IntrinsicElements["select"]) => {
  id = id ? id : name;
  className = classNames("form-select", className);
  const { error, getInputProps, clearError, validate, defaultValue } =
    useField(name);
  const [value, setValue] = useControlField<string[]>(name);

  const onInputChange = (
    inputValue: string,
    { action, prevInputValue }: InputActionMeta
  ) => {
    console.log(
      "INPUTCHANGE val:",
      inputValue,
      "action",
      action,
      "prev",
      prevInputValue
    );
  };

  const simpleInput = (
    <>
      <ReactSelect
        name={name}
        options={options}
        onChange={() => {
          if (error) clearError();
        }}
        defaultValue={options[0]}
        defaultMenuIsOpen={true}
        closeMenuOnSelect={false}
        closeMenuOnScroll={false}
      />
      <ReactSelect
        name={name + "2"}
        options={options}
        onChange={() => {
          if (error) clearError();
        }}
        defaultMenuIsOpen={true}
        closeMenuOnSelect={false}
        closeMenuOnScroll={false}
      />
      {/*      <select {...getInputProps({ id: id })} {...rest} className={className}>
        {options.map(({ key, label }) => (
          <option
            key={key}
            value={key}
            onClick={() => {
              clearError();
            }}
          >
            {label}
          </option>
        ))}
      </select>*/}
      {error && <span className="my-error-class">{error}</span>}
    </>
  );
  return !label ? (
    simpleInput
  ) : (
    <div>
      <label htmlFor={name}>{label}</label>
      {simpleInput}
    </div>
  );
};
/*

export const Input: React.FC<InputProps> = function ({ ...opt }) {
  // @ts-ignore
  const ret = _prepDefaultValues(opt);

  return (
    <>
      {ret.label}
      <input
        {...(ret.opt as React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >)}
      />
    </>
  );
};

export const Select: React.FC<SelectProps> = function ({ ...opt }) {
  // @ts-ignore
  const ret = _prepDefaultValues(opt);

  // @ts-ignore
  return (
    <>
      {ret.label}
      <select
        {...(ret.opt as React.DetailedHTMLProps<
          React.SelectHTMLAttributes<HTMLSelectElement>,
          HTMLSelectElement
        >)}
      >
        {ret.selectOptions &&
          ret.selectOptions?.map((current) => (
            <option key={current.key} value={current.label}>
              {current.label}
            </option>
          ))}
      </select>
    </>
  );
};
*/

export const RadioGroup = ({
  name,
  options,
  id,
}: {
  name: string;
  options: { label: string; value: string }[];
  id?: string;
}) => {
  const field = useField(name);

  return (
    <div className={"flex flex-col w-full"}>
      {options.map(({ label, value }) => (
        <label key={value} htmlFor={value} className="p-8 hover:bg-slate-200">
          <input
            {...field.getInputProps()}
            id={value}
            type="radio"
            name={name}
            value={value}
            onClick={() => {
              field.clearError();
            }}
            onChange={() => {
              if (field.error) field.clearError();
            }}
          />{" "}
          {label}
        </label>
      ))}

      <div className="text-red-500">{field.error}</div>
    </div>
  );
};

export const RTE: React.FC<InputProps> = function ({ ...opt }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef);
    }
  };

  const lable = is.undefined(opt.label) ? (
    <></>
  ) : (
    <label htmlFor={opt.name}>{opt.label}</label>
  );

  return (
    <>
      {lable}
      {/*      <Editor
        apiKey="zq93rlthribjyq1at27u61t9elzzp4hhznb1df1ua70omqo5"
        onInit={(evt, editor) =>
          // @ts-ignore
          (editorRef.current = editor)
        }
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />*/}
      <button onClick={log}>Log editor content</button>
    </>
  );
};
