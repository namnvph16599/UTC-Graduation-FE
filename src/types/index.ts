import { PageMeta } from '@/src/graphql/type.interface';

export type TOnChangePage = (newPage: number) => void;

export type TDataTablePagination = {
  onChangePage: TOnChangePage;
  pageMeta: PageMeta;
};

export type TDetailPageProps = { id?: string };
