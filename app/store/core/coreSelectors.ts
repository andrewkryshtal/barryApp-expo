import { useAppSelector } from "@/app/hooks/storeHooks";

export const usePageIndex = () =>
  useAppSelector((store) => store.core.pageIndex);

export const useLocalization = () =>
  useAppSelector((store) => store.core.locale);
