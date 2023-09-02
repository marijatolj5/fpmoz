export function getFormatedDate(dateString) {
    const currentDate = dateString ? new Date(dateString) : new Date();
  
    return (
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate()
    );
  }