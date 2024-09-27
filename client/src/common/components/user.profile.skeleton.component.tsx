const UserProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-cover bg-gray-200 dark:bg-dark-300" />
      <div className="px-6">
        <div className="relative bottom-12 flex items-center gap-3.5">
          <div className="w-[90px] h-[90px] bg-gray-200 border-4 border-white rounded-full dark:bg-dark-300 dark:border-dark-100" />
          <div className="mt-8 h-[20px] w-32 bg-gray-200 rounded-full dark:bg-dark-300" />
        </div>
        <div className="mb-10 w-80 bg-gray-200 rounded-full dark:bg-dark-300" />
        <div className="pb-7 flex gap-7">
          <div className="h-[14px] w-20 bg-gray-200 rounded-full dark:bg-dark-300" />
          <div className="h-[14px] w-20 bg-gray-200 rounded-full dark:bg-dark-300" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
