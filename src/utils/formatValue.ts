const formatValue = (value: number): string => {
  const formatReal = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formatReal;
};

export default formatValue;
