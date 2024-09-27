const ArticleSkeleton = () => {
  return (
    <div className="animate-pulse pb-16">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] bg-gray-200 rounded-full dark:bg-dark-300" />
          <div className="w-28 h-4 bg-gray-200 rounded-full dark:bg-dark-300" />
        </div>
        <div className="w-10 h-5 bg-gray-200 rounded-full dark:bg-dark-300" />
      </div>
      <div>
        <div className="w-full h-5 mb-3 bg-gray-200 rounded-full dark:bg-dark-300" />
        <div className="w-80 h-5 mb-0.5 bg-gray-200 rounded-full dark:bg-dark-300" />
      </div>
    </div>
  );
};

export default ArticleSkeleton;
