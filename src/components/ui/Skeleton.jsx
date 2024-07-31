export const Skeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse rounded-2xl p-3 lg:flex lg:gap-4"
    >
      <div className="flex h-40 w-full items-center justify-center rounded-xl bg-primary-20 lg:h-32 lg:w-40 lg:min-w-40">
        <svg
          className="size-10"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="w-full">
        <div className="mt-2 h-5 w-3/5 rounded-md bg-primary-20 lg:h-10"></div>
        <div className="mt-2 h-4 w-full rounded-md bg-primary-20 lg:h-6"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
