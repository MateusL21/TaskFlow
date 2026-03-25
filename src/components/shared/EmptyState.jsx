import Card from "./Card";
import { Check } from "lucide-react";

const EmptyState = ({ hasFilters, onClearFilters }) => {
  return (
    <Card className="text-center py-6 md:py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-1.5 md:gap-3">
        <div className="w-10 h-10 md:w-16 md:h-16 bg-secondary-100 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 md:w-8 md:h-8 text-secondary-400" />
        </div>
        <p className="text-secondary-500 font-medium text-xs md:text-base">
          Nenhuma tarefa encontrada
        </p>
        <p className="text-secondary-400 text-[10px] md:text-sm">
          {hasFilters
            ? "Tente ajustar os filtros ou a busca"
            : "Clique em 'Nova tarefa' para começar"}
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </Card>
  );
};

export default EmptyState;
