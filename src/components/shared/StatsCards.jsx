import Card, { CardBody } from "./Card";

const StatsCards = ({ total, completed, progress }) => {
  return (
    <div className="grid grid-cols-3 gap-1.5 md:gap-4 mb-4 md:mb-8">
      {/* Total Card */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white overflow-hidden relative">
        <CardBody className="p-1.5 md:p-4 text-center">
          <p className="text-[8px] md:text-sm opacity-90 uppercase tracking-wider font-medium">
            Total
          </p>
          <p className="text-base md:text-3xl font-bold leading-tight md:leading-normal">
            {total}
          </p>
        </CardBody>
      </Card>

      {/* Completed Card */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden relative">
        <CardBody className="p-1.5 md:p-4 text-center">
          <p className="text-[8px] md:text-sm opacity-90 uppercase tracking-wider font-medium">
            Concluídas
          </p>
          <p className="text-base md:text-3xl font-bold leading-tight md:leading-normal">
            {completed}
          </p>
        </CardBody>
      </Card>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white overflow-hidden relative">
        <CardBody className="p-1.5 md:p-4 text-center">
          <p className="text-[8px] md:text-sm opacity-90 uppercase tracking-wider font-medium">
            Progresso
          </p>
          <p className="text-base md:text-3xl font-bold leading-tight md:leading-normal">
            {Math.round(progress)}%
          </p>
          <div className="w-full bg-white/20 rounded-full h-0.5 md:h-1.5 mt-0.5 md:mt-2">
            <div
              className="bg-white rounded-full h-0.5 md:h-1.5 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StatsCards;
