const formatDate = (timestamp: Date): string => {
  const date = new Date(timestamp);
  const dateReal = Intl.DateTimeFormat('pt-br').format(date);

  return dateReal;
};

export default formatDate;
