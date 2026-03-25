import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar mobile para ajustar visibilidade
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcular intervalo de itens sendo exibidos
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Gerar array de páginas para exibir
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      // Mostrar todas as páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas com elipses
      if (currentPage <= 3) {
        // Primeiras páginas
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Últimas páginas
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // Meio
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Não mostrar paginação se não houver páginas suficientes
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 md:mt-8">
      {/* Mobile: Cards de informação */}
      <div className="md:hidden text-center mb-3">
        <p className="text-xs text-secondary-500">
          Mostrando {startItem} - {endItem} de {totalItems} tarefas
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 md:gap-4">
        {/* Botão Anterior */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="px-2 md:px-3"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden md:inline ml-1">Anterior</span>
        </Button>

        {/* Números das Páginas */}
        <div className="flex items-center gap-1 md:gap-2">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-1 md:px-2 text-secondary-400 text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  min-w-[32px] h-8 md:min-w-[40px] md:h-10
                  flex items-center justify-center
                  rounded-lg text-sm md:text-base font-medium
                  transition-all duration-200
                  ${
                    currentPage === page
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm"
                      : "text-secondary-600 hover:bg-secondary-100"
                  }
                `}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Botão Próximo */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="px-2 md:px-3"
        >
          <span className="hidden md:inline mr-1">Próximo</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Desktop: Informação de paginação */}
      <div className="hidden md:block text-center mt-3">
        <p className="text-xs text-secondary-400">
          Mostrando {startItem} - {endItem} de {totalItems} tarefas
        </p>
      </div>
    </div>
  );
};

export default Pagination;
