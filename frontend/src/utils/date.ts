export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return 'Unknown date';
  
  try {
    // Try to standardize the date format first
    let standardDate = dateString;
    
    // Handle SQL-style dates with spaces instead of T
    if (dateString.includes(' ') && !dateString.includes('T')) {
      standardDate = dateString.replace(' ', 'T');
    }
    
    const date = new Date(standardDate);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date format:', dateString);
      return dateString; // Return the original string if we can't parse it
    }
    
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return dateString; // Return the original string in case of error
  }
};