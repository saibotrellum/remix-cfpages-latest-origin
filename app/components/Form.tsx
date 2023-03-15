import type { ReactNode } from "react";
import React, { useRef } from "react";
//import {FormProvider, useForm} from 'react-hook-form';
//import {recursiveMap} from "~/utils";
import classNames from "classnames";
import is from "@sindresorhus/is";
import type { InputProps, SelectProps } from "~/components/FormHelpers";
import type { TTranslatedOptions } from "~/components/contacts/Helpers";
import { TSelects } from "~/components/contacts/Helpers";
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
            <option key={current.key} value={current.val}>
              {current.val}
            </option>
          ))}
      </select>
    </>
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
