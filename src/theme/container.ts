
import { fonts } from "./font";
import { palette } from "./palette";

export const container = {
  rowCenterSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexible: {
    flex: 1,
  },
  growable: {
    flexGrow: 1,
  },
  boxCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    opacity: 0,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: palette.gray800,
    borderRadius: 8,
    color: palette.white,
    ...fonts.textBaseRegular,
  },
};
