type DefaultPbFields = {
  id: string;
  collectionId: string;
  created: string;
  updated: string;
};

type PageProps<T> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

type RouteContext<T> = {
  params: T;
};

export type { DefaultPbFields, PageProps, RouteContext };
