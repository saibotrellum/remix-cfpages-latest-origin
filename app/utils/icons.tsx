import classNames from "classnames";
import {
  BsDatabaseFillAdd,
  GrDuplicate,
  GrFacebook,
  ImBin2,
  IoPersonAdd,
  TfiReload,
  TiArrowBack,
  VscSaveAs,
  BiLink,
  GrInstagram,
} from "react-icons/all";

const iconMap = {
  save: VscSaveAs,
  backToList: TiArrowBack,
  reload: TfiReload,
  delete: ImBin2,
  duplicate: GrDuplicate,
  addContact: BsDatabaseFillAdd,
  addPerson: IoPersonAdd,
  link: BiLink,
  instagram: GrInstagram,
  facebook: GrFacebook,
};

export function Icon({
  iconCode,
  isActive = false,
  className,
  color = null,
}: {
  iconCode: keyof typeof iconMap;
  isActive?: boolean;
  className?: string;
  color?: string | null;
}) {
  const Icon = iconMap[iconCode];
  const style = color ? { color } : {};
  return (
    <span className={classNames(className)} style={style}>
      <Icon />
    </span>
  );
}
