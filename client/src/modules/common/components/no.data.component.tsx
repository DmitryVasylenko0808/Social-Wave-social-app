type NoDataProps = {
  message: string;
};

const NoData = ({ message }: NoDataProps) => {
  return (
    <h3 className="py-7 text-xl text-center text-secondary-200">{message}</h3>
  );
};

export default NoData;
