import type { RouteMatch } from "@remix-run/react";
import type { ReactNode } from "react";
import React from "react";
import { Button, Modal as RBModal } from "react-bootstrap";
import trans from "~/utils/trans";
//import { t } from '@lingui/macro';

/*export function recursiveMap(children: React.ReactNode, fn: (child: React.ReactElement) => React.ReactElement): React.ReactNode {
    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        let newChild = child;
        newChild = fn(newChild);
        if (newChild.props.children) {
            newChild = React.cloneElement(child, {
                children: recursiveMap(child.props.children, fn),
            });
        }

        return newChild;
    });
}*/

export const isInteger = (num: any) => /^-?[0-9]+$/.test(`${num}`);
export const IsNumeric = (num: any) => /^-{0,1}\d*\.{0,1}\d+$/.test(`${num}`);

export function t(slug: any, lang = "de") {
  // @ts-ignore
  return trans[lang][slug];
}

type ComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

type TModalProps = {
  title: string;
  showStatus: boolean;
  showStatusSetter?: false | React.Dispatch<React.SetStateAction<boolean>>;
  isStatic?: boolean;
  handleOK?: false | ((props?: any) => void);
  hasClose?: boolean;
  children: ReactNode;
};

export function Modal({
  title,
  showStatus,
  showStatusSetter = false,
  isStatic = false,
  handleOK = false,
  hasClose = true,
  children,
  ...rest
}: TModalProps) {
  const handleClose = () =>
    showStatusSetter
      ? showStatusSetter(false)
      : () => {
          showStatus = false;
        };
  let options = rest;
  if (isStatic) options = { ...options, backdrop: "static", keyboard: false };
  // or const [t, i18n] = useTranslation();

  return (
    <RBModal show={showStatus} onHide={handleClose} {...options}>
      <RBModal.Header closeButton>
        <RBModal.Title>{title}</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>{children}</RBModal.Body>
      <RBModal.Footer>
        {hasClose && (
          <Button variant="secondary" onClick={handleClose}>
            {t`Close`}
          </Button>
        )}
        {handleOK && (
          <Button variant="primary" onClick={handleOK}>
            {t`OK`}
          </Button>
        )}
      </RBModal.Footer>
    </RBModal>
  );
}

export function actionModal({
  title,
  content,
  action,
}: {
  title: string;
  content: ReactNode;
  action: () => void;
}) {
  return (
    <Modal title={title} hasClose={false} handleOK={action} showStatus>
      {content}
    </Modal>
  );
}

export function checkIdError({
  id,
  errTitle,
  errContent,
  errAction,
}: {
  id: any;
  errTitle: string;
  errContent: ReactNode;
  errAction: () => void;
}) {
  if (!id || !isInteger(id)) {
    return actionModal({
      title: errTitle,
      content: errContent,
      action: errAction,
    });
  }
  return null;
}

export function getSettings(matches: RouteMatch[]) {
  return matches.find((m) => m.id === "root")?.data.settings.selects;
}

export function helper() {
  return 0;
}
