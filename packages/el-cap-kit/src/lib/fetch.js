export async function fetchData(url) {
  console.log('fetchData', url);
  try {
    const response = await fetch(url);
    console.log('response', response);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response;
  } catch (error) {
    console.error('error here', error);
    return null;
  }
}
