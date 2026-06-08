/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as Hi2Icons from "react-icons/hi2";
import * as SiIcons from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as LuIcons from "react-icons/lu";
import * as TbIcons from "react-icons/tb";
import * as GrIcons from "react-icons/gr";
import * as PiIcons from "react-icons/pi";
import * as LiaIcons from "react-icons/lia";
import * as RxIcons from "react-icons/rx";
import * as VscIcons from "react-icons/vsc";
import * as CgIcons from "react-icons/cg";
import * as WiIcons from "react-icons/wi";
import * as DiIcons from "react-icons/di";
import * as TiIcons from "react-icons/ti";
import * as GoIcons from "react-icons/go";
import * as FcIcons from "react-icons/fc";
import * as ImIcons from "react-icons/im";
import * as SlIcons from "react-icons/sl";
import * as CiIcons from "react-icons/ci";
import * as TfiIcons from "react-icons/tfi";
import { IServiceIcon } from "@/types";

const iconLibraries: Record<string, any> = {
  fa: FaIcons,
  fa6: Fa6Icons,
  io: IoIcons,
  io5: Io5Icons,
  md: MdIcons,
  hi: HiIcons,
  hi2: Hi2Icons,
  si: SiIcons,
  bi: BiIcons,
  bs: BsIcons,
  ai: AiIcons,
  fi: FiIcons,
  gi: GiIcons,
  ri: RiIcons,
  lu: LuIcons,
  tb: TbIcons,
  gr: GrIcons,
  pi: PiIcons,
  lia: LiaIcons,
  li: LiaIcons,
  rx: RxIcons,
  vsc: VscIcons,
  cg: CgIcons,
  wi: WiIcons,
  di: DiIcons,
  ti: TiIcons,
  go: GoIcons,
  fc: FcIcons,
  im: ImIcons,
  sl: SlIcons,
  ci: CiIcons,
  tfi: TfiIcons,
};

interface DynamicIconProps {
  icon: IServiceIcon;
  className?: string;
  size?: number;
}

const DynamicIcon = ({ icon, className, size = 24 }: DynamicIconProps) => {
  const { library, name } = icon;
  const Library = iconLibraries[library.toLowerCase()];

  if (!Library) {
    return <div className={className}>?</div>;
  }

  const IconComponent = Library[name];

  if (!IconComponent) {
    return <div className={className}>?</div>;
  }

  return <IconComponent className={className} size={size} />;
};

export default DynamicIcon;
