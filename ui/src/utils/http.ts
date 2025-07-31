const rootUrl = window.origin;
const apiPrefix = "/api/v1";

const GET = async (url: string) => {
  const absoluteUrl = rootUrl + apiPrefix + url;
  const response = await fetch(absoluteUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (response.status >= 400) {
    throw Error(data.message);
  }

  return data;
};

const POST = async (url: string, payload: any) => {
  const absoluteUrl = rootUrl + apiPrefix + url;
  const response = await fetch(absoluteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (response.status >= 400) {
    throw Error(data.message);
  }

  return data;
};

export { GET, POST };
